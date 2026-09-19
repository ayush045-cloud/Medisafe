import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-B2LyfGb_.mjs";
import { S as Check, h as LoaderCircle, i as Trash2 } from "../_libs/lucide-react.mjs";
import { n as PageHeader, r as StateBlock } from "./AppShell-DyZ1QT5c.mjs";
import { t as Badge } from "./badge-DZWKOgwu.mjs";
import { n as CardContent, t as Card } from "./card-DXaOETbi.mjs";
import { i as markAlertRead, n as deleteAlert, r as getAlerts } from "./alertService-CowUMJia.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-LJ0oooh4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"all",
	"unread",
	"warning",
	"critical"
];
function AlertsPage() {
	const queryClient = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const alerts = useQuery({
		queryKey: ["alerts"],
		queryFn: getAlerts
	});
	const read = useMutation({
		mutationFn: ({ id, value }) => markAlertRead(id, value),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alerts"] }),
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const remove = useMutation({
		mutationFn: deleteAlert,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["alerts"] });
			toast.success("Alert deleted.");
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const rows = (alerts.data ?? []).filter((a) => filter === "all" ? true : filter === "unread" ? !a.is_read : a.severity === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Alert centre",
			description: "Notices created from your own medication and health records."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: FILTERS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filter === value ? "default" : "outline",
				onClick: () => setFilter(value),
				children: value[0].toUpperCase() + value.slice(1)
			}, value))
		}),
		alerts.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mb-2 size-4 animate-spin" }), "Loading alerts…"] }) : alerts.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "Unable to load alerts. Please try again." }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No alerts to show." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map((alert) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: alert.is_read ? "opacity-70" : "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-wrap items-start justify-between gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: alert.severity === "critical" ? "bg-destructive text-destructive-foreground" : alert.severity === "warning" ? "bg-warning text-warning-foreground" : "bg-accent text-accent-foreground",
								children: alert.severity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: alert.alert_type.replace(/_/g, " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: format(new Date(alert.created_at), "d MMM yyyy HH:mm")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: alert.message
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Toggle read",
							onClick: () => read.mutate({
								id: alert.id,
								value: !alert.is_read
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: alert.is_read ? "size-4 text-muted-foreground" : "size-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Delete alert",
							onClick: () => remove.mutate(alert.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})]
					})]
				})
			}, alert.id))
		})
	] });
}
//#endregion
export { AlertsPage as component };
