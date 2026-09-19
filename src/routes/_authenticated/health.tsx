import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, StateBlock } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { checkVitalRanges, createVital, deleteVital, getVitals, REFERENCE_RANGES } from "@/services/vitalService";
import { createAlert } from "@/services/alertService";

export const Route = createFileRoute("/_authenticated/health")({
  head: () => ({
    meta: [
      { title: "Health logs — Medisafe" },
      { name: "description", content: "Record blood pressure, heart rate, glucose, temperature, oxygen and weight, and view your trends." },
      { property: "og:title", content: "Health logs — Medisafe" },
      { property: "og:description", content: "Record vitals and view your own health trends." },
    ],
  }),
  component: HealthPage,
});

const METRICS = [
  { key: "blood_pressure_systolic", label: "Systolic BP", unit: "mmHg" },
  { key: "blood_pressure_diastolic", label: "Diastolic BP", unit: "mmHg" },
  { key: "heart_rate", label: "Heart rate", unit: "bpm" },
  { key: "blood_glucose", label: "Blood glucose", unit: "mmol/L" },
  { key: "temperature", label: "Temperature", unit: "°C" },
  { key: "oxygen_saturation", label: "Oxygen saturation", unit: "%" },
  { key: "weight", label: "Weight", unit: "kg" },
] as const;

function HealthPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [metric, setMetric] = useState<string>("blood_pressure_systolic");

  const vitals = useQuery({ queryKey: ["vitals"], queryFn: () => getVitals(200) });

  const remove = useMutation({
    mutationFn: deleteVital,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vitals"] });
      toast.success("Record deleted.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const rows = vitals.data ?? [];
  const series = rows
    .slice()
    .reverse()
    .filter((row) => row[metric as keyof typeof row] !== null)
    .map((row) => ({
      date: format(new Date(row.recorded_at), "d MMM HH:mm"),
      value: Number(row[metric as keyof typeof row]),
    }));

  return (
    <>
      <PageHeader
        title="Health logs"
        description="Vitals you have recorded, with informational reference ranges."
        action={<Button onClick={() => setOpen(true)}><Plus className="mr-2 size-4" /> Add reading</Button>}
      />

      <Card className="mb-6">
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Trend</CardTitle>
          <select
            aria-label="Metric"
            value={metric}
            onChange={(event) => setMetric(event.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            {METRICS.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
          </select>
        </CardHeader>
        <CardContent>
          {vitals.isLoading ? (
            <StateBlock><Loader2 className="mx-auto mb-2 size-4 animate-spin" />Loading health data…</StateBlock>
          ) : vitals.isError ? (
            <StateBlock>Unable to load your health records. Please try again.</StateBlock>
          ) : series.length === 0 ? (
            <StateBlock>No health data available yet for this measurement.</StateBlock>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={["auto", "auto"]} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                  <Line type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">History</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          {rows.length === 0 ? (
            <StateBlock>No health readings recorded yet.</StateBlock>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recorded</TableHead>
                  <TableHead>BP</TableHead>
                  <TableHead>HR</TableHead>
                  <TableHead>Glucose</TableHead>
                  <TableHead>Temp</TableHead>
                  <TableHead>SpO₂</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(row.recorded_at), "d MMM yyyy HH:mm")}</TableCell>
                    <TableCell>{row.blood_pressure_systolic && row.blood_pressure_diastolic ? `${row.blood_pressure_systolic}/${row.blood_pressure_diastolic}` : "—"}</TableCell>
                    <TableCell>{row.heart_rate ?? "—"}</TableCell>
                    <TableCell>{row.blood_glucose ?? "—"}</TableCell>
                    <TableCell>{row.temperature ?? "—"}</TableCell>
                    <TableCell>{row.oxygen_saturation ?? "—"}</TableCell>
                    <TableCell>{row.weight ?? "—"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => remove.mutate(row.id)} aria-label="Delete reading">
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Reference ranges shown are general adult informational ranges (
        {Object.values(REFERENCE_RANGES).map((r) => `${r.label} ${r.min}–${r.max} ${r.unit}`).join("; ")}
        ). They are informational only and are not a diagnosis. Consult a qualified healthcare
        professional about your results.
      </p>

      <AddVitalDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function AddVitalDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const num = (key: string) => {
      const raw = String(form.get(key) ?? "").trim();
      return raw === "" ? null : Number(raw);
    };
    const payload = {
      recorded_at: new Date(String(form.get("recorded_at"))).toISOString(),
      blood_pressure_systolic: num("blood_pressure_systolic"),
      blood_pressure_diastolic: num("blood_pressure_diastolic"),
      heart_rate: num("heart_rate"),
      blood_glucose: num("blood_glucose"),
      temperature: num("temperature"),
      oxygen_saturation: num("oxygen_saturation"),
      weight: num("weight"),
      notes: String(form.get("notes") ?? "").trim() || null,
    };

    if (Object.entries(payload).every(([key, value]) => key === "recorded_at" || value === null)) {
      toast.error("Enter at least one measurement.");
      return;
    }

    setBusy(true);
    try {
      const saved = await createVital(payload);
      const warnings = checkVitalRanges(saved);
      for (const message of warnings) {
        await createAlert({ alert_type: "health_warning", severity: "warning", message });
      }
      queryClient.invalidateQueries({ queryKey: ["vitals"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success(warnings.length ? "Reading saved. Some values are outside the reference range." : "Reading saved successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const nowLocal = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a health reading</DialogTitle>
          <DialogDescription>Leave any measurement blank if you didn't take it.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recorded_at">Recorded at</Label>
            <Input id="recorded_at" name="recorded_at" type="datetime-local" defaultValue={nowLocal} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumField label="Systolic (mmHg)" name="blood_pressure_systolic" />
            <NumField label="Diastolic (mmHg)" name="blood_pressure_diastolic" />
            <NumField label="Heart rate (bpm)" name="heart_rate" />
            <NumField label="Blood glucose (mmol/L)" name="blood_glucose" step="0.1" />
            <NumField label="Temperature (°C)" name="temperature" step="0.1" />
            <NumField label="Oxygen saturation (%)" name="oxygen_saturation" />
            <NumField label="Weight (kg)" name="weight" step="0.1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" rows={2} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Save reading
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function NumField({ label, name, step }: { label: string; name: string; step?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type="number" step={step ?? "1"} inputMode="decimal" />
    </div>
  );
}