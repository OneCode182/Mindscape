import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import sonarjs from 'eslint-plugin-sonarjs';

export default createConfigForNuxt({
	features: {
		stylistic: false,
	},
})
	.append(sonarjs.configs.recommended)
	.override('nuxt/vue/rules', {
		rules: {
			'vue/multi-word-component-names': 'off',
		},
	});
