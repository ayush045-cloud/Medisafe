import { supabase } from "@/integrations/supabase/client";

/** Friendly error mapping — never surface raw database errors to users. */
export class ApiError extends Error {}

export function unwrap<T>(result: { data: T | null; error: { message: string; code?: string } | null }, friendly: string): T {
  if (result.error) {
    console.error(friendly, result.error);
    throw new ApiError(friendly);
  }
  return result.data as T;
}

export async function requireUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new ApiError("Your session has expired. Please sign in again.");
  return data.user.id;
}

export { supabase };