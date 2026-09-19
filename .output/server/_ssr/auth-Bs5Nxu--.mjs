import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CFjc3-zE.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./useAuth-DN8Ac26a.mjs";
import { n as cn, t as Button } from "./button-B2LyfGb_.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Activity, h as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DXaOETbi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-DZJYv_Ur.mjs";
import { n as Label, t as Input } from "./label-sQVcd-s9.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Bs5Nxu--.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function AuthPage() {
	const { mode } = Route.useSearch();
	const navigate = useNavigate();
	const { session, loading } = useAuth();
	(0, import_react.useEffect)(() => {
		if (!loading && session) navigate({ to: "/dashboard" });
	}, [
		loading,
		session,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-soft-gradient px-5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-6 flex items-center justify-center gap-2 font-display text-lg font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 place-items-center rounded-xl bg-hero-gradient text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5" })
				}), "Medisafe"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-float",
				children: mode === "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPassword, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Welcome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Sign in or create your Medisafe account." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: mode === "register" ? "register" : "login",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "login",
								children: "Log in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "register",
								children: "Register"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "login",
							className: "pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "register",
							className: "pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, {})
						})
					]
				}) })] })
			})]
		})
	});
}
function LoginForm() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: String(form.get("email")),
			password: String(form.get("password"))
		});
		setBusy(false);
		if (error) {
			toast.error(error.message === "Invalid login credentials" ? "That email or password is incorrect." : error.message);
			return;
		}
		toast.success("Signed in.");
		navigate({ to: "/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "login-email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "login-email",
					name: "email",
					type: "email",
					required: true,
					autoComplete: "email"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "login-password",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "login-password",
					name: "password",
					type: "password",
					required: true,
					autoComplete: "current-password"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "w-full",
				disabled: busy,
				children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Log in"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth",
				search: { mode: "forgot" },
				className: "block text-center text-xs text-muted-foreground underline",
				children: "Forgot your password?"
			})
		]
	});
}
function RegisterForm() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const password = String(form.get("password"));
		if (password.length < 8) {
			toast.error("Use a password of at least 8 characters.");
			return;
		}
		setBusy(true);
		const { data, error } = await supabase.auth.signUp({
			email: String(form.get("email")),
			password,
			options: {
				emailRedirectTo: window.location.origin,
				data: {
					full_name: String(form.get("full_name")),
					date_of_birth: String(form.get("date_of_birth") ?? ""),
					gender: String(form.get("gender") ?? ""),
					phone: String(form.get("phone") ?? "")
				}
			}
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (data.session) {
			toast.success("Account created.");
			navigate({ to: "/dashboard" });
		} else toast.success("Check your email to confirm your account.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "reg-name",
					children: "Full name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "reg-name",
					name: "full_name",
					required: true,
					autoComplete: "name"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "reg-email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "reg-email",
					name: "email",
					type: "email",
					required: true,
					autoComplete: "email"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "reg-password",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "reg-password",
					name: "password",
					type: "password",
					required: true,
					minLength: 8,
					autoComplete: "new-password"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "reg-dob",
						children: "Date of birth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "reg-dob",
						name: "date_of_birth",
						type: "date",
						required: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "reg-phone",
						children: "Phone (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "reg-phone",
						name: "phone",
						type: "tel",
						autoComplete: "tel"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "reg-gender",
					children: "Gender (optional)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "reg-gender",
					name: "gender"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "w-full",
				disabled: busy,
				children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Create account"]
			})
		]
	});
}
function ForgotPassword() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		setBusy(true);
		const { error } = await supabase.auth.resetPasswordForEmail(String(form.get("email")), { redirectTo: `${window.location.origin}/reset-password` });
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		setSent(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Reset your password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "We'll email you a link to choose a new password." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "If an account exists for that address, a reset link is on its way."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "forgot-email",
				children: "Email"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "forgot-email",
				name: "email",
				type: "email",
				required: true
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "submit",
			className: "w-full",
			disabled: busy,
			children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Send reset link"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/auth",
		search: { mode: "login" },
		className: "mt-4 block text-center text-xs text-muted-foreground underline",
		children: "Back to login"
	})] })] });
}
//#endregion
export { AuthPage as component };
