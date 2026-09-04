export default defineNuxtConfig({
	modules: [
		'@vueuse/nuxt',
		'@nuxt/ui',
		'@nuxtjs/i18n',
		'@nuxtjs/seo',
		'@nuxt/content',
		'nuxt-studio',
		'@nuxt/image',
		'@nuxt/scripts',
		'vue-sonner/nuxt',
	],

	imports: {
		presets: [
			{
				from: 'vue-sonner',
				imports: ['toast'],
			},
		],
	},

	devtools: {
		enabled: false,
	},

	css: ['~/assets/style/main.css'],

	site: {
		url: 'https://canvas.hrcd.fr',
		defaultLocale: 'es',
		indexable: true,
	},

	colorMode: {
		preference: 'dark',
		fallback: 'dark',
	},

	content: {
		preview: {
			api: 'https://api.nuxt.studio',
			dev: false,
		},
	},

	mdc: {
		highlight: {
			theme: {
				dark: 'github-dark',
				default: 'github-dark',
				light: 'github-light',
			},
		},
	},

	runtimeConfig: {
		public: {
			resend: !!process.env.NUXT_PRIVATE_RESEND_API_KEY,
		},
	},

	routeRules: {
		// Keep Studio preview dynamic in dev; emit the default locale root in production.
		'/': { prerender: process.env.NODE_ENV === 'production' },
	},

	experimental: {
		viewTransition: true,
	},

	compatibilityDate: '2025-01-05',

	nitro: {
		experimental: {
			websocket: true,
		},
		prerender: {
			autoSubfolderIndex: false,
			crawlLinks: true,
			routes: ['/', '/en'],
		},
	},

	hooks: {
		'nitro:config': (config) => {
			if (process.env.NUXT_PRIVATE_RESEND_API_KEY) {
				config.handlers?.push({
					method: 'post',
					route: '/api/emails/send',
					handler: '~~/server/emails/send.ts',
				});
			}
		},
	},

	i18n: {
		locales: [
			{ code: 'es', name: 'Español', language: 'es-ES' },
			{ code: 'en', name: 'English', language: 'en-US' },
		],
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'mindscape_i18n_redirected',
			fallbackLocale: 'es',
			redirectOn: 'root',
		},
		strategy: 'prefix_except_default',
		defaultLocale: 'es',
	},

	icon: {
		customCollections: [
			{
				prefix: 'custom',
				dir: './app/assets/icons',
			},
		],
		serverBundle: {
			collections: ['heroicons'],
		},
		clientBundle: {
			scan: true,
			includeCustomCollections: true,
			icons: [
				'heroicons:arrow-left',
				'heroicons:arrow-path',
				'heroicons:arrow-right',
				'heroicons:arrow-up',
				'heroicons:briefcase',
				'heroicons:building-library',
				'heroicons:calendar-days',
				'heroicons:envelope',
				'heroicons:home',
				'heroicons:phone',
				'heroicons:plus',
				'heroicons:user',
			],
		},
	},

	ogImage: {
		zeroRuntime: true,
	},

	studio: {
		dev: false,
		route: '/admin',

		repository: {
			provider: 'github',
			owner: 'HugoRCD',
			repo: 'canvas',
			branch: 'main',
		},
	},
});
