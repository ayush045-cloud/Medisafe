import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CFjc3-zE.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-B2LyfGb_.mjs";
import { h as LoaderCircle, i as Trash2, u as Plus, y as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as PageHeader, r as StateBlock } from "./AppShell-DyZ1QT5c.mjs";
import { n as CardContent, t as Card } from "./card-DXaOETbi.mjs";
import { n as unwrap, t as requireUserId } from "./api-C1aUDQIA.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-sQVcd-s9.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogDescription, t as Dialog } from "./dialog-Csm8sY-W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prescriptions-hOMLghNE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_BYTES = 10 * 1024 * 1024;
var ALLOWED = [
	"application/pdf",
	"image/png",
	"image/jpeg",
	"image/webp"
];
async function getPrescriptions() {
	return unwrap(await supabase.from("prescriptions").select("*").order("created_at", { ascending: false }), "Unable to load prescriptions. Please try again.");
}
async function createPrescription(input, file) {
	const user_id = await requireUserId();
	let document_path = null;
	if (file) {
		if (!ALLOWED.includes(file.type)) throw new Error("Only PDF, PNG, JPEG or WebP files can be uploaded.");
		if (file.size > MAX_BYTES) throw new Error("Files must be 10 MB or smaller.");
		const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
		const path = `${user_id}/${crypto.randomUUID()}-${safeName}`;
		const { error } = await supabase.storage.from("prescriptions").upload(path, file, { upsert: false });
		if (error) {
			console.error(error);
			throw new Error("We couldn't upload that file. Please try again.");
		}
		document_path = path;
	}
	return unwrap(await supabase.from("prescriptions").insert({
		...input,
		user_id,
		document_path
	}).select().single(), "We couldn't save this prescription. Please try again.");
}
async function getPrescriptionUrl(path) {
	const { data, error } = await supabase.storage.from("prescriptions").createSignedUrl(path, 60);
	if (error || !data) throw new Error("We couldn't open that document. Please try again.");
	return data.signedUrl;
}
async function deletePrescription(row) {
	if (row.document_path) await supabase.storage.from("prescriptions").remove([row.document_path]);
	const { error } = await supabase.from("prescriptions").delete().eq("id", row.id);
	if (error) throw new Error("We couldn't delete this prescription. Please try again.");
}
function PrescriptionsPage() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const list = useQuery({
		queryKey: ["prescriptions"],
		queryFn: getPrescriptions
	});
	const remove = useMutation({
		mutationFn: (row) => deletePrescription(row),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
			toast.success("Prescription deleted.");
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	async function openDocument(path) {
		try {
			window.open(await getPrescriptionUrl(path), "_blank", "noopener");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Something went wrong.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Prescriptions",
			description: "Documents are stored privately — only your account can open them.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }), " Add prescription"]
			})
		}),
		list.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mb-2 size-4 animate-spin" }), "Loading prescriptions…"] }) : list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "Unable to load prescriptions. Please try again." }) : (list.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBlock, { children: "No prescriptions uploaded yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: (list.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display font-semibold",
								children: row.doctor_name || "Prescription"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: [row.hospital_name, row.prescription_date].filter(Boolean).join(" · ") || "No date recorded"
							}),
							row.diagnosis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: row.diagnosis
							}),
							row.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: row.notes
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => remove.mutate(row),
							"aria-label": "Delete prescription",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})]
					}), row.document_path && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "mt-4",
						onClick: () => void openDocument(row.document_path),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-2 size-4" }), " Open document"]
					})]
				})
			}, row.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
function UploadDialog({ open, onOpenChange }) {
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const file = form.get("document");
		const text = (key) => String(form.get(key) ?? "").trim() || null;
		setBusy(true);
		try {
			await createPrescription({
				doctor_name: text("doctor_name"),
				hospital_name: text("hospital_name"),
				prescription_date: text("prescription_date"),
				diagnosis: text("diagnosis"),
				notes: text("notes")
			}, file instanceof File && file.size > 0 ? file : null);
			queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
			toast.success("Prescription saved successfully.");
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add prescription" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "PDF, PNG, JPEG or WebP up to 10 MB." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Doctor",
							name: "doctor_name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Hospital / clinic",
							name: "hospital_name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Prescription date",
						name: "prescription_date",
						type: "date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "diagnosis",
							children: "Diagnosis / reason"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "diagnosis",
							name: "diagnosis",
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
							rows: 2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "document",
							children: "Document"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "document",
							name: "document",
							type: "file",
							accept: "application/pdf,image/png,image/jpeg,image/webp"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Save prescription"]
					})
				]
			})]
		})
	});
}
function TextField({ label, name, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			type
		})]
	});
}
//#endregion
export { PrescriptionsPage as component };
