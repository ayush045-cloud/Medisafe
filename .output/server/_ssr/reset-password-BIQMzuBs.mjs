import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-B2LyfGb_.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DXaOETbi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-sQVcd-s9.mjs";
import { t as changePassword } from "./profileService-M4Mi8wsm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-BIQMzuBs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const password = String(new FormData(event.currentTarget).get("password"));
		if (password.length < 8) {
			toast.error("Use a password of at least 8 characters.");
			return;
		}
		setBusy(true);
		try {
			await changePassword(password);
			toast.success("Password updated.");
			navigate({ to: "/dashboard" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-soft-gradient px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md shadow-float",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Choose a new password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Open this page from the reset link in your email." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "new-password",
						children: "New password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "new-password",
						name: "password",
						type: "password",
						required: true,
						minLength: 8
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					className: "w-full",
					disabled: busy,
					children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Update password"]
				})]
			}) })]
		})
	});
}
//#endregion
export { ResetPassword as component };
