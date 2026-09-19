import { supabase, unwrap, requireUserId } from "./api";
import type { Alert } from "./types";

export async function getAlerts(): Promise<Alert[]> {
  return unwrap(
    await supabase.from("alerts").select("*").order("created_at", { ascending: false }).limit(200),
    "Unable to load alerts. Please try again.",
  );
}

export async function createAlert(input: {
  alert_type: string;
  severity: "info" | "warning" | "critical";
  message: string;
  medication_id?: string | null;
}): Promise<Alert> {
  const user_id = await requireUserId();
  return unwrap(
    await supabase.from("alerts").insert({ ...input, user_id }).select().single(),
    "We couldn't create this alert.",
  );
}

export async function markAlertRead(id: string, is_read = true): Promise<void> {
  const { error } = await supabase.from("alerts").update({ is_read }).eq("id", id);
  if (error) throw new Error("We couldn't update this alert. Please try again.");
}

export async function deleteAlert(id: string): Promise<void> {
  const { error } = await supabase.from("alerts").delete().eq("id", id);
  if (error) throw new Error("We couldn't delete this alert. Please try again.");
}