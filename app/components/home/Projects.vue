<script setup lang="ts">
import type { Collections } from '@nuxt/content';

const { locale } = useI18n();
const localePath = useLocalePath();

const { data: projects } = await useAsyncData(
	`projects-${locale.value}`,
	async () => {
		const collection = `projects_${locale.value}` as keyof Collections;
		return (await queryCollection(collection).all()) as
			| Collections['projects_en'][]
			| Collections['projects_es'][];
	},
	{
		watch: [locale],
	},
);
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <h3 class="font-newsreader italic text-white-shadow text-xl">
      <ScrambleText :label="$t('navigation.works')" />
    </h3>
    <div class="flex w-full flex-col gap-4">
      <template
        v-for="project in projects?.filter((work) => work.featured)"
        :key="project.name"
      >
        <UPopover
          mode="hover"
          :open-delay="150"
          :close-delay="100"
          :enable-touch="true"
          :content="{
            side: 'right',
            sideOffset: 12,
            collisionPadding: 16,
          }"
          :arrow="Boolean(project.details?.length)"
        >
          <NuxtLink
            role="link"
            class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-900"
            :to="project.release === 'soon' ? localePath('/') : project.link"
            :aria-label="'go to ' + project.name + ' project website'"
            :target="project.release === 'soon' ? '_self' : '_blank'"
          >
            <span class="whitespace-nowrap font-medium">
              {{ project.name }}
            </span>
            <div class="mx-2 h-[0.1px] w-full bg-muted" />
            <span class="whitespace-nowrap">
              {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
            </span>
          </NuxtLink>
          <template #content>
            <ProjectDetails
              v-if="project.details?.length"
              :project
            />
          </template>
        </UPopover>
      </template>
    </div>
    <NuxtLinkLocale to="/works">
      <span class="font-newsreader italic text-white-shadow cursor-pointer">
        <ScrambleText :label="$t('global.see_more')" />
      </span>
    </NuxtLinkLocale>
  </div>
</template>
