<script setup lang="ts">
import type { Project } from '~/types/project';
import { prioritizeDeliverAI } from '~/utils/projects';

const { projects } = defineProps<{
	projects: Project[];
}>();
const localePath = useLocalePath();
const router = useRouter();
const { activeKey, handleClick, handlePointerDown } = useTouchHoverNavigation();

const orderedProjects = computed(() =>
	prioritizeDeliverAI(projects.filter((project) => project.featured)),
);
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <NuxtLink
      v-for="project in orderedProjects"
      :key="project.slug"
      class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-4 py-2 hover:bg-secondary sm:flex-nowrap"
      :class="{ 'touch-hover-active': activeKey === project.name }"
      :to="localePath(`/project/${project.slug}`)"
      :aria-label="$t('projects.open_details', { name: project.name })"
      @click="handleClick($event, project.name)"
      @pointerdown="handlePointerDown($event, project.name)"
    >
      <span class="min-w-0 break-words">
        {{ project.name }}
      </span>
      <div class="hidden min-w-4 flex-1 bg-muted sm:block" />
      <span class="shrink-0 text-muted">
        {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
      </span>
    </NuxtLink>
    <div class="mt-4 flex justify-center">
      <button
        class="btn-primary"
        @click="router.push(localePath('/projects'))"
      >
        {{ $t("global.see_more") }}
      </button>
    </div>
  </div>
</template>
