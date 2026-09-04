<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <NuxtLink
      v-for="project in projects.filter(() => project.featured)"
      :key="project.name"
      class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-4 py-2 hover:bg-secondary sm:flex-nowrap"
      :to="project.release === 'soon' ? localePath('/') : project.link"
      :aria-label="project.name + ' project link'"
      :target="project.release === 'soon' ? '_self' : '_blank'"
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
        @click="useRouter().push('/works')"
      >
        {{ $t("global.see_more") }}
      </button>
    </div>
  </div>
</template>
