import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { changePassword, getPreferences, getProfile, updatePreferences, updateProfile } from "@/services/profileService";
import { deleteMyAccount } from "@/lib/account.functions";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile & settings — Medisafe" },
      { name: "description", content: "Manage your Medisafe profile, notification preferences, password and account." },
      { property: "og:title", content: "Profile & settings — Medisafe" },
      { property: "og:description", content: "Manage your profile, reminders, password and account." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const profile = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const prefs = useQuery({ queryKey: ["preferences"], queryFn: getPreferences });
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState("");

  const saveProfile = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const savePrefs = useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["preferences"] }),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const password = useMutation({
    mutationFn: changePassword,
    onSuccess: () => toast.success("Password changed successfully."),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const [reminder, setReminder] = useState(15);
  useEffect(() => {
    if (prefs.data) setReminder(prefs.data.reminder_minutes_before ?? 15);
  }, [prefs.data]);

  async function onDeleteAccount() {
    setDeleting(true);
    try {
      await deleteMyAccount();
      toast.success("Your account and all of its data have been deleted.");
      await signOut();
      navigate({ to: "/" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We couldn't delete your account. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <PageHeader title="Profile & settings" description="Your details, reminders and account controls." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal details</CardTitle>
            <CardDescription>Signed in as {user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            {profile.isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : profile.isError ? (
              <p className="text-sm text-muted-foreground">Unable to load your profile. Please try again.</p>
            ) : (
              <form
                key={profile.data?.id}
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  const text = (key: string) => String(form.get(key) ?? "").trim() || null;
                  saveProfile.mutate({
                    full_name: String(form.get("full_name") ?? "").trim(),
                    phone: text("phone"),
                    date_of_birth: text("date_of_birth"),
                    gender: text("gender"),
                  });
                }}
              >
                <TextField label="Full name" name="full_name" defaultValue={profile.data?.full_name ?? ""} />
                <div className="grid grid-cols-2 gap-3">
                  <TextField label="Phone" name="phone" defaultValue={profile.data?.phone ?? ""} />
                  <TextField label="Date of birth" name="date_of_birth" type="date" defaultValue={profile.data?.date_of_birth ?? ""} />
                </div>
                <TextField label="Gender" name="gender" defaultValue={profile.data?.gender ?? ""} />
                <Button type="submit" disabled={saveProfile.isPending}>
                  {saveProfile.isPending && <Loader2 className="mr-2 size-4 animate-spin" />} Save profile
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reminders</CardTitle>
              <CardDescription>Control how Medisafe notifies you about doses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email_enabled">Email reminders</Label>
                <Switch
                  id="email_enabled"
                  checked={prefs.data?.email_enabled ?? false}
                  onCheckedChange={(value) => savePrefs.mutate({ email_enabled: value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="browser_enabled">In-app reminders</Label>
                <Switch
                  id="browser_enabled"
                  checked={prefs.data?.browser_enabled ?? false}
                  onCheckedChange={(value) => savePrefs.mutate({ browser_enabled: value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder_minutes_before">Remind me this many minutes before a dose</Label>
                <div className="flex gap-2">
                  <Input
                    id="reminder_minutes_before"
                    type="number"
                    min={0}
                    max={180}
                    value={reminder}
                    onChange={(event) => setReminder(Number(event.target.value))}
                  />
                  <Button
                    variant="outline"
                    onClick={() => savePrefs.mutate({ reminder_minutes_before: reminder })}
                    disabled={savePrefs.isPending}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change password</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  const next = String(form.get("new_password"));
                  if (next.length < 8) {
                    toast.error("Use at least 8 characters.");
                    return;
                  }
                  if (next !== String(form.get("confirm_password"))) {
                    toast.error("The passwords don't match.");
                    return;
                  }
                  password.mutate(next);
                  event.currentTarget.reset();
                }}
              >
                <TextField label="New password" name="new_password" type="password" />
                <TextField label="Confirm new password" name="confirm_password" type="password" />
                <Button type="submit" disabled={password.isPending}>
                  {password.isPending && <Loader2 className="mr-2 size-4 animate-spin" />} Change password
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="text-base text-destructive">Delete account</CardTitle>
              <CardDescription>
                This permanently removes your account, medications, health records and prescription files. It cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label htmlFor="confirm">Type DELETE to confirm</Label>
              <Input id="confirm" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
              <Button variant="destructive" disabled={confirm !== "DELETE" || deleting} onClick={onDeleteAccount}>
                {deleting && <Loader2 className="mr-2 size-4 animate-spin" />} Delete my account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function TextField({
  label,
  name,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} />
    </div>
  );
}