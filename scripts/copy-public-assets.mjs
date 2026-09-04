import { cp } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

await cp(
	resolve(projectRoot, 'public'),
	resolve(projectRoot, '.output/public'),
	{
		recursive: true,
		force: false,
	},
);
