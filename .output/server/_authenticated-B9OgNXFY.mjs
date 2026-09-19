import { i as __toESM } from "./_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./_ssr/useAuth-DN8Ac26a.mjs";
import { _ as useNavigate, f as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { h as LoaderCircle } from "./_libs/lucide-react.mjs";
import { t as AppShell } from "./_ssr/AppShell-DyZ1QT5c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-B9OgNXFY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthenticatedLayout() {
	const { session, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading && !session) navigate({
			to: "/auth",
			search: { mode: "login" }
		});
	}, [
		loading,
		session,
		navigate
	]);
	if (loading || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen items-center justify-center text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), " Loading your account…"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AuthenticatedLayout as component };
