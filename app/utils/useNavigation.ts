type Where = 'home' | 'app';

export type Navigation = {
	name: string;
	to: string;
	icon: string;
};

export function getNavigation(where: Where): Record<string, Navigation> | [] {
	if (where === 'home') {
		return {
			home: {
				name: 'Home',
				to: '/',
				icon: 'heroicons:home',
			},
			works: {
				name: 'Works',
				to: '/works',
				icon: 'heroicons:briefcase',
			},
			writing: {
				name: 'Writing',
				to: '/writing',
				icon: 'heroicons:building-library',
			},
			about: {
				name: 'About',
				to: '/about',
				icon: 'heroicons:user',
			},
			contact: {
				name: 'Contact',
				to: '/contact',
				icon: 'heroicons:envelope',
			},
		};
	}

	return [];
}
