<script setup lang="ts">
import type { Collections } from '@nuxt/content';
import { prioritizeDeliverAI } from '~/utils/projects';

const { locale } = useI18n();

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

const orderedProjects = computed(() =>
	prioritizeDeliverAI(projects.value ?? []),
);
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col px-4 py-7 sm:mt-20 sm:px-7">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <ScrambleText>
        <slot
          name="title"
          mdc-unwrap="p"
        />
      </ScrambleText>
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in orderedProjects"
        :key="project.slug"
        :project
      />
    </div>
  </section>
</template>
