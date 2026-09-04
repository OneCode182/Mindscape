import type { Project } from '~/types/project';

export function prioritizeDeliverAI<T extends Pick<Project, 'slug'>>(
	projects: T[],
) {
	return [...projects].sort(
		(left, right) =>
			Number(right.slug === 'deliverai') - Number(left.slug === 'deliverai'),
	);
}

export function getProjectPreview(
	project: Pick<Project, 'summary' | 'type' | 'release'>,
) {
	return project.summary ?? project.type ?? project.release;
}
