import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as createServerRpc } from "./createServerRpc-MBa5GZ-L.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.functions-DH9EkK0g.js
/** Permanently deletes the signed-in user's account. All records cascade away. */
var deleteMyAccount_createServerFn_handler = createServerRpc({
	id: "27301031363e284184ead21ac910c33ebfbe9159435c975f26319c6a65fade88",
	name: "deleteMyAccount",
	filename: "src/lib/account.functions.ts"
}, (opts) => deleteMyAccount.__executeServer(opts));
var deleteMyAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(deleteMyAccount_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.auth.admin.deleteUser(context.userId);
	if (error) {
		console.error("account deletion failed", error);
		throw new Error("We couldn't delete your account. Please try again.");
	}
	return { success: true };
});
//#endregion
export { deleteMyAccount_createServerFn_handler };
