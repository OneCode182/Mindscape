<script setup lang="ts">
const { t } = useI18n();
const requestUrl = useRequestURL();
const isLocalEnvironment = computed(() =>
	['localhost', '127.0.0.1', '::1'].includes(requestUrl.hostname),
);
const touchNavigation = useTouchHoverNavigation();

const deployUrl =
	'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOneCode182%2FMindscape%2Ftree%2Fmain&project-name=mindscape-portfolio';
</script>

<template>
  <div class="flex w-full max-w-md flex-col items-center justify-center gap-4 sm:max-w-none sm:gap-2">
    <div class="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
      <UTooltip
        :text="$t('global.email')"
        :shortcuts="['⌘', 'O']"
      >
        <SpotlightButton>
          <NuxtLinkLocale
            class="font-mona relative flex max-w-full items-center justify-center gap-2 text-center bg-gradient-to-b from-white/25 to-white bg-clip-text text-lg font-medium text-transparent transition-all duration-200"
            to="/contact"
            @click="touchNavigation.handleClick"
            @pointerdown="touchNavigation.handlePointerDown"
          >
            {{ t("global.contact") }}
            <UIcon
              name="heroicons:envelope"
              class="size-5 text-white/80"
            />
          </NuxtLinkLocale>
        </SpotlightButton>
      </UTooltip>
      <MeetingButton />
    </div>
    <div
      v-if="isLocalEnvironment"
      class="mt-4 flex flex-col items-center gap-1"
    >
      <NuxtLink
        :to="deployUrl"
        target="_blank"
        rel="noopener noreferrer"
        @click="touchNavigation.handleClick"
        @pointerdown="touchNavigation.handlePointerDown"
      >
        <img
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
        >
      </NuxtLink>
    </div>
  </div>
</template>
