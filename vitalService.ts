import { supabase, unwrap, requireUserId } from "./api";
import type { VitalInput, VitalLog } from "./types";

export async function getVitals(limit = 200): Promise<VitalLog[]> {
  return unwrap(
    await supabase.from("vital_logs").select("*").order("recorded_at", { ascending: false }).limit(limit),
    "Unable to load your health records. Please try again.",
  );
}

export async function createVital(input: VitalInput): Promise<VitalLog> {
  const user_id = await requireUserId();
  return unwrap(
    await supabase.from("vital_logs").insert({ ...input, user_id }).select().single(),
    "We couldn't save this health record. Please check the values and try again.",
  );
}

export async function deleteVital(id: string): Promise<void> {
  const { error } = await supabase.from("vital_logs").delete().eq("id", id);
  if (error) throw new Error("We couldn't delete this record. Please try again.");
}

/**
 * Informational reference ranges only. Sources: WHO/ISH and NHS general adult
 * reference ranges. These are NOT diagnoses and are shown as information only.
 */
export const REFERENCE_RANGES = {
  systolic: { min: 90, max: 140, label: "Systolic blood pressure", unit: "mmHg" },
  diastolic: { min: 60, max: 90, label: "Diastolic blood pressure", unit: "mmHg" },
  heart_rate: { min: 60, max: 100, label: "Resting heart rate", unit: "bpm" },
  oxygen_saturation: { min: 95, max: 100, label: "Oxygen saturation", unit: "%" },
  temperature: { min: 36.1, max: 37.8, label: "Body temperature", unit: "°C" },
  blood_glucose: { min: 4, max: 11, label: "Blood glucose", unit: "mmol/L" },
} as const;

export function checkVitalRanges(vital: VitalLog): string[] {
  const out: string[] = [];
  const check = (value: number | null, key: keyof typeof REFERENCE_RANGES) => {
    if (value === null || value === undefined) return;
    const range = REFERENCE_RANGES[key];
    if (value < range.min || value > range.max) {
      out.push(`${range.label} (${value} ${range.unit}) is outside the configured reference range of ${range.min}–${range.max} ${range.unit}.`);
    }
  };
  check(vital.blood_pressure_systolic, "systolic");
  check(vital.blood_pressure_diastolic, "diastolic");
  check(vital.heart_rate, "heart_rate");
  check(vital.oxygen_saturation, "oxygen_saturation");
  check(vital.temperature, "temperature");
  check(vital.blood_glucose, "blood_glucose");
  return out;
}