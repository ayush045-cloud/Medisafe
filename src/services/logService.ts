import { supabase, unwrap, requireUserId } from "./api";
import type { LogWithMedication } from "./types";

const SELECT =
  "*, medications(id, medication_name, dosage, dosage_unit, instructions)";

export async function getLogs(params: { from?: string; to?: string; limit?: number } = {}): Promise<LogWithMedication[]> {
  let query = supabase
    .from("medication_logs")
    .select(SELECT)
    .order("scheduled_at", { ascending: false })
    .limit(params.limit ?? 200);
  if (params.from) query = query.gte("scheduled_at", params.from);
  if (params.to) query = query.lte("scheduled_at", params.to);
  return unwrap(await query, "Unable to load medication history. Please try again.") as LogWithMedication[];
}

export async function getTodayLogs(): Promise<LogWithMedication[]> {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const rows = await getLogs({ from: start.toISOString(), to: end.toISOString() });
  return rows.sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at));
}

export async function setLogStatus(
  id: string,
  status: "TAKEN" | "SKIPPED" | "PENDING" | "MISSED",
): Promise<void> {
  const { error } = await supabase
    .from("medication_logs")
    .update({ status, taken_at: status === "TAKEN" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw new Error("We couldn't record that action. Please try again.");
}

/** Snooze pushes the scheduled occurrence forward and returns it to pending. */
export async function snoozeLog(id: string, minutes = 15): Promise<void> {
  const { data, error } = await supabase.from("medication_logs").select("scheduled_at").eq("id", id).single();
  if (error || !data) throw new Error("We couldn't snooze this reminder. Please try again.");
  const next = new Date(Math.max(Date.now(), new Date(data.scheduled_at).getTime()) + minutes * 60_000);
  const { error: updateError } = await supabase
    .from("medication_logs")
    .update({ scheduled_at: next.toISOString(), status: "PENDING", taken_at: null })
    .eq("id", id);
  if (updateError) throw new Error("We couldn't snooze this reminder. Please try again.");
}

export async function getAdherence(days = 30) {
  const from = new Date(Date.now() - days * 86_400_000).toISOString();
  const user_id = await requireUserId();
  const rows = unwrap(
    await supabase
      .from("medication_logs")
      .select("status, scheduled_at")
      .eq("user_id", user_id)
      .gte("scheduled_at", from),
    "Unable to calculate adherence. Please try again.",
  );
  const counts: Record<string, number> = { TAKEN: 0, MISSED: 0, SKIPPED: 0, PENDING: 0 };
  for (const row of rows) counts[row.status] = (counts[row.status] ?? 0) + 1;
  const taken = counts["TAKEN"] ?? 0;
  const missed = counts["MISSED"] ?? 0;
  const skipped = counts["SKIPPED"] ?? 0;
  const resolved = taken + missed + skipped;
  return {
    taken,
    missed,
    skipped,
    pending: counts["PENDING"] ?? 0,
    total: rows.length,
    adherenceRate: resolved > 0 ? Math.round((taken / resolved) * 100) : null,
  };
}