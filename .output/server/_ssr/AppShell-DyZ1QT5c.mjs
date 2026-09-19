import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./useAuth-DN8Ac26a.mjs";
import { n as cn, t as Button } from "./button-B2LyfGb_.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Activity, _ as HeartPulse, d as Pill, g as LayoutDashboard, m as LogOut, n as UserRound, p as Menu, t as X, v as FileText, w as BellRing } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DyZ1QT5c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/medications",
		label: "Medications",
		icon: Pill
	},
	{
		to: "/health",
		label: "Health logs",
		icon: HeartPulse
	},
	{
		to: "/prescriptions",
		label: "Prescriptions",
		icon: FileText
	},
	{
		to: "/alerts",
		label: "Alerts",
		icon: BellRing
	},
	{
		to: "/profile",
		label: "Profile",
		icon: UserRound
	}
];
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { signOut, user } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background lg:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar p-4 transition-transform lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "flex items-center gap-2 font-display text-base font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-lg bg-hero-gradient text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" })
							}), "Medisafe"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							onClick: () => setOpen(false),
							"aria-label": "Close menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-6 space-y-1",
						children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent", pathname === item.to && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-4 bottom-4 space-y-2 border-t border-sidebar-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: user?.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "w-full",
							onClick: () => void signOut(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 size-4" }), " Log out"]
						})]
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Close navigation overlay",
				className: "fixed inset-0 z-30 bg-foreground/30 lg:hidden",
				onClick: () => setOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setOpen(true),
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-semibold",
						children: "Medisafe"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-10",
					children
				})]
			})
		]
	});
}
function PageHeader({ title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold",
			children: title
		}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})] }), action]
	});
}
function StateBlock({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center text-sm text-muted-foreground",
		children
	});
}
//#endregion
export { PageHeader as n, StateBlock as r, AppShell as t };
