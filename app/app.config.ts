export default defineAppConfig({
	global: {
		meetingLink: 'https://cal.com/sergio-silva/15min',
		available: true,
	},
	profile: {
		name: 'Sergio Andrey Silva Rodríguez',
		job: 'Systems Engineer and Software Developer',
		email: 'contact@hrcd.fr',
		phone: '(+33) 6 21 56 22 18',
		picture: '/profile/selfie.jpg',
	},
	socials: {
		github: 'https://github.com/OneCode182',
		linkedin: 'https://linkedin.com/in/SergioSilvaR1',
		hackerrank: 'https://www.hackerrank.com/profile/onecode0182',
		instagram: 'https://www.instagram.com/sergiosilva182',
	},
	seo: {
		title: 'Canvas a Nuxt portfolio template',
		description:
			'Canvas is a simple but beautiful portfolio template for designers and developers built with Nuxt and Tailwind CSS. Made with ❤️ by HugoRCD',
		url: 'https://canvas.hrcd.fr',
	},
	ui: {
		colors: {
			primary: 'emerald',
			neutral: 'neutral',
		},
		notifications: {
			position: 'top-0 bottom-auto',
		},
		notification: {
			progress: {
				base: 'absolute bottom-0 end-0 start-0 h-0',
				background: 'bg-transparent dark:bg-transparent',
			},
		},
		button: {
			slots: {
				base: 'cursor-pointer',
			},
			defaultVariants: {
				color: 'neutral',
			},
		},
		input: {
			defaultVariants: {
				color: 'neutral',
			},
		},
		textarea: {
			defaultVariants: {
				color: 'neutral',
			},
		},
		icons: {
			loading: 'heroicons:arrow-path',
		},
	},
	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png',
		},
		{
			rel: 'manifest',
			href: '/site.webmanifest',
		},
	],
});
