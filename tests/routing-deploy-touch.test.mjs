import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const readSource = (relativePath) =>
	readFileSync(resolve(repositoryRoot, relativePath), 'utf8');

test('keeps Spanish at root and English under /en', () => {
	const nuxtSource = readSource('nuxt.config.ts');
	const contentSource = readSource('content.config.ts');
	const pageSource = readSource('app/pages/[...slug].vue');
	const articleSource = readSource('app/pages/articles/[...slug].vue');

	assert.match(nuxtSource, /strategy: 'prefix_except_default'/);
	assert.match(nuxtSource, /routes: \['\/', '\/en'\]/);
	assert.match(
		nuxtSource,
		/prerender: process\.env\.NODE_ENV === 'production'/,
	);
	assert.match(contentSource, /content_es:[\s\S]*?prefix: ''/);
	assert.match(contentSource, /articles_es:[\s\S]*?prefix: '\/articles'/);
	assert.match(pageSource, /const path = computed\(\(\) => route\.path\)/);
	assert.match(articleSource, /const path = computed\(\(\) => route\.path\)/);
	assert.doesNotMatch(pageSource, /joinURL\(locale\.value/);
	assert.doesNotMatch(articleSource, /joinURL\(locale\.value/);
});

test('redirects legacy Spanish URLs to unprefixed routes', () => {
	const middlewarePath = 'app/middleware/legacy-es-redirect.global.ts';

	assert.equal(existsSync(resolve(repositoryRoot, middlewarePath)), true);
	const middlewareSource = readSource(middlewarePath);

	assert.match(middlewareSource, /defineNuxtRouteMiddleware/);
	assert.match(middlewareSource, /\/es/);
	assert.match(middlewareSource, /redirectCode: 301/);
	assert.match(middlewareSource, /fullPath/);
});

test('shows Vercel Deploy only on local hosts using the Mindscape main branch', () => {
	const ctaSource = readSource('app/components/home/CTA.vue');
	const readmeSource = readSource('README.md');

	assert.match(ctaSource, /useRequestURL\(\)/);
	assert.match(ctaSource, /localhost/);
	assert.match(ctaSource, /v-if="isLocalEnvironment"/);
	assert.match(ctaSource, /OneCode182%2FMindscape%2Ftree%2Fmain/);
	assert.doesNotMatch(ctaSource, /HugoRCD%2Fcanvas/);
	assert.match(readmeSource, /OneCode182%2FMindscape%2Ftree%2Fmain/);
});

test('delays touch navigation while preserving desktop navigation', () => {
	const composablePath = 'app/composables/useTouchHoverNavigation.ts';
	const composableSource = readSource(composablePath);

	assert.equal(existsSync(resolve(repositoryRoot, composablePath)), true);
	assert.match(
		composableSource,
		/useMediaQuery\('\(hover: none\), \(pointer: coarse\)'\)/,
	);
	assert.match(composableSource, /options\.delay \?\? 1000/);
	assert.match(composableSource, /event\.preventDefault\(\)/);
	assert.match(composableSource, /router\.push/);
	assert.match(composableSource, /window\.location\.assign/);
	assert.match(composableSource, /onBeforeUnmount/);
});

test('wires touch hover navigation into interactive portfolio targets', () => {
	for (const file of [
		'app/components/home/SocialLink.vue',
		'app/components/home/CTA.vue',
		'app/components/MeetingButton.vue',
		'app/components/layout/Navbar.vue',
		'app/components/project/List.vue',
		'app/components/project/Card.vue',
		'app/components/ArticleCard.vue',
		'app/pages/articles/[...slug].vue',
	]) {
		const source = readSource(file);
		assert.match(source, /useTouchHoverNavigation/);
		assert.match(source, /handleClick/);
	}
});
