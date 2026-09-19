import { backendApi } from "./backendApi";
import { supabase, unwrap, requireUserId } from "./api";
import type { Medication, MedicationInput, Schedule, ScheduleInput } from "./types";

type BackendResponse<T> = { success: boolean; data: T };

export async function getMedications(): Promise<Medication[]> {
  const response = await backendApi.get<BackendResponse<Medication[]>>("/medications");
  return response.data;
}

export async function getMedication(id: string): Promise<Medication> {
  const response = await backendApi.get<BackendResponse<Medication>>(`/medications/${id}`);
  return response.data;
}

export async function createMedication(input: MedicationInput): Promise<Medication> {
  const response = await backendApi.post<BackendResponse<Medication>>("/medications", input);
  return response.data;
}

export async function updateMedication(id: string, input: Partial<MedicationInput>): Promise<Medication> {
  const response = await backendApi.patch<BackendResponse<Medication>>(`/medications/${id}`, input);
  return response.data;
}

export async function deleteMedication(id: string): Promise<void> {
  await backendApi.delete(`/medications/${id}`);
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
