import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  ShieldAlert,
  SkipForward,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PageHeader, StateBlock } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdherence, getTodayLogs, setLogStatus, snoozeLog } from "@/services/logService";
import { getVitals } from "@/services/vitalService";
import { getAlerts } from "@/services/alertService";
import { syncOccurrences } from "@/services/scheduleEngine";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Medisafe" },
      { name: "description", content: "Today's doses, adherence, recent vitals and alerts from your own records." },
      { property: "og:title", content: "Dashboard — Medisafe" },
      { property: "og:description", content: "Today's doses, adherence, recent vitals and alerts." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const queryClient = useQueryClient();

  useEffect(() => {
    syncOccurrences()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["today-logs"] });
        queryClient.invalidateQueries({ queryKey: ["adherence"] });
        queryClient.invalidateQueries({ queryKey: ["alerts"] });
      })
      .catch((error) => console.error(error));
  }, [queryClient]);

  const today = useQuery({ queryKey: ["today-logs"], queryFn: getTodayLogs });
  const adherence = useQuery({ queryKey: ["adherence"], queryFn: () => getAdherence(30) });
  const vitals = useQuery({ queryKey: ["vitals"], queryFn: () => getVitals(60) });
  const alerts = useQuery({ queryKey: ["alerts"], queryFn: getAlerts });

  const action = useMutation({
    mutationFn: async ({ id, kind }: { id: string; kind: "TAKEN" | "SKIPPED" | "SNOOZE" }) => {
      if (kind === "SNOOZE") return snoozeLog(id, 15);
      return setLogStatus(id, kind);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["today-logs"] });
      queryClient.invalidateQueries({ queryKey: ["adherence"] });
      toast.success("Dose updated.");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Something went wrong."),
  });

  const doses = today.data ?? [];
  const next = doses.find((d) => d.status === "PENDING" && new Date(d.scheduled_at) >= new Date());
  const unread = (alerts.data ?? []).filter((a) => !a.is_read);

  const vitalSeries = (vitals.data ?? [])
    .slice()
    .reverse()
    .map((v) => ({
      date: format(new Date(v.recorded_at), "d MMM"),
      systolic: v.blood_pressure_systolic,
      diastolic: v.blood_pressure_diastolic,
      heart_rate: v.heart_rate,
    }));

  return (
    <>
      <PageHeader title="Dashboard" description="Everything below is calculated from records in your account." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Next dose" value={next ? format(new Date(next.scheduled_at), "HH:mm") : "—"} hint={next?.medications?.medication_name ?? "No upcoming dose today"} icon={Clock} />
        <StatCard
          label="Adherence (30 days)"
          value={adherence.data?.adherenceRate === null || adherence.data === undefined ? "—" : `${adherence.data.adherenceRate}%`}
          hint={adherence.data ? `${adherence.data.taken} taken · ${adherence.data.missed} missed · ${adherence.data.skipped} skipped` : "No dose history yet"}
          icon={CheckCircle2}
        />
        <StatCard label="Doses today" value={String(doses.length)} hint={`${doses.filter((d) => d.status === "TAKEN").length} marked taken`} icon={Timer} />
        <StatCard label="Unread alerts" value={String(unread.length)} hint={unread.length ? "Review your alert centre" : "Nothing needs attention"} icon={ShieldAlert} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Today's medication</CardTitle></CardHeader>
          <CardContent>
            {today.isLoading ? (
              <StateBlock><Loader2 className="mx-auto mb-2 size-4 animate-spin" />Loading medications…</StateBlock>
            ) : today.isError ? (
              <StateBlock>Unable to load today's medication. Please try again.</StateBlock>
            ) : doses.length === 0 ? (
              <StateBlock>No doses scheduled for today. Add a medication schedule to see reminders here.</StateBlock>
            ) : (
              <ul className="divide-y divide-border">
                {doses.map((dose) => (
                  <li key={dose.id} className="flex flex-wrap items-center gap-3 py-3">
                    <span className="w-14 font-display text-sm font-semibold">{format(new Date(dose.scheduled_at), "HH:mm")}</span>
                    <div className="min-w-40 flex-1">
                      <p className="text-sm font-medium">{dose.medications?.medication_name ?? "Medication"}</p>
                      <p className="text-xs text-muted-foreground">
                        {[dose.medications?.dosage, dose.medications?.dosage_unit].filter(Boolean).join(" ") || "Dosage not set"}
                      </p>
                    </div>
                    <StatusBadge status={dose.status} />
                    {dose.status === "PENDING" && (
                      <div className="flex gap-1">
                        <Button size="sm" disabled={action.isPending} onClick={() => action.mutate({ id: dose.id, kind: "TAKEN" })}>
                          Taken
                        </Button>
                        <Button size="sm" variant="outline" disabled={action.isPending} onClick={() => action.mutate({ id: dose.id, kind: "SKIPPED" })}>
                          <SkipForward className="size-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" disabled={action.isPending} onClick={() => action.mutate({ id: dose.id, kind: "SNOOZE" })}>
                          Snooze
                        </Button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent alerts</CardTitle></CardHeader>
          <CardContent>
            {alerts.isLoading ? (
              <StateBlock>Loading alerts…</StateBlock>
            ) : (alerts.data ?? []).length === 0 ? (
              <StateBlock>No alerts yet.</StateBlock>
            ) : (
              <ul className="space-y-3">
                {(alerts.data ?? []).slice(0, 5).map((alert) => (
                  <li key={alert.id} className="rounded-lg border border-border/70 p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="size-3.5 text-warning" />
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{alert.severity}</span>
                    </div>
                    <p className="mt-1 text-sm">{alert.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base">Health trends</CardTitle></CardHeader>
        <CardContent>
          {vitals.isLoading ? (
            <StateBlock>Loading health data…</StateBlock>
          ) : vitalSeries.length === 0 ? (
            <StateBlock>No health data available yet. Record a vital in Health logs to see trends.</StateBlock>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                  <Line type="monotone" dataKey="systolic" stroke="var(--chart-1)" strokeWidth={2} dot={false} connectNulls />
                  <Line type="monotone" dataKey="diastolic" stroke="var(--chart-2)" strokeWidth={2} dot={false} connectNulls />
                  <Line type="monotone" dataKey="heart_rate" stroke="var(--chart-3)" strokeWidth={2} dot={false} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Medisafe is a medication management and tracking tool. It does not replace professional
        medical advice, diagnosis, or treatment.
      </p>
    </>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="shadow-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <Icon className="size-4 text-primary" />
        </div>
        <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    TAKEN: "bg-success text-success-foreground",
    MISSED: "bg-destructive text-destructive-foreground",
    SKIPPED: "bg-muted text-muted-foreground",
    PENDING: "bg-accent text-accent-foreground",
  };
  return <Badge className={map[status] ?? ""}>{status.toLowerCase()}</Badge>;
}