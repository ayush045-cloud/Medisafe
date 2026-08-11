import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Choose a new password — Medisafe" },
      { name: "description", content: "Set a new password for your Medisafe account." },
      { property: "og:title", content: "Choose a new password — Medisafe" },
      { property: "og:description", content: "Set a new password for your Medisafe account." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password"));
    if (password.length < 8) {
      toast.error("Use a password of at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      await changePassword(password);
      toast.success("Password updated.");
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-gradient px-5">
      <Card className="w-full max-w-md shadow-float">
        <CardHeader>
          <CardTitle>Choose a new password</CardTitle>
          <CardDescription>Open this page from the reset link in your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" name="password" type="password" required minLength={8} />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Update password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}