<script setup lang="ts">
import type { Project } from '~/types/project';

defineProps<{
	project: Project;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="space-y-9">
    <section
      v-if="project.summary"
      aria-labelledby="project-summary"
    >
      <h2
        id="project-summary"
        class="font-newsreader text-xl italic text-white-shadow"
      >
        {{ t("projects.summary") }}
      </h2>
      <p class="mt-3 text-base leading-8 text-primary/90">
        {{ project.summary }}
      </p>
    </section>

    <section
      v-if="project.details?.length"
      aria-labelledby="project-details"
    >
      <h2
        id="project-details"
        class="font-newsreader text-xl italic text-white-shadow"
      >
        {{ t("projects.highlights") }}
      </h2>
      <ul class="mt-3 list-disc space-y-3 pl-5 text-base leading-8 text-primary/90">
        <li
          v-for="detail in project.details"
          :key="detail"
        >
          {{ detail }}
        </li>
      </ul>
    </section>

    <section
      v-if="project.technologies?.length"
      aria-labelledby="project-technologies"
    >
      <h2
        id="project-technologies"
        class="font-newsreader text-xl italic text-white-shadow"
      >
        {{ t("projects.technologies") }}
      </h2>
      <div class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="technology in project.technologies"
          :key="technology"
          class="rounded-full bg-cyan-300/[0.08] px-3 py-1 text-xs font-medium text-cyan-100 ring-1 ring-inset ring-cyan-300/25"
        >
          {{ technology }}
        </span>
      </div>
    </section>

    <a
      :href="project.link"
      target="_blank"
      rel="noreferrer noopener"
      class="group inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm text-primary transition-colors hover:border-cyan-300/60 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
    >
      <span>{{ t("projects.visit") }}</span>
      <UIcon
        name="heroicons:arrow-up-right"
        class="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  </div>
</template>
