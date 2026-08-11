import { supabase, unwrap, requireUserId } from "./api";
import type { NotificationPreferences, Profile } from "./types";

export async function getProfile(): Promise<Profile> {
  const id = await requireUserId();
  return unwrap(
    await supabase.from("profiles").select("*").eq("id", id).single(),
    "Unable to load your profile. Please try again.",
  );
}

export async function updateProfile(input: Partial<Profile>): Promise<Profile> {
  const id = await requireUserId();
  return unwrap(
    await supabase.from("profiles").update(input).eq("id", id).select().single(),
    "We couldn't update your profile. Please try again.",
  );
}

export async function getPreferences(): Promise<NotificationPreferences> {
  const user_id = await requireUserId();
  const existing = await supabase.from("notification_preferences").select("*").eq("user_id", user_id).maybeSingle();
  if (existing.data) return existing.data;
  return unwrap(
    await supabase.from("notification_preferences").insert({ user_id }).select().single(),
    "Unable to load notification settings.",
  );
}

export async function updatePreferences(
  input: Partial<Pick<NotificationPreferences, "email_enabled" | "browser_enabled" | "reminder_minutes_before">>,
): Promise<NotificationPreferences> {
  const user_id = await requireUserId();
  return unwrap(
    await supabase.from("notification_preferences").update(input).eq("user_id", user_id).select().single(),
    "We couldn't update your notification settings. Please try again.",
  );
}

export async function changePassword(newPassword: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    console.error(error);
    throw new Error(error.message || "We couldn't change your password. Please try again.");
  }
}