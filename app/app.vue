<script setup lang="ts">
const { locale } = useI18n();

const uiLocales = {
	es: {
		name: 'Español',
		code: 'es',
		dir: 'ltr',
		messages: {},
	},
	en: {
		name: 'English',
		code: 'en',
		dir: 'ltr',
		messages: {},
	},
} as const;

const appLocale = computed(() => {
	const current = typeof locale.value === 'string' ? locale.value.split('-')[0] : 'es';
	return uiLocales[current as keyof typeof uiLocales] || uiLocales.es;
});
</script>

<template>
  <Html
    :lang="appLocale.code"
    class="font-geist text-[var(--ui-text)] transition-colors duration-300 selection:bg-white/60 selection:text-zinc-800"
  >
    <Body>
      <LayoutScrollToTop />
      <NuxtLayout>
        <UApp :locale="appLocale">
          <NuxtPage />
        </UApp>
      </NuxtLayout>
      <Toaster close-button />
      <DotPattern class="absolute inset-0 -z-10 size-full fill-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
    </Body>
  </Html>
</template>
