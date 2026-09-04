<script setup lang="ts">
import type { Project } from '~/types/project';
import { getProjectPreview } from '~/utils/projects';

const { project } = defineProps<{
	project: Project;
}>();

const preview = computed(() => getProjectPreview(project));
</script>

<template>
  <div class="rounded-md border border-cyan-300/20 bg-cyan-300/[0.04] p-3 shadow-[0_0_24px_rgba(103,232,249,0.08)]">
    <p class="text-xs leading-5 text-cyan-100/90 [text-shadow:0_0_12px_rgba(103,232,249,0.5)]">
      {{ preview }}
    </p>
  </div>
</template>
