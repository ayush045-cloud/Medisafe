import { t as supabase } from "./client-CFjc3-zE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-C1aUDQIA.js
/** Friendly error mapping — never surface raw database errors to users. */
var ApiError = class extends Error {};
function unwrap(result, friendly) {
	if (result.error) {
		console.error(friendly, result.error);
		throw new ApiError(friendly);
	}
	return result.data;
}
async function requireUserId() {
	const { data, error } = await supabase.auth.getUser();
	if (error || !data.user) throw new ApiError("Your session has expired. Please sign in again.");
	return data.user.id;
}
//#endregion
export { unwrap as n, requireUserId as t };
