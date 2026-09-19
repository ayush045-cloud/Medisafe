import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-B2LyfGb_.mjs";
import { h as LoaderCircle, i as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader, r as StateBlock } from "./AppShell-DyZ1QT5c.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-DXaOETbi.mjs";
import { t as createAlert } from "./alertService-CowUMJia.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { n as Label, t as Input } from "./label-sQVcd-s9.mjs";
import { a as getVitals, i as deleteVital, n as checkVitalRanges, r as createVital, t as REFERENCE_RANGES } from "./vitalService-wqC1N4RR.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogDescription, t as Dialog } from "./dialog-Csm8sY-W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-BCLiUNH_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
var METRICS = [
	{
		key: "blood_pressure_systolic",
		label: "Systolic BP",
		unit: "mmHg"
	},
	{
		key: "blood_pressure_diastolic",
		label: "Diastolic BP",
		unit: "mmHg"
	},
	{
		key: "heart_rate",
		label: "Heart rate",
		unit: "bpm"
	},
	{
		key: "blood_glucose",
		label: "Blood glucose",
		unit: "mmol/L"
	},
	{
		key: "temperature",
		label: "Temperature",
		unit: "°C"
	},
	{
		key: "oxygen_saturation",
		label: "Oxygen saturation",
		unit: "%"
	},
	{
		key: "weight",
		label: "Weight",
		unit: "kg"
	}
];
function HealthPage() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [metric, setMetric] = (0, import_react.useState)("blood_pressure_systolic");
	const vitals = useQuery({
		queryKey: ["vitals"],
		queryFn: () => getVitals(200)
	});
	const remove = useMutation({
		mutationFn: deleteVital,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vitals"] });
			toast.success("Record deleted.");
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const rows = vitals.data ?? [];
	const series = rows.slice().reverse().filter((row) => row[metric] !== null).map((row) => ({
		date: format(new Date(row.recorded_at), "d MMM HH:mm"),
		value: Number(row[metric])
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Health logs",
			description: "Vitals you have recorded, with informational reference ranges.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }), " Add reading"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between gap-3 space-y-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Trend"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": "Metric",
					value: metric,
					onChange: (event) => setMetric(event.target.value),
					className: "h-9 rounded-md border border-input bg-transparent px-3 text-sm",
					children: METRICS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: m.key,
						children: m.label
					}, m.key))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: vitals.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mb-2 size-4 animate-spin" }), "Loading health data…"] }) : vitals.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "Unable to load your health records. Please try again." }) : series.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No health data available yet for this measurement." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: series,
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
								fontSize: 12,
								domain: ["auto", "auto"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 12,
								border: "1px solid var(--border)",
								background: "var(--card)"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "value",
								stroke: "var(--chart-1)",
								strokeWidth: 2,
								dot: true
							})
						]
					})
				})
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "History"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "overflow-x-auto",
			children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No health readings recorded yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Recorded" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "BP" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "HR" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Glucose" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Temp" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "SpO₂" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Weight" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "whitespace-nowrap",
					children: format(new Date(row.recorded_at), "d MMM yyyy HH:mm")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.blood_pressure_systolic && row.blood_pressure_diastolic ? `${row.blood_pressure_systolic}/${row.blood_pressure_diastolic}` : "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.heart_rate ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.blood_glucose ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.temperature ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.oxygen_saturation ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.weight ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => remove.mutate(row.id),
					"aria-label": "Delete reading",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
				}) })
			] }, row.id)) })] })
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-xs text-muted-foreground",
			children: [
				"Reference ranges shown are general adult informational ranges (",
				Object.values(REFERENCE_RANGES).map((r) => `${r.label} ${r.min}–${r.max} ${r.unit}`).join("; "),
				"). They are informational only and are not a diagnosis. Consult a qualified healthcare professional about your results."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddVitalDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
function AddVitalDialog({ open, onOpenChange }) {
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const num = (key) => {
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
			notes: String(form.get("notes") ?? "").trim() || null
		};
		if (Object.entries(payload).every(([key, value]) => key === "recorded_at" || value === null)) {
			toast.error("Enter at least one measurement.");
			return;
		}
		setBusy(true);
		try {
			const warnings = checkVitalRanges(await createVital(payload));
			for (const message of warnings) await createAlert({
				alert_type: "health_warning",
				severity: "warning",
				message
			});
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
	const nowLocal = (/* @__PURE__ */ new Date(Date.now() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4)).toISOString().slice(0, 16);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add a health reading" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Leave any measurement blank if you didn't take it." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "recorded_at",
							children: "Recorded at"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "recorded_at",
							name: "recorded_at",
							type: "datetime-local",
							defaultValue: nowLocal,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Systolic (mmHg)",
								name: "blood_pressure_systolic"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Diastolic (mmHg)",
								name: "blood_pressure_diastolic"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Heart rate (bpm)",
								name: "heart_rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Blood glucose (mmol/L)",
								name: "blood_glucose",
								step: "0.1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Temperature (°C)",
								name: "temperature",
								step: "0.1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Oxygen saturation (%)",
								name: "oxygen_saturation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Weight (kg)",
								name: "weight",
								step: "0.1"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							name: "notes",
							rows: 2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Save reading"]
					})
				]
			})]
		})
	});
}
function NumField({ label, name, step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			type: "number",
			step: step ?? "1",
			inputMode: "decimal"
		})]
	});
}
//#endregion
export { HealthPage as component };
