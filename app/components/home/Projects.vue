<script setup lang="ts">
import type { Collections } from '@nuxt/content';
// biome-ignore lint/correctness/noUnusedImports: Motion components are referenced in the Vue template.
import { AnimatePresence, MotionConfig, motion } from 'motion-v';
import { prioritizeDeliverAI } from '~/utils/projects';

const { locale } = useI18n();
const localePath = useLocalePath();
const { activeKey, handleClick, handlePointerDown } = useTouchHoverNavigation();
const hoveredProject = ref<string | null>(null);
const focusedProject = ref<string | null>(null);

const springTransition = {
	type: 'spring',
	stiffness: 360,
	damping: 24,
	mass: 0.9,
} as const;

const cardVariants = {
	rest: { scale: 1, y: 0 },
	hover: { scale: 1.01, y: -2 },
	tap: { scale: 0.995 },
};

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

const featuredProjects = computed(() =>
	prioritizeDeliverAI(
		(projects.value ?? []).filter((project) => project.featured),
	),
);

function isExpanded(projectName: string) {
	return (
		activeKey.value === projectName ||
		hoveredProject.value === projectName ||
		focusedProject.value === projectName
	);
}
</script>

<template>
  <MotionConfig reduced-motion="user">
    <div class="flex w-full flex-col gap-6">
      <h3 class="font-newsreader italic text-white-shadow text-xl">
        <ScrambleText :label="$t('navigation.works')" />
      </h3>
      <div class="flex w-full flex-col gap-3">
        <motion.div
          v-for="project in featuredProjects"
          :key="project.slug"
          layout
          class="will-change-transform"
          :initial="'rest'"
          :animate="isExpanded(project.name) ? 'hover' : 'rest'"
          while-hover="hover"
          while-tap="tap"
          :variants="cardVariants"
          :transition="springTransition"
          @mouseenter="hoveredProject = project.name"
          @mouseleave="hoveredProject = null"
          @focusin="focusedProject = project.name"
          @focusout="focusedProject = null"
        >
          <NuxtLink
            role="link"
            class="group flex min-w-0 flex-col gap-2 rounded-lg border border-transparent px-4 py-2 transition-colors duration-200 hover:border-cyan-300/25 hover:bg-cyan-300/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            :class="{ 'touch-hover-active': activeKey === project.name }"
            :to="localePath(`/project/${project.slug}`)"
            :aria-label="$t('projects.open_details', { name: project.name })"
            @click="handleClick($event, project.name)"
            @pointerdown="handlePointerDown($event, project.name)"
          >
            <div class="flex min-w-0 items-center gap-x-2 gap-y-1">
              <span class="min-w-0 break-words font-medium text-white/90 transition-colors duration-200 group-hover:text-cyan-100 group-[.touch-hover-active]:text-cyan-100">
                {{ project.name }}
              </span>
              <div class="hidden min-w-4 flex-1 bg-muted/70 sm:block" />
              <span class="shrink-0 text-xs text-muted transition-colors duration-200 group-hover:text-cyan-200/80 group-[.touch-hover-active]:text-cyan-200/80">
                {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
              </span>
              <UIcon
                name="heroicons:arrow-right"
                class="size-4 shrink-0 text-muted transition-all duration-300 group-hover:-rotate-45 group-hover:text-cyan-200 group-[.touch-hover-active]:-rotate-45 group-[.touch-hover-active]:text-cyan-200"
              />
            </div>
            <AnimatePresence :initial="false">
              <motion.div
                v-if="isExpanded(project.name)"
                layout
                :initial="{ opacity: 0, y: -6, scaleY: 0.92 }"
                :animate="{ opacity: 1, y: 0, scaleY: 1 }"
                :exit="{ opacity: 0, y: -6, scaleY: 0.92 }"
                :transition="springTransition"
                class="origin-top"
              >
                <ProjectPreview :project />
              </motion.div>
            </AnimatePresence>
          </NuxtLink>
        </motion.div>
      </div>
      <NuxtLinkLocale
        to="/projects"
        class="group w-fit"
        @click="handleClick"
        @pointerdown="handlePointerDown"
      >
        <span class="font-newsreader italic text-white-shadow cursor-pointer transition-colors group-hover:text-cyan-200">
          <ScrambleText :label="$t('global.see_more')" />
        </span>
      </NuxtLinkLocale>
    </div>
  </MotionConfig>
</template>
