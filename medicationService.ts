import { supabase, unwrap, requireUserId } from "./api";
import type { Medication, MedicationInput, Schedule, ScheduleInput } from "./types";

export async function getMedications(): Promise<Medication[]> {
  return unwrap(
    await supabase.from("medications").select("*").order("created_at", { ascending: false }),
    "Unable to load medications. Please try again.",
  );
}

export async function getMedication(id: string): Promise<Medication> {
  return unwrap(
    await supabase.from("medications").select("*").eq("id", id).single(),
    "Unable to load this medication.",
  );
}

export async function createMedication(input: MedicationInput): Promise<Medication> {
  const user_id = await requireUserId();
  return unwrap(
    await supabase.from("medications").insert({ ...input, user_id }).select().single(),
    "We couldn't save your medication. Please check the information and try again.",
  );
}

export async function updateMedication(id: string, input: Partial<MedicationInput>): Promise<Medication> {
  return unwrap(
    await supabase.from("medications").update(input).eq("id", id).select().single(),
    "We couldn't update your medication. Please try again.",
  );
}

export async function deleteMedication(id: string): Promise<void> {
  const { error } = await supabase.from("medications").delete().eq("id", id);
  if (error) throw new Error("We couldn't delete this medication. Please try again.");
}

export async function getSchedules(medicationId?: string): Promise<Schedule[]> {
  let query = supabase.from("medication_schedules").select("*").order("scheduled_time");
  if (medicationId) query = query.eq("medication_id", medicationId);
  return unwrap(await query, "Unable to load schedules. Please try again.");
}

export async function createSchedule(input: ScheduleInput): Promise<Schedule> {
  const user_id = await requireUserId();
  return unwrap(
    await supabase.from("medication_schedules").insert({ ...input, user_id }).select().single(),
    "We couldn't save this schedule. Please check the details and try again.",
  );
}

export async function updateSchedule(id: string, input: Partial<ScheduleInput>): Promise<Schedule> {
  return unwrap(
    await supabase.from("medication_schedules").update(input).eq("id", id).select().single(),
    "We couldn't update this schedule. Please try again.",
  );
}

export async function deleteSchedule(id: string): Promise<void> {
  const { error } = await supabase.from("medication_schedules").delete().eq("id", id);
  if (error) throw new Error("We couldn't delete this schedule. Please try again.");
}