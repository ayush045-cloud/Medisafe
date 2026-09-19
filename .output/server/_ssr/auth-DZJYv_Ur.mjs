import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DZJYv_Ur.js
var $$splitComponentImporter = () => import("./auth-Bs5Nxu--.mjs");
var Route = createFileRoute("/auth")({
	validateSearch: (search) => ({ mode: search["mode"] === "register" || search["mode"] === "forgot" ? search["mode"] : "login" }),
	head: () => ({ meta: [
		{ title: "Sign in or register — Medisafe" },
		{
			name: "description",
			content: "Access your Medisafe account to manage medications, schedules and health records."
		},
		{
			property: "og:title",
			content: "Sign in or register — Medisafe"
		},
		{
			property: "og:description",
			content: "Access your Medisafe account to manage medications and health records."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
