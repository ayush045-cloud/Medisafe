import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BellRing,
  CalendarClock,
  FileText,
  HeartPulse,
  Pill,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medisafe — Intelligent Medication & Health Safety" },
      {
        name: "description",
        content:
          "Track medications, build dose schedules, log vitals, store prescriptions and get missed-dose alerts — all in one private account.",
      },
      { property: "og:title", content: "Medisafe — Intelligent Medication & Health Safety" },
      {
        property: "og:description",
        content:
          "Track medications, build dose schedules, log vitals, store prescriptions and get missed-dose alerts.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Pill, title: "Medication records", body: "Dosage, route, instructions, prescriber and treatment dates kept in one structured record." },
  { icon: CalendarClock, title: "Dose schedules", body: "Once daily, twice daily, several times a day or specific weekdays — with start and end dates." },
  { icon: BellRing, title: "Dose tracking", body: "Every occurrence is generated server-side so you can mark it taken, skipped or snoozed." },
  { icon: HeartPulse, title: "Vitals & trends", body: "Log blood pressure, heart rate, glucose, temperature, oxygen and weight, then view real trends." },
  { icon: FileText, title: "Prescriptions", body: "Upload documents to private storage that only your account can open." },
  { icon: ShieldCheck, title: "Safety alerts", body: "Missed-dose alerts and informational reference-range notices, with interaction checks via RxNav." },
];

const steps = [
  { n: "01", title: "Create your account", body: "Register with your name, email and date of birth. Your data is isolated to your account." },
  { n: "02", title: "Add medications & schedules", body: "Record each medication and the times you take it." },
  { n: "03", title: "Track and review", body: "Mark doses, log vitals and watch adherence and health trends build from your real records." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="grid size-9 place-items-center rounded-xl bg-hero-gradient text-primary-foreground">
              <Activity className="size-5" />
            </span>
            Medisafe
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth" search={{ mode: "login" }}>Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/auth" search={{ mode: "register" }}>Get started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-soft-gradient">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="size-3.5" /> Private by design
              </span>
              <h1 className="mt-5 text-4xl leading-tight font-semibold md:text-5xl">
                Never lose track of a dose again
              </h1>
              <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
                Medisafe keeps your medications, dose schedules, vitals and prescriptions in one
                secure account — with real adherence figures calculated from what you actually
                recorded.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/auth" search={{ mode: "register" }}>Create free account</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/auth" search={{ mode: "login" }}>I already have an account</Link>
                </Button>
              </div>
              <p className="mt-6 max-w-md text-xs text-muted-foreground">
                Medisafe is a medication management and tracking tool. It does not replace
                professional medical advice, diagnosis, or treatment.
              </p>
            </div>
            <Card className="border-border/70 shadow-float">
              <CardContent className="space-y-4 p-6">
                <p className="font-display text-sm font-semibold text-muted-foreground">What you get</p>
                {features.slice(0, 4).map((f) => (
                  <div key={f.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <f.icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{f.title}</p>
                      <p className="text-sm text-muted-foreground">{f.body}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold">Everything in one record</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Each feature is backed by your own data. Nothing is simulated — empty sections stay
            empty until you add something.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border-border/70 shadow-card transition-shadow hover:shadow-float">
                <CardContent className="p-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <f.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-3xl font-semibold">How it works</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                  <span className="font-display text-2xl font-semibold text-primary">{s.n}</span>
                  <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="rounded-3xl bg-hero-gradient px-8 py-14 text-center text-primary-foreground shadow-float">
            <h2 className="text-3xl font-semibold">Start tracking today</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm opacity-90">
              Your medication history, adherence and health trends — built from your own records,
              visible only to you.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link to="/auth" search={{ mode: "register" }}>Create your account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-6xl px-5 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Medisafe</p>
          <p className="mt-2 max-w-2xl">
            Medisafe is a medication management and tracking tool. It does not diagnose conditions,
            prescribe medication or recommend dosage changes. Always consult a qualified healthcare
            professional.
          </p>
        </div>
      </footer>
    </div>
  );
}
