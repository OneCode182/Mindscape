import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const readSource = (relativePath) =>
	readFileSync(resolve(repositoryRoot, relativePath), 'utf8');

const readProjects = (locale) =>
	readdirSync(resolve(repositoryRoot, `content/${locale}/projects`))
		.filter((file) => file.endsWith('.json'))
		.map((file) =>
			JSON.parse(
				readFileSync(
					resolve(repositoryRoot, `content/${locale}/projects/${file}`),
					'utf8',
				),
			),
		);

test('defines stable bilingual project slugs with DeliverAI priority', () => {
	const englishSlugs = readProjects('en').map((project) => project.slug);
	const spanishSlugs = readProjects('es').map((project) => project.slug);

	assert.deepEqual([...englishSlugs].sort(), [...spanishSlugs].sort());
	assert.equal(new Set(englishSlugs).size, englishSlugs.length);
	assert.equal(englishSlugs.includes('deliverai'), true);
	assert.match(readSource('app/utils/projects.ts'), /deliverai/);
	assert.match(
		readSource('app/components/content/Works.vue'),
		/prioritizeDeliverAI/,
	);
	assert.match(
		readSource('app/components/home/Projects.vue'),
		/prioritizeDeliverAI/,
	);
});

test('uses canonical localized project routes and preserves works redirect', () => {
	const projectPage = 'app/pages/project/[slug].vue';
	const redirectPage = 'app/pages/works.vue';

	assert.equal(existsSync(resolve(repositoryRoot, projectPage)), true);
	assert.equal(existsSync(resolve(repositoryRoot, redirectPage)), true);
	assert.equal(
		existsSync(resolve(repositoryRoot, 'content/en/2.projects.md')),
		true,
	);
	assert.equal(
		existsSync(resolve(repositoryRoot, 'content/es/2.projects.md')),
		true,
	);
	assert.equal(
		existsSync(resolve(repositoryRoot, 'content/en/2.works.md')),
		false,
	);
	assert.equal(
		existsSync(resolve(repositoryRoot, 'content/es/2.works.md')),
		false,
	);
	assert.match(readSource(projectPage), /queryCollection\(collection\)/);
	assert.match(readSource(projectPage), /item\.slug === slug\.value/);
	assert.match(readSource(projectPage), /statusCode: 404/);
	assert.match(readSource(redirectPage), /localePath\('\/projects'\)/);
	assert.match(readSource(redirectPage), /redirectCode: 301/);
});

test('animates project previews through motion-v with touch and reduced-motion support', () => {
	const card = readSource('app/components/project/Card.vue');
	const homeProjects = readSource('app/components/home/Projects.vue');

	for (const source of [card, homeProjects]) {
		assert.match(source, /from 'motion-v'/);
		assert.match(source, /MotionConfig reduced-motion="user"/);
		assert.match(source, /AnimatePresence/);
		assert.match(source, /layout/);
		assert.match(source, /while-hover="hover"/);
		assert.match(source, /while-tap="tap"/);
		assert.match(source, /touch-hover-active/);
	}

	assert.match(card, /localePath\(`\/project\/\$\{project\.slug\}`\)/);
	assert.match(homeProjects, /localePath\(`\/project\/\$\{project\.slug\}`\)/);
});
