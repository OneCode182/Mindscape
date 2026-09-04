<script setup lang="ts">
import type { Collections } from '@nuxt/content';
import type { Project } from '~/types/project';

const route = useRoute();
const { locale, localeProperties, t } = useI18n();
const { activeKey, handleClick, handlePointerDown } = useTouchHoverNavigation();
const slug = computed(() => {
	const value = route.params.slug;
	return Array.isArray(value) ? value[0] : String(value ?? '');
});

const { data: project } = await useAsyncData(
	() => `project-${locale.value}-${slug.value}`,
	async () => {
		const collection = `projects_${locale.value}` as keyof Collections;
		const projects = (await queryCollection(collection).all()) as
			| Collections['projects_en'][]
			| Collections['projects_es'][];

		return projects.find((item) => item.slug === slug.value) as
			| Project
			| undefined;
	},
	{
		watch: [locale, slug],
	},
);

if (!project.value) {
	throw createError({
		statusCode: 404,
		statusMessage: t('projects.not_found'),
	});
}

const { copy } = useClipboard();

function copyProjectLink() {
	copy(`${window.location.origin}${route.fullPath}`);
	toast.success(t('projects.link_copied'));
}

defineShortcuts({
	meta_k: {
		usingInput: true,
		handler: copyProjectLink,
	},
});

defineOgImage({
	url: project.value.image ?? '/og.png',
});
</script>

<template>
  <div v-if="project">
    <FolioMeta
      :page="project"
      :is-writing="false"
    />
    <NuxtLinkLocale
      to="/projects"
      class="mx-auto my-8 flex min-w-0 cursor-pointer items-center gap-2 px-4 text-muted transition-colors duration-200 hover:text-primary sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
      :class="{ 'text-primary': activeKey === 'project-back' }"
      @click="handleClick($event, 'project-back')"
      @pointerdown="handlePointerDown($event, 'project-back')"
    >
      <UIcon
        name="heroicons:arrow-left"
        class="size-4"
      />
      <span class="text-sm font-extralight">
        {{ $t("projects.back") }}
      </span>
    </NuxtLinkLocale>
    <article
      class="writing mx-auto px-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
      :dir="localeProperties?.dir ?? 'ltr'"
    >
      <header>
        <p class="font-newsreader text-sm italic text-cyan-200/80">
          {{ project.type || $t("navigation.works") }}
        </p>
        <h1 class="mt-2 break-words text-2xl font-bold">
          {{ project.name }}
        </h1>
        <div class="info-section mt-1 flex flex-col gap-2 sm:flex-row sm:gap-4">
          <p v-if="project.organization">
            {{ project.organization }}
          </p>
          <p v-if="project.organization" class="hidden sm:block">
            |
          </p>
          <p>{{ project.date || project.release }}</p>
          <p class="hidden sm:block">
            |
          </p>
          <UTooltip
            :text="$t('projects.copy_link')"
            :shortcuts="['⌘', 'K']"
          >
            <button
              type="button"
              class="flex min-h-11 cursor-pointer select-none items-center gap-1 text-left transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
              @click="copyProjectLink"
            >
              {{ $t("projects.share") }}
            </button>
          </UTooltip>
        </div>
      </header>

      <div
        v-if="project.image"
        class="mt-8 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/60 shadow-2xl shadow-zinc-950/50"
      >
        <NuxtImg
          width="1536"
          :src="project.image"
          :alt="project.name + ' project image'"
          class="max-h-[34rem] w-full"
          :class="project.imageFit === 'contain' ? 'object-contain' : 'object-cover'"
        />
      </div>

      <div class="mt-10">
        <ProjectDetails :project />
      </div>
    </article>
  </div>
</template>

<style scoped>
.info-section {
	font-weight: 200;
	color: #7d8084;
	text-decoration: none;
	text-align: left;
}
</style>
