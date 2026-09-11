import { backendApi } from "./backendApi";
import type { VitalInput, VitalLog } from "./types";

type BackendResponse<T> = { success: boolean; data: T };

export async function getVitals(limit = 200): Promise<VitalLog[]> {
  const response = await backendApi.get<BackendResponse<VitalLog[]>>("/vitals");
  return response.data.slice(0, limit);
}

export async function createVital(input: VitalInput): Promise<VitalLog> {
  const response = await backendApi.post<BackendResponse<VitalLog>>("/vitals", input);
  return response.data;
}

export async function deleteVital(id: string): Promise<void> {
  await backendApi.delete(`/vitals/${id}`);
}

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
