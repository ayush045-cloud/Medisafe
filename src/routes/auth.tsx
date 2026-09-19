import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Search = { mode?: "login" | "register" | "forgot" };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    mode: search["mode"] === "register" || search["mode"] === "forgot" ? search["mode"] : "login",
  }),
  head: () => ({
    meta: [
      { title: "Sign in or register — Medisafe" },
      { name: "description", content: "Access your Medisafe account to manage medications, schedules and health records." },
      { property: "og:title", content: "Sign in or register — Medisafe" },
      { property: "og:description", content: "Access your Medisafe account to manage medications and health records." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) navigate({ to: "/dashboard" });
  }, [loading, session, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-gradient px-5 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2 font-display text-lg font-semibold">
          <span className="grid size-9 place-items-center rounded-xl bg-hero-gradient text-primary-foreground">
            <Activity className="size-5" />
          </span>
          Medisafe
        </Link>
        <Card className="shadow-float">
          {mode === "forgot" ? (
            <ForgotPassword />
          ) : (
            <>
              <CardHeader>
                <CardTitle>Welcome</CardTitle>
                <CardDescription>Sign in or create your Medisafe account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={mode === "register" ? "register" : "login"}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Log in</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="pt-4">
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value="register" className="pt-4">
                    <RegisterForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "That email or password is incorrect." : error.message);
      return;
    }
    toast.success("Signed in.");
    navigate({ to: "/dashboard" });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input id="login-password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Log in
      </Button>
      <Link to="/auth" search={{ mode: "forgot" }} className="block text-center text-xs text-muted-foreground underline">
        Forgot your password?
      </Link>
    </form>
  );
}

function RegisterForm() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    if (password.length < 8) {
      toast.error("Use a password of at least 8 characters.");
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: String(form.get("email")),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: String(form.get("full_name")),
          date_of_birth: String(form.get("date_of_birth") ?? ""),
          gender: String(form.get("gender") ?? ""),
          phone: String(form.get("phone") ?? ""),
        },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      toast.success("Account created.");
      navigate({ to: "/dashboard" });
    } else {
      toast.success("Check your email to confirm your account.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reg-name">Full name</Label>
        <Input id="reg-name" name="full_name" required autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input id="reg-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-password">Password</Label>
        <Input id="reg-password" name="password" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="reg-dob">Date of birth</Label>
          <Input id="reg-dob" name="date_of_birth" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-phone">Phone (optional)</Label>
          <Input id="reg-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-gender">Gender (optional)</Label>
        <Input id="reg-gender" name="gender" />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Create account
      </Button>
    </form>
  );
}

function ForgotPassword() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(String(form.get("email")), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>We'll email you a link to choose a new password.</CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <p className="text-sm text-muted-foreground">
            If an account exists for that address, a reset link is on its way.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email</Label>
              <Input id="forgot-email" name="email" type="email" required />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Send reset link
            </Button>
          </form>
        )}
        <Link to="/auth" search={{ mode: "login" }} className="mt-4 block text-center text-xs text-muted-foreground underline">
          Back to login
        </Link>
      </CardContent>
    </>
  );
}