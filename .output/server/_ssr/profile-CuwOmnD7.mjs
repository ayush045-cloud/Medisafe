import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./useAuth-DN8Ac26a.mjs";
import { t as Button } from "./button-B2LyfGb_.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./AppShell-DyZ1QT5c.mjs";
import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DXaOETbi.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-sQVcd-s9.mjs";
import { n as createSsrRpc, t as Switch } from "./createSsrRpc-zJuBQWej.mjs";
import { a as updateProfile, i as updatePreferences, n as getPreferences, r as getProfile, t as changePassword } from "./profileService-M4Mi8wsm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CuwOmnD7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Permanently deletes the signed-in user's account. All records cascade away. */
var deleteMyAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("27301031363e284184ead21ac910c33ebfbe9159435c975f26319c6a65fade88"));
function ProfilePage() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { user, signOut } = useAuth();
	const profile = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile
	});
	const prefs = useQuery({
		queryKey: ["preferences"],
		queryFn: getPreferences
	});
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const saveProfile = useMutation({
		mutationFn: updateProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			toast.success("Profile updated successfully.");
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const savePrefs = useMutation({
		mutationFn: updatePreferences,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["preferences"] }),
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const password = useMutation({
		mutationFn: changePassword,
		onSuccess: () => toast.success("Password changed successfully."),
		onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong.")
	});
	const [reminder, setReminder] = (0, import_react.useState)(15);
	(0, import_react.useEffect)(() => {
		if (prefs.data) setReminder(prefs.data.reminder_minutes_before ?? 15);
	}, [prefs.data]);
	async function onDeleteAccount() {
		setDeleting(true);
		try {
			await deleteMyAccount();
			toast.success("Your account and all of its data have been deleted.");
			await signOut();
			navigate({ to: "/" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "We couldn't delete your account. Please try again.");
		} finally {
			setDeleting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Profile & settings",
		description: "Your details, reminders and account controls."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "Personal details"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: ["Signed in as ", user?.email] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: profile.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : profile.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Unable to load your profile. Please try again."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: (event) => {
				event.preventDefault();
				const form = new FormData(event.currentTarget);
				const text = (key) => String(form.get(key) ?? "").trim() || null;
				saveProfile.mutate({
					full_name: String(form.get("full_name") ?? "").trim(),
					phone: text("phone"),
					date_of_birth: text("date_of_birth"),
					gender: text("gender")
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Full name",
					name: "full_name",
					defaultValue: profile.data?.full_name ?? ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Phone",
						name: "phone",
						defaultValue: profile.data?.phone ?? ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Date of birth",
						name: "date_of_birth",
						type: "date",
						defaultValue: profile.data?.date_of_birth ?? ""
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Gender",
					name: "gender",
					defaultValue: profile.data?.gender ?? ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: saveProfile.isPending,
					children: [saveProfile.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Save profile"]
				})
			]
		}, profile.data?.id) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Reminders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Control how Medisafe notifies you about doses." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email_enabled",
								children: "Email reminders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "email_enabled",
								checked: prefs.data?.email_enabled ?? false,
								onCheckedChange: (value) => savePrefs.mutate({ email_enabled: value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "browser_enabled",
								children: "In-app reminders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "browser_enabled",
								checked: prefs.data?.browser_enabled ?? false,
								onCheckedChange: (value) => savePrefs.mutate({ browser_enabled: value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "reminder_minutes_before",
								children: "Remind me this many minutes before a dose"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "reminder_minutes_before",
									type: "number",
									min: 0,
									max: 180,
									value: reminder,
									onChange: (event) => setReminder(Number(event.target.value))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => savePrefs.mutate({ reminder_minutes_before: reminder }),
									disabled: savePrefs.isPending,
									children: "Save"
								})]
							})]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Change password"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: (event) => {
						event.preventDefault();
						const form = new FormData(event.currentTarget);
						const next = String(form.get("new_password"));
						if (next.length < 8) {
							toast.error("Use at least 8 characters.");
							return;
						}
						if (next !== String(form.get("confirm_password"))) {
							toast.error("The passwords don't match.");
							return;
						}
						password.mutate(next);
						event.currentTarget.reset();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "New password",
							name: "new_password",
							type: "password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Confirm new password",
							name: "confirm_password",
							type: "password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: password.isPending,
							children: [password.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Change password"]
						})
					]
				}) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-destructive/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base text-destructive",
						children: "Delete account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "This permanently removes your account, medications, health records and prescription files. It cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "confirm",
								children: "Type DELETE to confirm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "confirm",
								value: confirm,
								onChange: (event) => setConfirm(event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "destructive",
								disabled: confirm !== "DELETE" || deleting,
								onClick: onDeleteAccount,
								children: [deleting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Delete my account"]
							})
						]
					})]
				})
			]
		})]
	})] });
}
function TextField({ label, name, type = "text", defaultValue }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			type,
			defaultValue
		})]
	});
}
//#endregion
export { ProfilePage as component };
