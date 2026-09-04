<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
});

const { activeKey, handleClick, handlePointerDown } = useTouchHoverNavigation();
</script>

<template>
  <NuxtLink
    :to="path"
    :aria-label="title"
    class="flex cursor-pointer flex-col gap-2"
    :class="{ 'touch-hover-active': activeKey === title }"
    @click="handleClick($event, title)"
    @pointerdown="handlePointerDown($event, title)"
  >
    <div
      class="overflow-hidden rounded-md border border-white/10 shadow-md shadow-zinc-950/50 transition-colors duration-200 hover:border-white/20"
      :class="{ 'border-white/20': activeKey === title }"
    >
      <NuxtImg
        width="1536"
        :alt="`${title} article image`"
        class="h-64 w-full object-cover transition-transform duration-200 hover:scale-105"
        :class="{ 'scale-105': activeKey === title }"
        :src="image"
        :aria-label="`${title} article image`"
      />
    </div>
    <div class="flex flex-col">
      <h3 class="text-lg font-semibold">
        {{ title }}
      </h3>
      <span class="text-xs text-muted">{{ date }}</span>
    </div>
  </NuxtLink>
</template>
