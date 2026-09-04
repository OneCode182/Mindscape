import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const badgePath =
	'public/media/badges/aws-academy-data-engineering-trained.png';
const ctaSource = readFileSync(
	resolve(repositoryRoot, 'app/components/home/CTA.vue'),
	'utf8',
);
const profilePictureSource = readFileSync(
	resolve(repositoryRoot, 'app/components/home/ProfilePicture.vue'),
	'utf8',
);

test('home profile presentation centers a larger AWS badge below the photo', () => {
	assert.equal(existsSync(resolve(repositoryRoot, badgePath)), true);
	assert.match(
		profilePictureSource,
		/import \{ MotionConfig, motion \} from ['"]motion-v['"];/,
	);
	assert.match(
		profilePictureSource,
		/src="\/media\/badges\/aws-academy-data-engineering-trained\.png"/,
	);
	assert.match(
		profilePictureSource,
		/alt="AWS Academy Data Engineering Trained badge"/,
	);
	assert.match(profilePictureSource, /size-28/);
	assert.match(profilePictureSource, /lg:-translate-y-6/);
	assert.match(profilePictureSource, /<MotionConfig reduced-motion="user">/);
	assert.match(
		profilePictureSource,
		/<motion\.div[\s\S]*while-hover="hover"[\s\S]*scale: 1\.025/,
	);
	assert.match(
		profilePictureSource,
		/<motion\.div[\s\S]*while-hover="hover"[\s\S]*scale: 1\.08, rotate: -4/,
	);
	assert.match(profilePictureSource, /bg-cyan-300\/25 blur-3xl/);
	assert.match(profilePictureSource, /class="relative size-28 object-contain"/);
	assert.doesNotMatch(ctaSource, /aws-academy-data-engineering-trained\.png/);
});
