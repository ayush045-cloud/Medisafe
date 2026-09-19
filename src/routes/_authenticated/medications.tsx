import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, ShieldQuestion, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, StateBlock } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createMedication,
  createSchedule,
  deleteMedication,
  deleteSchedule,
  getMedications,
  getSchedules,
  updateMedication,
} from "@/services/medicationService";
import type { Medication } from "@/services/types";
import { checkMyInteractions } from "@/lib/interactions.functions";

export const Route = createFileRoute("/_authenticated/medications")({
  head: () => ({
    meta: [
      { title: "Medications — Medisafe" },
      { name: "description", content: "Add, edit and schedule the medications you take, stored privately in your account." },
      { property: "og:title", content: "Medications — Medisafe" },
      { property: "og:description", content: "Add, edit and schedule the medications you take." },
    ],
  }),
  component: MedicationsPage,
});

const FREQUENCIES = ["Once daily", "Twice daily", "Three times daily", "Four times daily", "Weekly", "As needed"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MedicationsPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Medication | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [scheduleFor, setScheduleFor] = useState<Medication | null>(null);

  const meds = useQuery({ queryKey: ["medications"], queryFn: getMedications });
  const schedules = useQuery({ queryKey: ["schedules"], queryFn: () => getSchedules() });

  const remove = useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("Medication deleted.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const toggleActive = useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => updateMedication(id, { is_active }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const interactions = useMutation({
    mutationFn: () => checkMyInteractions({ data: undefined }),
    onError: () => toast.error("Interaction checking is currently unavailable."),
  });

  return (
    <>
      <PageHeader
        title="Medications"
        description="Your medication records and dose schedules."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => interactions.mutate()} disabled={interactions.isPending}>
              {interactions.isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <ShieldQuestion className="mr-2 size-4" />}
              Check interactions
            </Button>
            <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
              <Plus className="mr-2 size-4" /> Add medication
            </Button>
          </div>
        }
      />

      {interactions.data && (
        <Card className="mb-6 border-warning/40">
          <CardContent className="p-5 text-sm">
            {!interactions.data.available ? (
              <p className="text-muted-foreground">{interactions.data.reason}</p>
            ) : interactions.data.interactions.length === 0 ? (
              <p className="text-muted-foreground">
                No interactions were returned for {interactions.data.checked?.join(", ") || "your medications"} by{" "}
                {interactions.data.source}. This is not a guarantee of safety — always consult a qualified healthcare professional.
              </p>
            ) : (
              <div className="space-y-3">
                <p className="font-medium">
                  Potential medication interaction detected. Please consult a qualified healthcare professional.
                </p>
                {interactions.data.interactions.map((item, index) => (
                  <div key={index} className="rounded-lg border border-border/70 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.drugs.join(" + ")}
                    </p>
                    <p className="mt-1">{item.description}</p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">Source: {interactions.data.source}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {meds.isLoading ? (
        <StateBlock><Loader2 className="mx-auto mb-2 size-4 animate-spin" />Loading medications…</StateBlock>
      ) : meds.isError ? (
        <StateBlock>Unable to load medications. Please try again.</StateBlock>
      ) : (meds.data ?? []).length === 0 ? (
        <StateBlock>No medications added yet.</StateBlock>
      ) : (
        <div className="space-y-4">
          {(meds.data ?? []).map((med) => {
            const medSchedules = (schedules.data ?? []).filter((s) => s.medication_id === med.id);
            return (
              <Card key={med.id} className="shadow-card">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-lg font-semibold">{med.medication_name}</h2>
                        {!med.is_active && <Badge variant="secondary">Inactive</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {[med.dosage && `${med.dosage} ${med.dosage_unit ?? ""}`.trim(), med.frequency, med.route]
                          .filter(Boolean)
                          .join(" · ") || "No dosage details recorded"}
                      </p>
                      {med.generic_name && <p className="text-xs text-muted-foreground">Generic: {med.generic_name}</p>}
                      {med.instructions && <p className="mt-2 text-sm">{med.instructions}</p>}
                      <p className="mt-2 text-xs text-muted-foreground">
                        {[
                          med.prescribed_by && `Prescribed by ${med.prescribed_by}`,
                          med.start_date && `From ${med.start_date}`,
                          med.end_date && `Until ${med.end_date}`,
                        ].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={med.is_active}
                        onCheckedChange={(checked) => toggleActive.mutate({ id: med.id, is_active: checked })}
                        aria-label="Active"
                      />
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(med); setFormOpen(true); }} aria-label="Edit">
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => remove.mutate(med.id)} aria-label="Delete">
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
                    {medSchedules.length === 0 ? (
                      <span className="text-sm text-muted-foreground">No schedule configured yet.</span>
                    ) : (
                      medSchedules.map((s) => (
                        <Badge key={s.id} variant="secondary" className="gap-2">
                          {s.scheduled_time.slice(0, 5)}
                          {s.frequency_type === "weekly" && ` · ${(s.days_of_week ?? []).map((d) => DAYS[d]).join(", ")}`}
                          <button
                            aria-label="Remove schedule"
                            onClick={async () => {
                              await deleteSchedule(s.id);
                              queryClient.invalidateQueries({ queryKey: ["schedules"] });
                            }}
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                    <Button size="sm" variant="outline" onClick={() => setScheduleFor(med)}>
                      <Plus className="mr-1 size-3.5" /> Add dose time
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <MedicationDialog open={formOpen} onOpenChange={setFormOpen} medication={editing} />
      <ScheduleDialog medication={scheduleFor} onClose={() => setScheduleFor(null)} />
    </>
  );
}

function MedicationDialog({
  open,
  onOpenChange,
  medication,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  medication: Medication | null;
}) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (key: string) => {
      const value = String(form.get(key) ?? "").trim();
      return value === "" ? null : value;
    };
    const payload = {
      medication_name: String(form.get("medication_name")).trim(),
      generic_name: text("generic_name"),
      dosage: form.get("dosage") ? Number(form.get("dosage")) : null,
      dosage_unit: text("dosage_unit"),
      route: text("route"),
      frequency: text("frequency"),
      instructions: text("instructions"),
      prescribed_by: text("prescribed_by"),
      start_date: text("start_date"),
      end_date: text("end_date"),
      notes: text("notes"),
    };
    setBusy(true);
    try {
      if (medication) await updateMedication(medication.id, payload);
      else await createMedication(payload);
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      toast.success(medication ? "Medication updated successfully." : "Medication added successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{medication ? "Edit medication" : "Add medication"}</DialogTitle>
          <DialogDescription>Record the details exactly as prescribed to you.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4" key={medication?.id ?? "new"}>
          <Field label="Medication name" name="medication_name" defaultValue={medication?.medication_name} required />
          <Field label="Generic name" name="generic_name" defaultValue={medication?.generic_name ?? ""} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Dosage" name="dosage" type="number" step="any" defaultValue={medication?.dosage ?? ""} />
            <Field label="Unit" name="dosage_unit" defaultValue={medication?.dosage_unit ?? ""} placeholder="mg" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Route" name="route" defaultValue={medication?.route ?? ""} placeholder="Oral" />
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                name="frequency"
                defaultValue={medication?.frequency ?? ""}
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                <option value="">Not set</option>
                {FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start date" name="start_date" type="date" defaultValue={medication?.start_date ?? ""} />
            <Field label="End date" name="end_date" type="date" defaultValue={medication?.end_date ?? ""} />
          </div>
          <Field label="Prescribed by" name="prescribed_by" defaultValue={medication?.prescribed_by ?? ""} />
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea id="instructions" name="instructions" defaultValue={medication?.instructions ?? ""} rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" defaultValue={medication?.notes ?? ""} rows={2} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy && <Loader2 className="mr-2 size-4 animate-spin" />} {medication ? "Save changes" : "Add medication"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ScheduleDialog({ medication, onClose }: { medication: Medication | null; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [days, setDays] = useState<number[]>([]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!medication) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      await createSchedule({
        medication_id: medication.id,
        scheduled_time: String(form.get("scheduled_time")),
        frequency_type: weekly ? "weekly" : "daily",
        days_of_week: weekly ? days : [],
        start_date: String(form.get("start_date") || new Date().toISOString().slice(0, 10)),
        end_date: String(form.get("end_date") || "") || null,
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("Schedule added successfully.");
      setDays([]);
      setWeekly(false);
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={Boolean(medication)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add dose time</DialogTitle>
          <DialogDescription>{medication?.medication_name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Time" name="scheduled_time" type="time" required />
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="weekly">Only on specific weekdays</Label>
            <Switch id="weekly" checked={weekly} onCheckedChange={setWeekly} />
          </div>
          {weekly && (
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day, index) => (
                <Button
                  key={day}
                  type="button"
                  size="sm"
                  variant={days.includes(index) ? "default" : "outline"}
                  onClick={() => setDays((prev) => (prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index]))}
                >
                  {day}
                </Button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start date" name="start_date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
            <Field label="End date" name="end_date" type="date" />
          </div>
          <Button type="submit" className="w-full" disabled={busy || (weekly && days.length === 0)}>
            {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Add dose time
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  name,
  ...rest
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...rest} />
    </div>
  );
}