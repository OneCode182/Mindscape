<script lang="ts" setup>
defineProps({
	isText: {
		type: Boolean,
		default: false,
	},
});

const _navigation = getNavigation('home') as Record<string, Navigation>;

const route = useRoute();
const localePath = useLocalePath();
const navigation = _navigation;
const { activeKey, handleClick, handlePointerDown } = useTouchHoverNavigation();
</script>

<template>
  <div class="mx-auto my-2 flex w-full items-center justify-center px-2">
    <header class="w-full max-w-md rounded-full bg-[#010101]/95 backdrop-blur-xl sm:w-auto sm:max-w-none sm:bg-transparent sm:backdrop-blur-none">
      <SpotlightButton
        rounded
        transparent
        :animate="false"
        class="w-full border border-white/10 sm:w-auto"
      >
        <nav class="z-10 flex h-[50px] w-full justify-around gap-0 p-1 transition-all duration-300 ease-in-out sm:h-[45px] sm:w-auto sm:gap-2 sm:hover:gap-4">
          <NuxtLink
            v-for="item in navigation"
            :id="item.name.toLowerCase()"
            :key="item.name"
            :aria-label="item.name + ' navigation link'"
            :class="[
              localePath(item.to) === route.path
                ? 'border border-white/5 bg-zinc-900/10 text-white/75 shadow-2xl shadow-white/50 backdrop-blur-3xl text-shadow-sm'
                : 'text-muted',
              { 'touch-hover-active': activeKey === item.name },
            ]"
            :to="localePath(item.to)"
            class="flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-full border border-transparent px-1 py-1 transition-all duration-300 ease-in-out hover:border-white/5 hover:bg-zinc-900/50 hover:backdrop-blur-3xl sm:flex-none sm:px-6"
            @click="handleClick($event, item.name)"
            @pointerdown="handlePointerDown($event, item.name)"
          >
            <UIcon
              :name="item.icon"
              class="size-6 font-light sm:size-6"
            />
          </NuxtLink>
        </nav>
      </SpotlightButton>
    </header>
  </div>
</template>
