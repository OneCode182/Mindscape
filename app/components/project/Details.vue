<script setup lang="ts">
import type { Project } from '~/types/project';

defineProps<{
	project: Project;
}>();
</script>

<template>
  <div class="w-[min(90vw,24rem)] space-y-3 p-4">
    <div>
      <p class="font-semibold text-highlighted">
        {{ project.name }}
      </p>
      <p
        v-if="project.organization || project.type"
        class="mt-1 text-xs text-muted"
      >
        <span v-if="project.organization">{{ project.organization }}</span>
        <span v-if="project.organization && project.type"> · </span>
        <span v-if="project.type">{{ project.type }}</span>
      </p>
    </div>

    <p
      v-if="project.summary"
      class="text-sm leading-6 text-primary"
    >
      {{ project.summary }}
    </p>

    <ul
      v-if="project.details?.length"
      class="list-disc space-y-2 pl-5 text-sm leading-6 text-primary"
    >
      <li
        v-for="detail in project.details"
        :key="detail"
      >
        {{ detail }}
      </li>
    </ul>

    <div
      v-if="project.technologies?.length"
      class="flex flex-wrap gap-1.5 pt-1"
    >
      <span
        v-for="technology in project.technologies"
        :key="technology"
        class="rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-200 ring-1 ring-inset ring-blue-400/25"
      >
        {{ technology }}
      </span>
    </div>
  </div>
</template>
