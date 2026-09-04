export default defineNuxtRouteMiddleware((to) => {
	const legacyPrefix = '/es';
	const isLegacySpanishRoute =
		to.path === legacyPrefix || to.path.startsWith(`${legacyPrefix}/`);

	if (!isLegacySpanishRoute) return;

	const targetPath = to.path.slice(legacyPrefix.length) || '/';
	const queryAndHash = to.fullPath.slice(to.path.length);

	return navigateTo(`${targetPath}${queryAndHash}`, {
		redirectCode: 301,
		replace: true,
	});
});
