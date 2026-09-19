//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Ct-Bc8c-.js
var manifest = {
	"27301031363e284184ead21ac910c33ebfbe9159435c975f26319c6a65fade88": {
		functionName: "deleteMyAccount_createServerFn_handler",
		importer: () => import("./_ssr/account.functions-DH9EkK0g.mjs")
	},
	"db4b965c54fca5c83db136528550d779e661cfaab5947f983f44a32592087547": {
		functionName: "checkMyInteractions_createServerFn_handler",
		importer: () => import("./_ssr/interactions.functions-C_AzM1Yr.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
