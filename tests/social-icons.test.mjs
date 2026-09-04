import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appConfigPath = resolve(repositoryRoot, 'app/app.config.ts');
const socialComponentPath = resolve(
	repositoryRoot,
	'app/components/home/Social.vue',
);
const socialLinkComponentPath = resolve(
	repositoryRoot,
	'app/components/home/SocialLink.vue',
);

test('configures all profile social links with the Instagram URL', () => {
	const appConfigSource = readFileSync(appConfigPath, 'utf8');

	assert.match(
		appConfigSource,
		/instagram: 'https:\/\/www\.instagram\.com\/sergiosilva182'/,
	);
});

test('maps each social link to reusable hover metadata', () => {
	const socialSource = readFileSync(socialComponentPath, 'utf8');

	assert.match(socialSource, /<MotionConfig reduced-motion="user">/);
	assert.match(socialSource, /<HomeSocialLink[\s\S]*:name="social\.name"/);
	assert.match(socialSource, /:hover-icon="social\.hoverIcon"/);
	assert.match(socialSource, /:hover-color="social\.hoverColor"/);
	assert.match(socialSource, /custom:instagram/);
	assert.match(socialSource, /custom:instagram-hover/);
	assert.match(socialSource, /#2EC866/);
	assert.match(socialSource, /#0966C3/);
	assert.match(
		socialSource,
		/name: 'GitHub',[\s\S]*hoverColor: '#000000',[\s\S]*glowColor: '#FFFFFF'/,
	);
	assert.match(socialSource, /:glow-color="social\.glowColor"/);
});

test('provides the common animated link behavior and tooltip', () => {
	assert.equal(existsSync(socialLinkComponentPath), true);
	const socialLinkSource = readFileSync(socialLinkComponentPath, 'utf8');

	assert.match(socialLinkSource, /from 'motion-v'/);
	assert.match(socialLinkSource, /while-hover="hover"/);
	assert.match(socialLinkSource, /scale: 1\.14/);
	assert.match(socialLinkSource, /rotate: -4/);
	assert.match(socialLinkSource, /role="tooltip"/);
	assert.match(socialLinkSource, /size-8/);
	assert.match(socialLinkSource, /--social-hover-color/);
});

test('ships both Instagram SVG states in the custom icon collection', () => {
	const normalIconPath = resolve(
		repositoryRoot,
		'app/assets/icons/instagram.svg',
	);
	const hoverIconPath = resolve(
		repositoryRoot,
		'app/assets/icons/instagram-hover.svg',
	);

	assert.equal(existsSync(normalIconPath), true);
	assert.equal(existsSync(hoverIconPath), true);
	const normalIconSource = readFileSync(normalIconPath, 'utf8');
	assert.match(normalIconSource, /fill="currentColor"/);
	assert.match(normalIconSource, /width="2500px" height="2500px"/);
	assert.match(normalIconSource, /viewBox="0 0 2500 2500"/);
	assert.match(
		normalIconSource,
		/transform="translate\(-416\.6666667 -416\.6666667\) scale\(104\.1666667\)"/,
	);
	assert.match(readFileSync(hoverIconPath, 'utf8'), /fill="url\(#0\)"/);
});

test('keeps the badge enlarged on hover', () => {
	const profilePictureSource = readFileSync(
		resolve(repositoryRoot, 'app/components/home/ProfilePicture.vue'),
		'utf8',
	);

	assert.match(
		profilePictureSource,
		/<motion\.div[\s\S]*while-hover="hover"[\s\S]*scale: 1\.08, rotate: -4/,
	);
	assert.doesNotMatch(profilePictureSource, /scale: 0\.92, rotate: -4/);
});
