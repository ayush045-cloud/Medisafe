import { supabase, requireUserId } from "./api";

/**
 * Materialises today's dose occurrences for the signed-in user's active
 * schedules, and marks overdue pending doses as missed. The same logic runs
 * server-side on a schedule; this call keeps the UI current the moment the
 * user opens the app. It is idempotent — a unique constraint on
 * (schedule_id, scheduled_at) prevents duplicates.
 */
export async function syncOccurrences(): Promise<void> {
  const user_id = await requireUserId();
  const today = new Date();
  const isoDate = today.toISOString().slice(0, 10);
  const weekday = today.getDay();

  const { data: schedules, error } = await supabase
    .from("medication_schedules")
    .select("id, medication_id, scheduled_time, frequency_type, days_of_week, start_date, end_date, is_active")
    .eq("is_active", true);
  if (error || !schedules) return;

  const rows = schedules
    .filter((s) => s.start_date <= isoDate && (!s.end_date || s.end_date >= isoDate))
    .filter((s) => s.frequency_type !== "weekly" || (s.days_of_week ?? []).includes(weekday))
    .map((s) => {
      const parts = s.scheduled_time.split(":");
      const at = new Date(today);
      at.setHours(Number(parts[0] ?? 0), Number(parts[1] ?? 0), 0, 0);
      return {
        user_id,
        schedule_id: s.id,
        medication_id: s.medication_id,
        scheduled_at: at.toISOString(),
        status: "PENDING" as const,
      };
    });

  if (rows.length > 0) {
    await supabase.from("medication_logs").upsert(rows, { onConflict: "schedule_id,scheduled_at", ignoreDuplicates: true });
  }

  // Grace period before a pending dose counts as missed.
  const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: overdue } = await supabase
    .from("medication_logs")
    .select("id, medication_id, scheduled_at, medications(medication_name)")
    .eq("status", "PENDING")
    .lt("scheduled_at", cutoff);

  if (overdue && overdue.length > 0) {
    await supabase
      .from("medication_logs")
      .update({ status: "MISSED" })
      .in("id", overdue.map((row) => row.id));

    await supabase.from("alerts").insert(
      overdue.map((row) => ({
        user_id,
        medication_id: row.medication_id,
        alert_type: "missed_medication",
        severity: "warning" as const,
        message: `Your ${new Date(row.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} dose of ${
          (row.medications as { medication_name: string } | null)?.medication_name ?? "medication"
        } was not marked as taken.`,
      })),
    );
  }
}