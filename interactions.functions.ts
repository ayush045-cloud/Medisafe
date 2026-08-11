import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { checkInteractions } from "./interactions.server";

/**
 * Checks the signed-in user's active medications for potential interactions
 * using the U.S. National Library of Medicine RxNav service. If the service is
 * unavailable, we report that plainly rather than inventing results.
 */
export const checkMyInteractions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("medications")
      .select("id, medication_name")
      .eq("is_active", true);

    if (error) {
      console.error(error);
      return { available: false as const, reason: "We couldn't read your medication list.", interactions: [] };
    }
    return checkInteractions((data ?? []).map((m) => m.medication_name));
  });