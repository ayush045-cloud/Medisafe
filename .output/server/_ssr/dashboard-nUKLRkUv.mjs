import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CFjc3-zE.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-B2LyfGb_.mjs";
import { a as Timer, b as Clock, h as LoaderCircle, l as ShieldAlert, o as SkipForward, r as TriangleAlert, x as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as PageHeader, r as StateBlock } from "./AppShell-DyZ1QT5c.mjs";
import { t as Badge } from "./badge-DZWKOgwu.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-DXaOETbi.mjs";
import { n as unwrap, t as requireUserId } from "./api-C1aUDQIA.mjs";
import { r as getAlerts } from "./alertService-CowUMJia.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { a as getVitals } from "./vitalService-wqC1N4RR.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-nUKLRkUv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SELECT = "*, medications(id, medication_name, dosage, dosage_unit, instructions)";
async function getLogs(params = {}) {
	let query = supabase.from("medication_logs").select(SELECT).order("scheduled_at", { ascending: false }).limit(params.limit ?? 200);
	if (params.from) query = query.gte("scheduled_at", params.from);
	if (params.to) query = query.lte("scheduled_at", params.to);
	return unwrap(await query, "Unable to load medication history. Please try again.");
}
async function getTodayLogs() {
	const start = /* @__PURE__ */ new Date();
	start.setHours(0, 0, 0, 0);
	const end = new Date(start);
	end.setDate(end.getDate() + 1);
	return (await getLogs({
		from: start.toISOString(),
		to: end.toISOString()
	})).sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at));
}
async function setLogStatus(id, status) {
	const { error } = await supabase.from("medication_logs").update({
		status,
		taken_at: status === "TAKEN" ? (/* @__PURE__ */ new Date()).toISOString() : null
	}).eq("id", id);
	if (error) throw new Error("We couldn't record that action. Please try again.");
}
/** Snooze pushes the scheduled occurrence forward and returns it to pending. */
async function snoozeLog(id, minutes = 15) {
	const { data, error } = await supabase.from("medication_logs").select("scheduled_at").eq("id", id).single();
	if (error || !data) throw new Error("We couldn't snooze this reminder. Please try again.");
	const next = new Date(Math.max(Date.now(), new Date(data.scheduled_at).getTime()) + minutes * 6e4);
	const { error: updateError } = await supabase.from("medication_logs").update({
		scheduled_at: next.toISOString(),
		status: "PENDING",
		taken_at: null
	}).eq("id", id);
	if (updateError) throw new Error("We couldn't snooze this reminder. Please try again.");
}
async function getAdherence(days = 30) {
	const from = (/* @__PURE__ */ new Date(Date.now() - days * 864e5)).toISOString();
	const user_id = await requireUserId();
	const rows = unwrap(await supabase.from("medication_logs").select("status, scheduled_at").eq("user_id", user_id).gte("scheduled_at", from), "Unable to calculate adherence. Please try again.");
	const counts = {
		TAKEN: 0,
		MISSED: 0,
		SKIPPED: 0,
		PENDING: 0
	};
	for (const row of rows) counts[row.status] = (counts[row.status] ?? 0) + 1;
	const taken = counts["TAKEN"] ?? 0;
	const missed = counts["MISSED"] ?? 0;
	const skipped = counts["SKIPPED"] ?? 0;
	const resolved = taken + missed + skipped;
	return {
		taken,
		missed,
		skipped,
		pending: counts["PENDING"] ?? 0,
		total: rows.length,
		adherenceRate: resolved > 0 ? Math.round(taken / resolved * 100) : null
	};
}
/**
* Materialises today's dose occurrences for the signed-in user's active
* schedules, and marks overdue pending doses as missed. The same logic runs
* server-side on a schedule; this call keeps the UI current the moment the
* user opens the app. It is idempotent — a unique constraint on
* (schedule_id, scheduled_at) prevents duplicates.
*/
async function syncOccurrences() {
	const user_id = await requireUserId();
	const today = /* @__PURE__ */ new Date();
	const isoDate = today.toISOString().slice(0, 10);
	const weekday = today.getDay();
	const { data: schedules, error } = await supabase.from("medication_schedules").select("id, medication_id, scheduled_time, frequency_type, days_of_week, start_date, end_date, is_active").eq("is_active", true);
	if (error || !schedules) return;
	const rows = schedules.filter((s) => s.start_date <= isoDate && (!s.end_date || s.end_date >= isoDate)).filter((s) => s.frequency_type !== "weekly" || (s.days_of_week ?? []).includes(weekday)).map((s) => {
		const parts = s.scheduled_time.split(":");
		const at = new Date(today);
		at.setHours(Number(parts[0] ?? 0), Number(parts[1] ?? 0), 0, 0);
		return {
			user_id,
			schedule_id: s.id,
			medication_id: s.medication_id,
			scheduled_at: at.toISOString(),
			status: "PENDING"
		};
	});
	if (rows.length > 0) await supabase.from("medication_logs").upsert(rows, {
		onConflict: "schedule_id,scheduled_at",
		ignoreDuplicates: true
	});
	const cutoff = (/* @__PURE__ */ new Date(Date.now() - 3600 * 1e3)).toISOString();
	const { data: overdue } = await supabase.from("medication_logs").select("id, medication_id, scheduled_at, medications(medication_name)").eq("status", "PENDING").lt("scheduled_at", cutoff);
	if (overdue && overdue.length > 0) {
		await supabase.from("medication_logs").update({ status: "MISSED" }).in("id", overdue.map((row) => row.id));
		await supabase.from("alerts").insert(overdue.map((row) => ({
			user_id,
			medication_id: row.medication_id,
			alert_type: "missed_medication",
			severity: "warning",
			message: `Your ${new Date(row.scheduled_at).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})} dose of ${row.medications?.medication_name ?? "medication"} was not marked as taken.`
		})));
	}
}
function Dashboard() {
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		syncOccurrences().then(() => {
			queryClient.invalidateQueries({ queryKey: ["today-logs"] });
			queryClient.invalidateQueries({ queryKey: ["adherence"] });
			queryClient.invalidateQueries({ queryKey: ["alerts"] });
		}).catch((error) => console.error(error));
	}, [queryClient]);
	const today = useQuery({
		queryKey: ["today-logs"],
		queryFn: getTodayLogs
	});
	const adherence = useQuery({
		queryKey: ["adherence"],
		queryFn: () => getAdherence(30)
	});
	const vitals = useQuery({
		queryKey: ["vitals"],
		queryFn: () => getVitals(60)
	});
	const alerts = useQuery({
		queryKey: ["alerts"],
		queryFn: getAlerts
	});
	const action = useMutation({
		mutationFn: async ({ id, kind }) => {
			if (kind === "SNOOZE") return snoozeLog(id, 15);
			return setLogStatus(id, kind);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["today-logs"] });
			queryClient.invalidateQueries({ queryKey: ["adherence"] });
			toast.success("Dose updated.");
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Something went wrong.")
	});
	const doses = today.data ?? [];
	const next = doses.find((d) => d.status === "PENDING" && new Date(d.scheduled_at) >= /* @__PURE__ */ new Date());
	const unread = (alerts.data ?? []).filter((a) => !a.is_read);
	const vitalSeries = (vitals.data ?? []).slice().reverse().map((v) => ({
		date: format(new Date(v.recorded_at), "d MMM"),
		systolic: v.blood_pressure_systolic,
		diastolic: v.blood_pressure_diastolic,
		heart_rate: v.heart_rate
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Dashboard",
			description: "Everything below is calculated from records in your account."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Next dose",
					value: next ? format(new Date(next.scheduled_at), "HH:mm") : "—",
					hint: next?.medications?.medication_name ?? "No upcoming dose today",
					icon: Clock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Adherence (30 days)",
					value: adherence.data?.adherenceRate === null || adherence.data === void 0 ? "—" : `${adherence.data.adherenceRate}%`,
					hint: adherence.data ? `${adherence.data.taken} taken · ${adherence.data.missed} missed · ${adherence.data.skipped} skipped` : "No dose history yet",
					icon: CircleCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Doses today",
					value: String(doses.length),
					hint: `${doses.filter((d) => d.status === "TAKEN").length} marked taken`,
					icon: Timer
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Unread alerts",
					value: String(unread.length),
					hint: unread.length ? "Review your alert centre" : "Nothing needs attention",
					icon: ShieldAlert
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Today's medication"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: today.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mb-2 size-4 animate-spin" }), "Loading medications…"] }) : today.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "Unable to load today's medication. Please try again." }) : doses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No doses scheduled for today. Add a medication schedule to see reminders here." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: doses.map((dose) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-14 font-display text-sm font-semibold",
								children: format(new Date(dose.scheduled_at), "HH:mm")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-40 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: dose.medications?.medication_name ?? "Medication"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: [dose.medications?.dosage, dose.medications?.dosage_unit].filter(Boolean).join(" ") || "Dosage not set"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: dose.status }),
							dose.status === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										disabled: action.isPending,
										onClick: () => action.mutate({
											id: dose.id,
											kind: "TAKEN"
										}),
										children: "Taken"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										disabled: action.isPending,
										onClick: () => action.mutate({
											id: dose.id,
											kind: "SKIPPED"
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										disabled: action.isPending,
										onClick: () => action.mutate({
											id: dose.id,
											kind: "SNOOZE"
										}),
										children: "Snooze"
									})
								]
							})
						]
					}, dose.id))
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Recent alerts"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: alerts.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "Loading alerts…" }) : (alerts.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No alerts yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: (alerts.data ?? []).slice(0, 5).map((alert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border/70 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: alert.severity
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: alert.message
					})]
				}, alert.id))
			}) })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Health trends"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: vitals.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "Loading health data…" }) : vitalSeries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No health data available yet. Record a vital in Health logs to see trends." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: vitalSeries,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "date",
								stroke: "var(--muted-foreground)",
								fontSize: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--muted-foreground)",
								fontSize: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 12,
								border: "1px solid var(--border)",
								background: "var(--card)"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "systolic",
								stroke: "var(--chart-1)",
								strokeWidth: 2,
								dot: false,
								connectNulls: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "diastolic",
								stroke: "var(--chart-2)",
								strokeWidth: 2,
								dot: false,
								connectNulls: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "heart_rate",
								stroke: "var(--chart-3)",
								strokeWidth: 2,
								dot: false,
								connectNulls: true
							})
						]
					})
				})
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-xs text-muted-foreground",
			children: "Medisafe is a medication management and tracking tool. It does not replace professional medical advice, diagnosis, or treatment."
		})
	] });
}
function StatCard({ label, value, hint, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl font-semibold",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: hint
				})
			]
		})
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		className: {
			TAKEN: "bg-success text-success-foreground",
			MISSED: "bg-destructive text-destructive-foreground",
			SKIPPED: "bg-muted text-muted-foreground",
			PENDING: "bg-accent text-accent-foreground"
		}[status] ?? "",
		children: status.toLowerCase()
	});
}
//#endregion
export { StatusBadge, Dashboard as component };
