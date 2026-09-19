import { supabase, unwrap, requireUserId } from "./api";
import type { Prescription } from "./types";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/png", "image/jpeg", "image/webp"];

export async function getPrescriptions(): Promise<Prescription[]> {
  return unwrap(
    await supabase.from("prescriptions").select("*").order("created_at", { ascending: false }),
    "Unable to load prescriptions. Please try again.",
  );
}

export async function createPrescription(
  input: {
    doctor_name?: string | null;
    hospital_name?: string | null;
    prescription_date?: string | null;
    diagnosis?: string | null;
    notes?: string | null;
  },
  file?: File | null,
): Promise<Prescription> {
  const user_id = await requireUserId();
  let document_path: string | null = null;

  if (file) {
    if (!ALLOWED.includes(file.type)) throw new Error("Only PDF, PNG, JPEG or WebP files can be uploaded.");
    if (file.size > MAX_BYTES) throw new Error("Files must be 10 MB or smaller.");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const path = `${user_id}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from("prescriptions").upload(path, file, { upsert: false });
    if (error) {
      console.error(error);
      throw new Error("We couldn't upload that file. Please try again.");
    }
    document_path = path;
  }

  return unwrap(
    await supabase.from("prescriptions").insert({ ...input, user_id, document_path }).select().single(),
    "We couldn't save this prescription. Please try again.",
  );
}

export async function getPrescriptionUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from("prescriptions").createSignedUrl(path, 60);
  if (error || !data) throw new Error("We couldn't open that document. Please try again.");
  return data.signedUrl;
}

export async function deletePrescription(row: Prescription): Promise<void> {
  if (row.document_path) {
    await supabase.storage.from("prescriptions").remove([row.document_path]);
  }
  const { error } = await supabase.from("prescriptions").delete().eq("id", row.id);
  if (error) throw new Error("We couldn't delete this prescription. Please try again.");
}