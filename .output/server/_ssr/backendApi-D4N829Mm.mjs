import { t as supabase } from "./client-CFjc3-zE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/backendApi-D4N829Mm.js
var API_URL = "http://localhost:5000/api".replace(/\/$/, "");
async function request(path, init = {}) {
	const { data: { session } } = await supabase.auth.getSession();
	if (!session?.access_token) throw new Error("Your session has expired. Please sign in again.");
	const response = await fetch(`${API_URL}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session.access_token}`,
			...init.headers || {}
		}
	});
	if (!response.ok) {
		const body = await response.json().catch(() => null);
		throw new Error(body?.error || `Backend request failed (${response.status})`);
	}
	if (response.status === 204) return void 0;
	return response.json();
}
var backendApi = {
	get: (path) => request(path),
	post: (path, body) => request(path, {
		method: "POST",
		body: JSON.stringify(body)
	}),
	patch: (path, body) => request(path, {
		method: "PATCH",
		body: JSON.stringify(body)
	}),
	delete: (path) => request(path, { method: "DELETE" })
};
//#endregion
export { backendApi as t };
