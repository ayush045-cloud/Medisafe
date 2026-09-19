import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { PageHeader, StateBlock } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deleteAlert, getAlerts, markAlertRead } from "@/services/alertService";

export const Route = createFileRoute("/_authenticated/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Medisafe" },
      { name: "description", content: "Missed-dose alerts, safety notices and reference-range warnings generated from your records." },
      { property: "og:title", content: "Alerts — Medisafe" },
      { property: "og:description", content: "Missed-dose alerts and safety notices from your records." },
    ],
  }),
  component: AlertsPage,
});

const FILTERS = ["all", "unread", "warning", "critical"] as const;

function AlertsPage() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const alerts = useQuery({ queryKey: ["alerts"], queryFn: getAlerts });

  const read = useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) => markAlertRead(id, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alerts"] }),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const remove = useMutation({
    mutationFn: deleteAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("Alert deleted.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong."),
  });

  const rows = (alerts.data ?? []).filter((a) =>
    filter === "all" ? true : filter === "unread" ? !a.is_read : a.severity === filter,
  );

  return (
    <>
      <PageHeader title="Alert centre" description="Notices created from your own medication and health records." />

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((value) => (
          <Button key={value} size="sm" variant={filter === value ? "default" : "outline"} onClick={() => setFilter(value)}>
            {value[0]!.toUpperCase() + value.slice(1)}
          </Button>
        ))}
      </div>

      {alerts.isLoading ? (
        <StateBlock><Loader2 className="mx-auto mb-2 size-4 animate-spin" />Loading alerts…</StateBlock>
      ) : alerts.isError ? (
        <StateBlock>Unable to load alerts. Please try again.</StateBlock>
      ) : rows.length === 0 ? (
        <StateBlock>No alerts to show.</StateBlock>
      ) : (
        <div className="space-y-3">
          {rows.map((alert) => (
            <Card key={alert.id} className={alert.is_read ? "opacity-70" : "shadow-card"}>
              <CardContent className="flex flex-wrap items-start justify-between gap-3 p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={
                        alert.severity === "critical"
                          ? "bg-destructive text-destructive-foreground"
                          : alert.severity === "warning"
                            ? "bg-warning text-warning-foreground"
                            : "bg-accent text-accent-foreground"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.alert_type.replace(/_/g, " ")}</span>
                    <span className="text-xs text-muted-foreground">{format(new Date(alert.created_at), "d MMM yyyy HH:mm")}</span>
                  </div>
                  <p className="mt-2 text-sm">{alert.message}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" aria-label="Toggle read" onClick={() => read.mutate({ id: alert.id, value: !alert.is_read })}>
                    <Check className={alert.is_read ? "size-4 text-muted-foreground" : "size-4 text-primary"} />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Delete alert" onClick={() => remove.mutate(alert.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}