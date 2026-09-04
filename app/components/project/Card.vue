<script setup lang="ts">
import type { Project } from '~/types/project';

defineProps<{
	project: Project;
}>();
const img = useImage();
</script>

<template>
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
      :aria-label="project.name + ' project link'"
      :to="project.link"
      target="_blank"
      class="group relative flex cursor-pointer flex-col gap-1 rounded-lg border border-white/10 bg-zinc-900/80 p-1 shadow-2xl shadow-zinc-950/50 backdrop-blur-sm"
    >
      <div class="flex gap-1 px-1 py-[2px]">
        <div class="size-2 rounded-full bg-red-500/90 transition-all duration-300 group-hover:bg-red-500/90 sm:bg-white/10" />
        <div class="size-2 rounded-full bg-yellow-500/90 transition-all duration-300 group-hover:bg-yellow-500/90 sm:bg-white/10" />
        <div class="size-2 rounded-full bg-green-500/90 transition-all duration-300 group-hover:bg-green-500/90 sm:bg-white/10" />
      </div>
      <div class="flex h-56 justify-center overflow-hidden rounded-lg">
        <NuxtImg
          v-if="project.image"
          :placeholder="img(`${project.image}`)"
          width="1536"
          :alt="project.name + ' project image'"
          class="h-full rounded-lg object-cover transition-all duration-300 hover:scale-105"
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
      </div>
      <div class="absolute bottom-0 flex w-full justify-center">
        <div class="w-[calc(100%-1rem)] rounded-t-lg border-x border-t border-white/10 border-b-transparent px-4 py-[5px] shadow-md backdrop-blur-md sm:w-2/3">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2">
                <span class="min-w-0 break-words text-sm font-semibold text-white/90">
                  {{ project.name }}
                </span>
                <span class="shrink-0 text-xs text-neutral-500">
                  {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
                </span>
              </div>
            </div>
            <div
              class="flex items-center justify-center rounded-full border border-transparent p-1 shadow-md backdrop-blur-md transition-all duration-500 group-hover:-rotate-45 group-hover:border-white/10"
            >
              <UIcon
                name="heroicons:arrow-right"
                class="size-3 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
    <template #content>
      <ProjectDetails
        v-if="project.details?.length"
        :project
      />
    </template>
  </UPopover>
</template>
