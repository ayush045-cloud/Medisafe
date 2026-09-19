import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CFjc3-zE.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-B2LyfGb_.mjs";
import { f as Pencil, h as LoaderCircle, i as Trash2, s as ShieldQuestionMark, u as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader, r as StateBlock } from "./AppShell-DyZ1QT5c.mjs";
import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
import { t as Badge } from "./badge-DZWKOgwu.mjs";
import { n as CardContent, t as Card } from "./card-DXaOETbi.mjs";
import { n as unwrap, t as requireUserId } from "./api-C1aUDQIA.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-sQVcd-s9.mjs";
import { t as backendApi } from "./backendApi-D4N829Mm.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogDescription, t as Dialog } from "./dialog-Csm8sY-W.mjs";
import { n as createSsrRpc, t as Switch } from "./createSsrRpc-zJuBQWej.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/medications-C9pEs2vZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getMedications() {
	return (await backendApi.get("/medications")).data;
}
async function createMedication(input) {
	return (await backendApi.post("/medications", input)).data;
}
async function updateMedication(id, input) {
	return (await backendApi.patch(`/medications/${id}`, input)).data;
}
async function deleteMedication(id) {
	await backendApi.delete(`/medications/${id}`);
}
async function getSchedules(medicationId) {
	let query = supabase.from("medication_schedules").select("*").order("scheduled_time");
	if (medicationId) query = query.eq("medication_id", medicationId);
	return unwrap(await query, "Unable to load schedules. Please try again.");
}
async function createSchedule(input) {
	const user_id = await requireUserId();
	return unwrap(await supabase.from("medication_schedules").insert({
		...input,
		user_id
	}).select().single(), "We couldn't save this schedule. Please check the details and try again.");
}
async function deleteSchedule(id) {
	const { error } = await supabase.from("medication_schedules").delete().eq("id", id);
	if (error) throw new Error("We couldn't delete this schedule. Please try again.");
}
/**
* Checks the signed-in user's active medications for potential interactions
* using the U.S. National Library of Medicine RxNav service. If the service is
* unavailable, we report that plainly rather than inventing results.
*/
var checkMyInteractions = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("db4b965c54fca5c83db136528550d779e661cfaab5947f983f44a32592087547"));
var FREQUENCIES = [
	"Once daily",
	"Twice daily",
	"Three times daily",
	"Four times daily",
	"Weekly",
	"As needed"
];
var DAYS = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
function MedicationsPage() {
	const queryClient = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [scheduleFor, setScheduleFor] = (0, import_react.useState)(null);
	const meds = useQuery({
		queryKey: ["medications"],
		queryFn: getMedications
	});
	const schedules = useQuery({
		queryKey: ["schedules"],
		queryFn: () => getSchedules()
	});
	const remove = useMutation({
		mutationFn: deleteMedication,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["medications"] });
			queryClient.invalidateQueries({ queryKey: ["schedules"] });
			toast.success("Medication deleted.");
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const toggleActive = useMutation({
		mutationFn: ({ id, is_active }) => updateMedication(id, { is_active }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const interactions = useMutation({
		mutationFn: () => checkMyInteractions({ data: void 0 }),
		onError: () => toast.error("Interaction checking is currently unavailable.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Medications",
			description: "Your medication records and dose schedules.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => interactions.mutate(),
					disabled: interactions.isPending,
					children: [interactions.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldQuestionMark, { className: "mr-2 size-4" }), "Check interactions"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						setEditing(null);
						setFormOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }), " Add medication"]
				})]
			})
		}),
		interactions.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 border-warning/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-5 text-sm",
				children: !interactions.data.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: interactions.data.reason
				}) : interactions.data.interactions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: [
						"No interactions were returned for ",
						interactions.data.checked?.join(", ") || "your medications",
						" by",
						" ",
						interactions.data.source,
						". This is not a guarantee of safety — always consult a qualified healthcare professional."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Potential medication interaction detected. Please consult a qualified healthcare professional."
						}),
						interactions.data.interactions.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/70 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
								children: item.drugs.join(" + ")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: item.description
							})]
						}, index)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Source: ", interactions.data.source]
						})
					]
				})
			})
		}),
		meds.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mb-2 size-4 animate-spin" }), "Loading medications…"] }) : meds.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "Unable to load medications. Please try again." }) : (meds.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No medications added yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: (meds.data ?? []).map((med) => {
				const medSchedules = (schedules.data ?? []).filter((s) => s.medication_id === med.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg font-semibold",
										children: med.medication_name
									}), !med.is_active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: "Inactive"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										med.dosage && `${med.dosage} ${med.dosage_unit ?? ""}`.trim(),
										med.frequency,
										med.route
									].filter(Boolean).join(" · ") || "No dosage details recorded"
								}),
								med.generic_name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["Generic: ", med.generic_name]
								}),
								med.instructions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: med.instructions
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: [
										med.prescribed_by && `Prescribed by ${med.prescribed_by}`,
										med.start_date && `From ${med.start_date}`,
										med.end_date && `Until ${med.end_date}`
									].filter(Boolean).join(" · ")
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: med.is_active,
										onCheckedChange: (checked) => toggleActive.mutate({
											id: med.id,
											is_active: checked
										}),
										"aria-label": "Active"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => {
											setEditing(med);
											setFormOpen(true);
										},
										"aria-label": "Edit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => remove.mutate(med.id),
										"aria-label": "Delete",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4",
							children: [medSchedules.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "No schedule configured yet."
							}) : medSchedules.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "gap-2",
								children: [
									s.scheduled_time.slice(0, 5),
									s.frequency_type === "weekly" && ` · ${(s.days_of_week ?? []).map((d) => DAYS[d]).join(", ")}`,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": "Remove schedule",
										onClick: async () => {
											await deleteSchedule(s.id);
											queryClient.invalidateQueries({ queryKey: ["schedules"] });
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
									})
								]
							}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setScheduleFor(med),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 size-3.5" }), " Add dose time"]
							})]
						})]
					})
				}, med.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicationDialog, {
			open: formOpen,
			onOpenChange: setFormOpen,
			medication: editing
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleDialog, {
			medication: scheduleFor,
			onClose: () => setScheduleFor(null)
		})
	] });
}
function MedicationDialog({ open, onOpenChange, medication }) {
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const text = (key) => {
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
			notes: text("notes")
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: medication ? "Edit medication" : "Add medication" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Record the details exactly as prescribed to you." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Medication name",
						name: "medication_name",
						defaultValue: medication?.medication_name,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Generic name",
						name: "generic_name",
						defaultValue: medication?.generic_name ?? ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dosage",
							name: "dosage",
							type: "number",
							step: "any",
							defaultValue: medication?.dosage ?? ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Unit",
							name: "dosage_unit",
							defaultValue: medication?.dosage_unit ?? "",
							placeholder: "mg"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Route",
							name: "route",
							defaultValue: medication?.route ?? "",
							placeholder: "Oral"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "frequency",
								children: "Frequency"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "frequency",
								name: "frequency",
								defaultValue: medication?.frequency ?? "",
								className: "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Not set"
								}), FREQUENCIES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: f,
									children: f
								}, f))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Start date",
							name: "start_date",
							type: "date",
							defaultValue: medication?.start_date ?? ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "End date",
							name: "end_date",
							type: "date",
							defaultValue: medication?.end_date ?? ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Prescribed by",
						name: "prescribed_by",
						defaultValue: medication?.prescribed_by ?? ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "instructions",
							children: "Instructions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "instructions",
							name: "instructions",
							defaultValue: medication?.instructions ?? "",
							rows: 2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							name: "notes",
							defaultValue: medication?.notes ?? "",
							rows: 2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy,
						children: [
							busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }),
							" ",
							medication ? "Save changes" : "Add medication"
						]
					})
				]
			}, medication?.id ?? "new")]
		})
	});
}
function ScheduleDialog({ medication, onClose }) {
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [weekly, setWeekly] = (0, import_react.useState)(false);
	const [days, setDays] = (0, import_react.useState)([]);
	async function onSubmit(event) {
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
				start_date: String(form.get("start_date") || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)),
				end_date: String(form.get("end_date") || "") || null
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(medication),
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add dose time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: medication?.medication_name })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Time",
						name: "scheduled_time",
						type: "time",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "weekly",
							children: "Only on specific weekdays"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "weekly",
							checked: weekly,
							onCheckedChange: setWeekly
						})]
					}),
					weekly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: DAYS.map((day, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: days.includes(index) ? "default" : "outline",
							onClick: () => setDays((prev) => prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index]),
							children: day
						}, day))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Start date",
							name: "start_date",
							type: "date",
							defaultValue: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "End date",
							name: "end_date",
							type: "date"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy || weekly && days.length === 0,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Add dose time"]
					})
				]
			})]
		})
	});
}
function Field({ label, name, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			...rest
		})]
	});
}
//#endregion
export { MedicationsPage as component };
