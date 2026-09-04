<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: Motion components are referenced in the Vue template.
import { AnimatePresence, MotionConfig, motion } from 'motion-v';
import type { Project } from '~/types/project';

const { project } = defineProps<{
	project: Project;
}>();

const img = useImage();
const localePath = useLocalePath();
const { activeKey, handleClick, handlePointerDown } = useTouchHoverNavigation();
const hovered = ref(false);
const focused = ref(false);

const springTransition = {
	type: 'spring',
	stiffness: 340,
	damping: 23,
	mass: 0.9,
} as const;

const cardVariants = {
	rest: { scale: 1, y: 0 },
	hover: { scale: 1.025, y: -6 },
	tap: { scale: 0.99 },
};

const isExpanded = computed(
	() => hovered.value || focused.value || activeKey.value === project.name,
);
</script>

<template>
  <MotionConfig reduced-motion="user">
    <motion.div
      layout
      class="group/card min-w-0 will-change-transform"
      :initial="'rest'"
      :animate="isExpanded ? 'hover' : 'rest'"
      while-hover="hover"
      while-tap="tap"
      :variants="cardVariants"
      :transition="springTransition"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @focusin="focused = true"
      @focusout="focused = false"
    >
      <NuxtLink
        :aria-label="$t('projects.open_details', { name: project.name })"
        :to="localePath(`/project/${project.slug}`)"
        class="group relative flex cursor-pointer flex-col gap-1 rounded-lg border border-white/10 bg-zinc-900/80 p-1 shadow-2xl shadow-zinc-950/50 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-300/50 hover:shadow-[0_0_32px_rgba(103,232,249,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
        :class="{ 'touch-hover-active': activeKey === project.name }"
        @click="handleClick($event, project.name)"
        @pointerdown="handlePointerDown($event, project.name)"
      >
        <div class="flex gap-1 px-1 py-[2px]">
          <div class="size-2 rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-red-500/90 group-[.touch-hover-active]:bg-red-500/90" />
          <div class="size-2 rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-yellow-500/90 group-[.touch-hover-active]:bg-yellow-500/90" />
          <div class="size-2 rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-green-500/90 group-[.touch-hover-active]:bg-green-500/90" />
        </div>
        <motion.div
          class="flex h-56 justify-center overflow-hidden rounded-lg"
          :animate="{ scale: isExpanded ? 1.02 : 1 }"
          :transition="springTransition"
        >
          <NuxtImg
            v-if="project.image"
            :placeholder="img(`${project.image}`)"
            width="1536"
            :alt="project.name + ' project image'"
            class="h-full rounded-lg"
            :class="project.imageFit === 'contain' ? 'object-contain' : 'object-cover'"
            :src="project.image"
            :aria-label="project.name + ' project image'"
          />
          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_48%),linear-gradient(135deg,#111827,#030712)] px-6 text-center"
            aria-hidden="true"
          >
            <span class="text-xs font-medium uppercase tracking-[0.24em] text-blue-200/70">
              {{ project.type || "Project" }}
            </span>
            <span class="max-w-xs text-2xl font-semibold text-white/90">
              {{ project.name }}
            </span>
          </div>
        </motion.div>
        <motion.div
          layout
          class="relative rounded-md border border-transparent px-3 py-3 transition-colors duration-300 group-hover:border-cyan-300/25 group-hover:bg-cyan-300/[0.04] group-[.touch-hover-active]:border-cyan-300/25 group-[.touch-hover-active]:bg-cyan-300/[0.04]"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <span class="block break-words text-sm font-semibold text-white/90 transition-colors duration-300 group-hover:text-cyan-100 group-[.touch-hover-active]:text-cyan-100 [text-shadow:0_0_0_rgba(103,232,249,0)] group-hover:[text-shadow:0_0_12px_rgba(103,232,249,0.55)] group-[.touch-hover-active]:[text-shadow:0_0_12px_rgba(103,232,249,0.55)]">
                {{ project.name }}
              </span>
              <span class="mt-1 block text-xs text-neutral-500 transition-colors duration-300 group-hover:text-cyan-200/80 group-[.touch-hover-active]:text-cyan-200/80">
                {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
              </span>
            </div>
            <UIcon
              name="heroicons:arrow-right"
              class="mt-1 size-4 shrink-0 text-white/60 transition-all duration-300 group-hover:-rotate-45 group-hover:text-cyan-200 group-[.touch-hover-active]:-rotate-45 group-[.touch-hover-active]:text-cyan-200"
            />
          </div>
          <AnimatePresence :initial="false">
            <motion.div
              v-if="isExpanded"
              layout
              :initial="{ opacity: 0, y: 10, scaleY: 0.9 }"
              :animate="{ opacity: 1, y: 0, scaleY: 1 }"
              :exit="{ opacity: 0, y: 10, scaleY: 0.9 }"
              :transition="springTransition"
              class="origin-top pt-3"
            >
              <ProjectPreview :project />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </NuxtLink>
    </motion.div>
  </MotionConfig>
</template>
