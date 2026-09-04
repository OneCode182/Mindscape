import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const readSource = (relativePath) =>
	readFileSync(resolve(repositoryRoot, relativePath), 'utf8');

test('reserves mobile safe area below fixed navigation', () => {
	const layoutSource = readSource('app/layouts/default.vue');
	const mainStyles = readSource('app/assets/style/main.css');

	assert.match(
		layoutSource,
		/pb-\[calc\(5rem\+env\(safe-area-inset-bottom\)\)\]/,
	);
	assert.match(
		mainStyles,
		/scroll-padding-bottom:\s*calc\(5rem\s*\+\s*env\(safe-area-inset-bottom\)\)/,
	);
	assert.match(layoutSource, /bg-\[#010101\]\/95/);
});

test('keeps mobile navbar links usable without horizontal overflow', () => {
	const navbarSource = readSource('app/components/layout/Navbar.vue');

	assert.match(navbarSource, /w-full/);
	assert.match(navbarSource, /min-h-11/);
	assert.match(navbarSource, /min-w-11/);
	assert.match(navbarSource, /gap-0/);
	assert.match(navbarSource, /bg-\[#010101\]\/95/);
});

test('uses fluid hero sizing while preserving desktop grid composition', () => {
	const homeSource = readSource('app/components/content/Home.vue');
	const profileSource = readSource('app/components/home/ProfilePicture.vue');

	assert.match(
		homeSource,
		/<div class="order-2 min-w-0">[\s\S]*<HomeProfilePicture \/>/,
	);
	assert.doesNotMatch(homeSource, /<HomeProfilePicture class="order-2" \/>/);
	assert.match(homeSource, /min-h-dvh/);
	assert.match(homeSource, /text-\[clamp\(2\.25rem,10vw,4\.5rem\)\]/);
	assert.match(profileSource, /size-\[min\(80vw,26rem\)\]/);
	assert.match(profileSource, /lg:size-\[26rem\]/);
});

test('wraps narrow project and experience content', () => {
	const projectsSource = readSource('app/components/home/Projects.vue');
	const listSource = readSource('app/components/project/List.vue');
	const experiencesSource = readSource(
		'app/components/content/Experiences.vue',
	);

	assert.doesNotMatch(projectsSource, /whitespace-nowrap/);
	assert.doesNotMatch(listSource, /whitespace-nowrap/);
	assert.match(projectsSource, /min-w-0/);
	assert.match(listSource, /min-w-0/);
	assert.match(experiencesSource, /flex-col gap-2 sm:flex-row/);
});

test('uses mobile-safe page gutters across content routes', () => {
	for (const file of [
		'app/components/content/About.vue',
		'app/components/content/Works.vue',
		'app/components/content/Writing.vue',
		'app/components/content/Contact.vue',
	]) {
		assert.match(readSource(file), /px-4[\s\S]*sm:px-7/);
	}
});

test('keeps desktop CTA labels on one line', () => {
	const ctaSource = readSource('app/components/home/CTA.vue');

	assert.match(ctaSource, /max-w-md[\s\S]*sm:max-w-none/);
});

test('keeps the error page readable on narrow screens', () => {
	const errorSource = readSource('app/error.vue');

	assert.match(errorSource, /w-full max-w-2xl/);
	assert.match(errorSource, /break-words/);
	assert.match(errorSource, /flex-wrap/);
});
