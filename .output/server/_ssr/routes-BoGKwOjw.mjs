import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-B2LyfGb_.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as CalendarClock, T as Activity, _ as HeartPulse, c as ShieldCheck, d as Pill, v as FileText, w as BellRing } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-DXaOETbi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BoGKwOjw.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: Pill,
		title: "Medication records",
		body: "Dosage, route, instructions, prescriber and treatment dates kept in one structured record."
	},
	{
		icon: CalendarClock,
		title: "Dose schedules",
		body: "Once daily, twice daily, several times a day or specific weekdays — with start and end dates."
	},
	{
		icon: BellRing,
		title: "Dose tracking",
		body: "Every occurrence is generated server-side so you can mark it taken, skipped or snoozed."
	},
	{
		icon: HeartPulse,
		title: "Vitals & trends",
		body: "Log blood pressure, heart rate, glucose, temperature, oxygen and weight, then view real trends."
	},
	{
		icon: FileText,
		title: "Prescriptions",
		body: "Upload documents to private storage that only your account can open."
	},
	{
		icon: ShieldCheck,
		title: "Safety alerts",
		body: "Missed-dose alerts and informational reference-range notices, with interaction checks via RxNav."
	}
];
var steps = [
	{
		n: "01",
		title: "Create your account",
		body: "Register with your name, email and date of birth. Your data is isolated to your account."
	},
	{
		n: "02",
		title: "Add medications & schedules",
		body: "Record each medication and the times you take it."
	},
	{
		n: "03",
		title: "Track and review",
		body: "Mark doses, log vitals and watch adherence and health trends build from your real records."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 font-display text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-xl bg-hero-gradient text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5" })
						}), "Medisafe"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: "login" },
								children: "Log in"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: "register" },
								children: "Get started"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-soft-gradient",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:py-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Private by design"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 text-4xl leading-tight font-semibold md:text-5xl",
								children: "Never lose track of a dose again"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-lg text-base text-muted-foreground md:text-lg",
								children: "Medisafe keeps your medications, dose schedules, vitals and prescriptions in one secure account — with real adherence figures calculated from what you actually recorded."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										search: { mode: "register" },
										children: "Create free account"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										search: { mode: "login" },
										children: "I already have an account"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-md text-xs text-muted-foreground",
								children: "Medisafe is a medication management and tracking tool. It does not replace professional medical advice, diagnosis, or treatment."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/70 shadow-float",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-4 p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-sm font-semibold text-muted-foreground",
									children: "What you get"
								}), features.slice(0, 4).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: f.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: f.body
									})] })]
								}, f.title))]
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-6xl px-5 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-semibold",
							children: "Everything in one record"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-muted-foreground",
							children: "Each feature is backed by your own data. Nothing is simulated — empty sections stay empty until you add something."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
							children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-border/70 shadow-card transition-shadow hover:shadow-float",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 text-base font-semibold",
											children: f.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: f.body
										})
									]
								})
							}, f.title))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y border-border/60 bg-secondary/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5 py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-semibold",
							children: "How it works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-6 md:grid-cols-3",
							children: steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/70 bg-card p-6 shadow-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-2xl font-semibold text-primary",
										children: s.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-3 text-base font-semibold",
										children: s.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: s.body
									})
								]
							}, s.n))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-5 py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-hero-gradient px-8 py-14 text-center text-primary-foreground shadow-float",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-semibold",
								children: "Start tracking today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-3 max-w-xl text-sm opacity-90",
								children: "Your medication history, adherence and health trends — built from your own records, visible only to you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "secondary",
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									search: { mode: "register" },
									children: "Create your account"
								})
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/60 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: "Medisafe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl",
						children: "Medisafe is a medication management and tracking tool. It does not diagnose conditions, prescribe medication or recommend dosage changes. Always consult a qualified healthcare professional."
					})]
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
