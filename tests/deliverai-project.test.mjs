import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const readJson = (relativePath) =>
	JSON.parse(readFileSync(resolve(repositoryRoot, relativePath), 'utf8'));

const readSource = (relativePath) =>
	readFileSync(resolve(repositoryRoot, relativePath), 'utf8');

test('publishes the DeliverAI project in both locales with its paper diagram', () => {
	const englishProject = readJson('content/en/projects/deliverai.json');
	const spanishProject = readJson('content/es/projects/deliverai.json');

	for (const project of [englishProject, spanishProject]) {
		assert.equal(project.name.includes('DeliverAI'), true);
		assert.equal(project.image, '/projects/deliverai-architecture.png');
		assert.equal(project.imageFit, 'contain');
		assert.equal(project.link, 'https://github.com/tulio3101/DeliverAI');
		assert.equal(project.featured, true);
		assert.equal(project.organization, 'Escuela Colombiana de Ingeniería');
		assert.equal(project.details.length >= 3, true);
		assert.equal(project.technologies.includes('n8n'), true);
		assert.equal(project.technologies.includes('Spring Boot'), true);
	}

	assert.equal(
		existsSync(
			resolve(repositoryRoot, 'public/projects/deliverai-architecture.png'),
		),
		true,
	);
});

test('preserves cover crops by default and contains the DeliverAI diagram', () => {
	const projectSchema = readSource('content.config.ts');
	const projectCard = readSource('app/components/project/Card.vue');

	assert.match(
		projectSchema,
		/imageFit: z\.enum\(\['cover', 'contain'\]\)\.optional\(\)/,
	);
	assert.match(
		projectCard,
		/project\.imageFit === 'contain' \? 'object-contain' : 'object-cover'/,
	);
});

test('includes root public assets in static Nuxt output', () => {
	const nuxtConfig = readSource('nuxt.config.ts');

	assert.match(
		nuxtConfig,
		/nuxt\.options\.nitro\.publicAssets = \[\{ dir: publicDir \}, \.\.\.publicAssets\];/,
	);
});
