import type { Database } from "@/integrations/supabase/types";

export type Tables = Database["public"]["Tables"];
export type Medication = Tables["medications"]["Row"];
export type MedicationInput = Omit<Tables["medications"]["Insert"], "user_id">;
export type Schedule = Tables["medication_schedules"]["Row"];
export type ScheduleInput = Omit<Tables["medication_schedules"]["Insert"], "user_id">;
export type MedicationLog = Tables["medication_logs"]["Row"];
export type VitalLog = Tables["vital_logs"]["Row"];
export type VitalInput = Omit<Tables["vital_logs"]["Insert"], "user_id">;
export type Prescription = Tables["prescriptions"]["Row"];
export type Alert = Tables["alerts"]["Row"];
export type Profile = Tables["profiles"]["Row"];
export type NotificationPreferences = Tables["notification_preferences"]["Row"];

export type LogWithMedication = MedicationLog & {
  medications: Pick<Medication, "id" | "medication_name" | "dosage" | "dosage_unit" | "instructions"> | null;
};