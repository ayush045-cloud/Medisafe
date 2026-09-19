import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as createServerRpc } from "./createServerRpc-MBa5GZ-L.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interactions.functions-C_AzM1Yr.js
var RXNAV = "https://rxnav.nlm.nih.gov/REST";
async function resolveRxcui(name) {
	try {
		const res = await fetch(`${RXNAV}/rxcui.json?name=${encodeURIComponent(name)}&search=2`);
		if (!res.ok) return null;
		return (await res.json()).idGroup?.rxnormId?.[0] ?? null;
	} catch {
		return null;
	}
}
async function checkInteractions(names) {
	const unique = Array.from(new Set(names.map((n) => n.trim()).filter(Boolean)));
	if (unique.length < 2) return {
		available: true,
		source: "RxNav (U.S. National Library of Medicine)",
		checked: unique,
		interactions: []
	};
	const resolved = [];
	for (const name of unique) {
		const rxcui = await resolveRxcui(name);
		if (rxcui) resolved.push({
			name,
			rxcui
		});
	}
	if (resolved.length < 2) return {
		available: false,
		reason: "We couldn't match enough of your medications to a recognised drug identifier, so an interaction check can't be performed.",
		interactions: []
	};
	try {
		const res = await fetch(`${RXNAV}/interaction/list.json?rxcuis=${resolved.map((r) => r.rxcui).join("+")}`);
		if (!res.ok) throw new Error(`RxNav responded ${res.status}`);
		const json = await res.json();
		const interactions = [];
		for (const group of json.fullInteractionTypeGroup ?? []) for (const type of group.fullInteractionType ?? []) for (const pair of type.interactionPair ?? []) interactions.push({
			drugs: (pair.interactionConcept ?? []).map((c) => c.minConceptItem?.name).filter((n) => Boolean(n)),
			description: pair.description ?? "",
			severity: pair.severity ?? null
		});
		return {
			available: true,
			source: "RxNav (U.S. National Library of Medicine)",
			checked: resolved.map((r) => r.name),
			interactions
		};
	} catch (error) {
		console.error("interaction check failed", error);
		return {
			available: false,
			reason: "The drug interaction data service is currently unavailable. Please try again later.",
			interactions: []
		};
	}
}
/**
* Checks the signed-in user's active medications for potential interactions
* using the U.S. National Library of Medicine RxNav service. If the service is
* unavailable, we report that plainly rather than inventing results.
*/
var checkMyInteractions_createServerFn_handler = createServerRpc({
	id: "db4b965c54fca5c83db136528550d779e661cfaab5947f983f44a32592087547",
	name: "checkMyInteractions",
	filename: "src/lib/interactions.functions.ts"
}, (opts) => checkMyInteractions.__executeServer(opts));
var checkMyInteractions = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(checkMyInteractions_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("medications").select("id, medication_name").eq("is_active", true);
	if (error) {
		console.error(error);
		return {
			available: false,
			reason: "We couldn't read your medication list.",
			interactions: []
		};
	}
	return checkInteractions((data ?? []).map((m) => m.medication_name));
});
//#endregion
export { checkMyInteractions_createServerFn_handler };
