<script setup lang="ts">
import type { Collections } from '@nuxt/content';
import { joinURL, withLeadingSlash } from 'ufo';

const route = useRoute();
const { locale, localeProperties, t } = useI18n();
void localeProperties;

const slug = computed(() =>
	Array.isArray(route.params.slug)
		? (route.params.slug as string[])
		: [route.params.slug as string],
);
const path = computed(() =>
	withLeadingSlash(joinURL(locale.value, ...slug.value)),
);
const collection = computed(
	() => `content_${locale.value}` as keyof Collections,
);

const { data: page } = await useAsyncData(
	path.value,
	async () =>
		(await queryCollection(collection.value).path(path.value).first()) as
			| Collections['content_en']
			| Collections['content_es'],
);

if (!page.value)
	throw createError({ statusCode: 404, statusMessage: 'Page not found' });

const { profile } = useAppConfig();

const { copy } = useClipboard();

defineShortcuts({
	meta_o: {
		usingInput: true,
		handler: () => {
			if (!profile.email) return;
			copy(profile.email);
			toast.success(t('global.email_copied'));
		},
	},
});
</script>

<template>
  <div v-if="page">
    <FolioMeta
      :page
      :is-writing="route.path.includes('/articles/')"
    />
    <ContentRenderer
      :dir="localeProperties?.dir ?? 'ltr'"
      :value="page"
    />
  </div>
</template>
