import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as AuthProvider } from "./useAuth-DN8Ac26a.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$10 } from "./auth-DZJYv_Ur.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C499q6vM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-7eU3iATa.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Medisafe — Medication & Health Tracking" },
			{
				name: "description",
				content: "Medisafe helps you manage medications, schedules, doses, vitals and prescriptions in one secure place."
			},
			{
				property: "og:title",
				content: "Medisafe — Medication & Health Tracking"
			},
			{
				property: "og:description",
				content: "Manage medications, schedules, doses, vitals and prescriptions in one secure place."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-BoGKwOjw.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Medisafe — Intelligent Medication & Health Safety" },
		{
			name: "description",
			content: "Track medications, build dose schedules, log vitals, store prescriptions and get missed-dose alerts — all in one private account."
		},
		{
			property: "og:title",
			content: "Medisafe — Intelligent Medication & Health Safety"
		},
		{
			property: "og:description",
			content: "Track medications, build dose schedules, log vitals, store prescriptions and get missed-dose alerts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_authenticated-B9OgNXFY.mjs");
var Route$7 = createFileRoute("/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./reset-password-BIQMzuBs.mjs");
var Route$6 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Choose a new password — Medisafe" },
		{
			name: "description",
			content: "Set a new password for your Medisafe account."
		},
		{
			property: "og:title",
			content: "Choose a new password — Medisafe"
		},
		{
			property: "og:description",
			content: "Set a new password for your Medisafe account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./alerts-LJ0oooh4.mjs");
var Route$5 = createFileRoute("/_authenticated/alerts")({
	head: () => ({ meta: [
		{ title: "Alerts — Medisafe" },
		{
			name: "description",
			content: "Missed-dose alerts, safety notices and reference-range warnings generated from your records."
		},
		{
			property: "og:title",
			content: "Alerts — Medisafe"
		},
		{
			property: "og:description",
			content: "Missed-dose alerts and safety notices from your records."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard-nUKLRkUv.mjs");
var Route$4 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — Medisafe" },
		{
			name: "description",
			content: "Today's doses, adherence, recent vitals and alerts from your own records."
		},
		{
			property: "og:title",
			content: "Dashboard — Medisafe"
		},
		{
			property: "og:description",
			content: "Today's doses, adherence, recent vitals and alerts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./health-BCLiUNH_.mjs");
var Route$3 = createFileRoute("/_authenticated/health")({
	head: () => ({ meta: [
		{ title: "Health logs — Medisafe" },
		{
			name: "description",
			content: "Record blood pressure, heart rate, glucose, temperature, oxygen and weight, and view your trends."
		},
		{
			property: "og:title",
			content: "Health logs — Medisafe"
		},
		{
			property: "og:description",
			content: "Record vitals and view your own health trends."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./medications-C9pEs2vZ.mjs");
var Route$2 = createFileRoute("/_authenticated/medications")({
	head: () => ({ meta: [
		{ title: "Medications — Medisafe" },
		{
			name: "description",
			content: "Add, edit and schedule the medications you take, stored privately in your account."
		},
		{
			property: "og:title",
			content: "Medications — Medisafe"
		},
		{
			property: "og:description",
			content: "Add, edit and schedule the medications you take."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./prescriptions-hOMLghNE.mjs");
var Route$1 = createFileRoute("/_authenticated/prescriptions")({
	head: () => ({ meta: [
		{ title: "Prescriptions — Medisafe" },
		{
			name: "description",
			content: "Upload and manage prescription documents in private storage only you can open."
		},
		{
			property: "og:title",
			content: "Prescriptions — Medisafe"
		},
		{
			property: "og:description",
			content: "Upload and manage prescription documents securely."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./profile-CuwOmnD7.mjs");
var Route = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Profile & settings — Medisafe" },
		{
			name: "description",
			content: "Manage your Medisafe profile, notification preferences, password and account."
		},
		{
			property: "og:title",
			content: "Profile & settings — Medisafe"
		},
		{
			property: "og:description",
			content: "Manage your profile, reminders, password and account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AuthenticatedRoute = Route$7.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var ResetPasswordRoute = Route$6.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteChildren = {
	AuthenticatedAlertsRoute: Route$5.update({
		id: "/alerts",
		path: "/alerts",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedDashboardRoute: Route$4.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedHealthRoute: Route$3.update({
		id: "/health",
		path: "/health",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedMedicationsRoute: Route$2.update({
		id: "/medications",
		path: "/medications",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedPrescriptionsRoute: Route$1.update({
		id: "/prescriptions",
		path: "/prescriptions",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedProfileRoute: Route.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => AuthenticatedRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRoute: AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren),
	AuthRoute,
	ResetPasswordRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
