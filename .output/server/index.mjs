globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/AppShell-1QZ6Tod5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d8-ZQ4gX3ex8syIFAY+JchY/DAXba4\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 4312,
		"path": "../public/assets/AppShell-1QZ6Tod5.js"
	},
	"/assets/_authenticated-BIHjLxMU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"264-uZoywUSO8FPm+e1wRwS6OsGVBys\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 612,
		"path": "../public/assets/_authenticated-BIHjLxMU.js"
	},
	"/assets/activity-cIgMCzH2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e0-VWnqeVA76BtNyoz7iagvW/1cWik\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 224,
		"path": "../public/assets/activity-cIgMCzH2.js"
	},
	"/assets/alertService-WlKYkPlj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e23-inwtfmjbRuo2OLWZhWuAfiekUNk\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 20003,
		"path": "../public/assets/alertService-WlKYkPlj.js"
	},
	"/assets/alerts-BoL2lc-z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc4-NnPpZqBCt8sMAn6mdUG9Aisogro\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 3012,
		"path": "../public/assets/alerts-BoL2lc-z.js"
	},
	"/assets/api-BkLYNP-M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-qudCLqexymxi39nRY2Qyd1DKWqU\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 322,
		"path": "../public/assets/api-BkLYNP-M.js"
	},
	"/assets/auth-Bkc8F9Ja.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50ec-58oYl4eHPL3RnTku7Yz5naezI7o\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 20716,
		"path": "../public/assets/auth-Bkc8F9Ja.js"
	},
	"/assets/auth-middleware-B-p2D8K2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2410-IrRbOkWUjVHn+EmXfGgGWZjLBtE\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 9232,
		"path": "../public/assets/auth-middleware-B-p2D8K2.js"
	},
	"/assets/badge-DBRbWOJk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"308-Lbk2hpfJ6lVlRwnu/XpfRQDHVnQ\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 776,
		"path": "../public/assets/badge-DBRbWOJk.js"
	},
	"/assets/backendApi-Dy7ojdBW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c8-n0fda+3J5/6zwIEqh+sgDejEjgE\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 712,
		"path": "../public/assets/backendApi-Dy7ojdBW.js"
	},
	"/assets/button-Cz1vrFQD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8161-8WIgJITEgL6cmiQnjOV9ZEgAzkI\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 33121,
		"path": "../public/assets/button-Cz1vrFQD.js"
	},
	"/assets/card-i_w4AvVT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"422-GCFNMeZuKNa42Z9pj+tPhzgLdgE\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 1058,
		"path": "../public/assets/card-i_w4AvVT.js"
	},
	"/assets/dashboard-CoK-2MXA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc3-O6MLxmOS/t/x9ofe7zE1cOXWShY\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 11203,
		"path": "../public/assets/dashboard-CoK-2MXA.js"
	},
	"/assets/dialog-tZJolWHl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6eae-eZv+IE+SvFqrHWiMnZdBLmwZmhE\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 28334,
		"path": "../public/assets/dialog-tZJolWHl.js"
	},
	"/assets/dist-CIGhfWgt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ff-co1jvNciIvVMwJzd5ah9R71ORGw\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 4351,
		"path": "../public/assets/dist-CIGhfWgt.js"
	},
	"/assets/dist-DQIDQFog.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c70-4bxbpXd5iPdtxE0ElgRLPosHYDU\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 3184,
		"path": "../public/assets/dist-DQIDQFog.js"
	},
	"/assets/health-Cl3Jwav2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"237f-ik9jKe/Jh1z7LvADRVUvsu/rBGQ\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 9087,
		"path": "../public/assets/health-Cl3Jwav2.js"
	},
	"/assets/label-CCQnGSVE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"694-XKIJ+IUEf9bXXryr7pxH9/9iKPQ\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 1684,
		"path": "../public/assets/label-CCQnGSVE.js"
	},
	"/assets/loader-circle-Cegz5-m5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86-8ANp6UI6nT9ppaYfjQXlPNxq+jM\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 134,
		"path": "../public/assets/loader-circle-Cegz5-m5.js"
	},
	"/assets/medications-BYTQF5K8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3145-o+mLzqrWt6m2K3KdmoOHY86l3OQ\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 12613,
		"path": "../public/assets/medications-BYTQF5K8.js"
	},
	"/assets/pill-Cw0QY_-A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47d-xSUN8hIhHHvoIv8ehJo5Gd2LuNc\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 1149,
		"path": "../public/assets/pill-Cw0QY_-A.js"
	},
	"/assets/prescriptions-B56J7Mva.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183d-7tSmqgJQEbtoUfuPRK317RvH81U\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 6205,
		"path": "../public/assets/prescriptions-B56J7Mva.js"
	},
	"/assets/profile-CPs7aaeQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17c8-3FY8PEJV6jdmqdNPWypx/62dFeg\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 6088,
		"path": "../public/assets/profile-CPs7aaeQ.js"
	},
	"/assets/profileService-ByH-r1KH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42d-V+HFxxgFMkVfGVIk04mBZ40V8MQ\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 1069,
		"path": "../public/assets/profileService-ByH-r1KH.js"
	},
	"/assets/index-D7pcHmlG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e7e5-e0HLOK+pMDjD8zKFKBusvUxTALA\"",
		"mtime": "2026-09-19T15:56:33.731Z",
		"size": 583653,
		"path": "../public/assets/index-D7pcHmlG.js"
	},
	"/assets/reset-password-B__OhH13.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60e-s/aTkGDnbhFQ1ZHCPbi2BqCuHMU\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 1550,
		"path": "../public/assets/reset-password-B__OhH13.js"
	},
	"/assets/routes-J71wmcsc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e3f-0zIMxc52L/sehplaf/C4WWUyhuk\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 7743,
		"path": "../public/assets/routes-J71wmcsc.js"
	},
	"/assets/styles-7eU3iATa.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13e2d-GzX9FV6VgRfJPB4ehT1m0b/8S+k\"",
		"mtime": "2026-09-19T15:56:33.733Z",
		"size": 81453,
		"path": "../public/assets/styles-7eU3iATa.css"
	},
	"/assets/useMutation-CvQp0dzP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a8a-FYSdLHOrthrV2HvxebAfs92Qfhk\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 10890,
		"path": "../public/assets/useMutation-CvQp0dzP.js"
	},
	"/assets/trash-2-Cf6BkCV3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-0pd5cVoWhLReNFUZA1fA1vGuV/8\"",
		"mtime": "2026-09-19T15:56:33.732Z",
		"size": 318,
		"path": "../public/assets/trash-2-Cf6BkCV3.js"
	},
	"/assets/useRouter-aFWvmcP6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f3c-jFBknHFx1pLsveczpzRemGEtubA\"",
		"mtime": "2026-09-19T15:56:33.733Z",
		"size": 12092,
		"path": "../public/assets/useRouter-aFWvmcP6.js"
	},
	"/assets/vitalService-CThe9N0M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c9eb-AZsWMAdObKIa3aiHF55IvbYZLRU\"",
		"mtime": "2026-09-19T15:56:33.733Z",
		"size": 379371,
		"path": "../public/assets/vitalService-CThe9N0M.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_uZSQB3 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_uZSQB3
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
