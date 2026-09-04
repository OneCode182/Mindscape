<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	title: {
		type: String,
		default: '',
	},
	experiences: {
		type: Object as PropType<
			{
				title?: string;
				role?: string;
				current?: boolean;
				date: string;
				company: string;
				location?: string;
				workMode?: string;
				highlights?: string[];
			}[]
		>,
		required: true,
	},
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 class="mb-4 text-white-shadow font-newsreader italic text-2xl">
      <ScrambleText :label="title || $t('global.experiences')" />
    </h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="experience in experiences"
        :key="`${experience.company}-${experience.date}`"
      >
        <UPopover
          v-if="experience.highlights?.length"
          mode="hover"
          :open-delay="150"
          :close-delay="100"
          :enable-touch="true"
          :content="{
            side: 'right',
            sideOffset: 12,
            collisionPadding: 16,
          }"
          arrow
        >
          <button
            type="button"
            class="group relative w-full cursor-help rounded-lg border border-white/10 bg-white/[0.03] p-4 pb-10 text-left transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            :aria-label="`${experience.company} — ${experience.role ?? experience.title} — ${$t('global.view_details')}`"
          >
            <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0">
                <h4 class="break-words font-semibold">
                  {{ experience.company }}
                </h4>
                <p class="mt-1 text-sm text-muted">
                  {{ experience.role ?? experience.title }}
                </p>
              </div>
              <div class="flex w-full shrink-0 flex-col items-start text-left text-sm text-muted sm:w-auto sm:items-end sm:text-right">
                <p>
                  {{ experience.date }}
                </p>
                <p
                  v-if="experience.location"
                  class="mt-1"
                >
                  {{ experience.location }}
                </p>
                <span
                  v-if="experience.workMode"
                  class="mt-2 inline-flex rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-400/30"
                >
                  {{ experience.workMode }}
                </span>
              </div>
            </div>
            <span class="mt-3 flex items-center gap-1 text-xs text-muted transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary">
              <UIcon
                name="heroicons:information-circle"
                class="size-3.5"
                aria-hidden="true"
              />
              {{ $t("global.view_details") }}
            </span>
            <span
              v-if="experience.current"
              class="pointer-events-none absolute bottom-3 right-3 rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-400/30"
            >
              {{ $t("global.current") }}
            </span>
          </button>
          <template #content>
            <div class="w-[min(90vw,32rem)] p-4">
              <p class="font-semibold text-highlighted">
                {{ experience.company }}
              </p>
              <p class="mb-3 mt-1 text-sm text-muted">
                {{ experience.role ?? experience.title }}
              </p>
              <ul class="list-disc space-y-2 pl-5 text-sm leading-6 text-primary">
                <li
                  v-for="highlight in experience.highlights"
                  :key="highlight"
                >
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </template>
        </UPopover>
        <div
          v-else
          class="relative rounded-lg border border-white/10 bg-white/[0.03] p-4"
        >
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0">
              <h4 class="break-words font-semibold">
                {{ experience.company }}
              </h4>
              <p class="mt-1 text-sm text-muted">
                {{ experience.role ?? experience.title }}
              </p>
            </div>
            <div class="flex w-full shrink-0 flex-col items-start text-left text-sm text-muted sm:w-auto sm:items-end sm:text-right">
              <p>
                {{ experience.date }}
              </p>
              <p
                v-if="experience.location"
                class="mt-1"
              >
                {{ experience.location }}
              </p>
              <span
                v-if="experience.workMode"
                class="mt-2 inline-flex rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-400/30"
              >
                {{ experience.workMode }}
              </span>
            </div>
          </div>
          <span
            v-if="experience.current"
            class="pointer-events-none absolute bottom-3 right-3 rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-400/30"
          >
            {{ $t("global.current") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
