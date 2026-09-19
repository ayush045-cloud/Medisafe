import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, StateBlock } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  createPrescription,
  deletePrescription,
  getPrescriptions,
  getPrescriptionUrl,
} from "@/services/prescriptionService";
import type { Prescription } from "@/services/types";

export const Route = createFileRoute("/_authenticated/prescriptions")({
  head: () => ({
    meta: [
      { title: "Prescriptions — Medisafe" },
      { name: "description", content: "Upload and manage prescription documents in private storage only you can open." },
      { property: "og:title", content: "Prescriptions — Medisafe" },
      { property: "og:description", content: "Upload and manage prescription documents securely." },
    ],
  }),
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const list = useQuery({ queryKey: ["prescriptions"], queryFn: getPrescriptions });

  const remove = useMutation({
    mutationFn: (row: Prescription) => deletePrescription(row),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
      toast.success("Prescription deleted.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  async function openDocument(path: string) {
    try {
      window.open(await getPrescriptionUrl(path), "_blank", "noopener");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <>
      <PageHeader
        title="Prescriptions"
        description="Documents are stored privately — only your account can open them."
        action={<Button onClick={() => setOpen(true)}><Plus className="mr-2 size-4" /> Add prescription</Button>}
      />

      {list.isLoading ? (
        <StateBlock><Loader2 className="mx-auto mb-2 size-4 animate-spin" />Loading prescriptions…</StateBlock>
      ) : list.isError ? (
        <StateBlock>Unable to load prescriptions. Please try again.</StateBlock>
      ) : (list.data ?? []).length === 0 ? (
        <StateBlock>No prescriptions uploaded yet.</StateBlock>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {(list.data ?? []).map((row) => (
            <Card key={row.id} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold">{row.doctor_name || "Prescription"}</p>
                    <p className="text-sm text-muted-foreground">
                      {[row.hospital_name, row.prescription_date].filter(Boolean).join(" · ") || "No date recorded"}
                    </p>
                    {row.diagnosis && <p className="mt-2 text-sm">{row.diagnosis}</p>}
                    {row.notes && <p className="mt-1 text-sm text-muted-foreground">{row.notes}</p>}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => remove.mutate(row)} aria-label="Delete prescription">
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
                {row.document_path && (
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => void openDocument(row.document_path!)}>
                    <ExternalLink className="mr-2 size-4" /> Open document
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <UploadDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function UploadDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get("document");
    const text = (key: string) => String(form.get(key) ?? "").trim() || null;
    setBusy(true);
    try {
      await createPrescription(
        {
          doctor_name: text("doctor_name"),
          hospital_name: text("hospital_name"),
          prescription_date: text("prescription_date"),
          diagnosis: text("diagnosis"),
          notes: text("notes"),
        },
        file instanceof File && file.size > 0 ? file : null,
      );
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
      toast.success("Prescription saved successfully.");
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
          <DialogTitle>Add prescription</DialogTitle>
          <DialogDescription>PDF, PNG, JPEG or WebP up to 10 MB.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Doctor" name="doctor_name" />
            <TextField label="Hospital / clinic" name="hospital_name" />
          </div>
          <TextField label="Prescription date" name="prescription_date" type="date" />
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis / reason</Label>
            <Textarea id="diagnosis" name="diagnosis" rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="document">Document</Label>
            <Input id="document" name="document" type="file" accept="application/pdf,image/png,image/jpeg,image/webp" />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Save prescription
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function TextField({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} />
    </div>
  );
}