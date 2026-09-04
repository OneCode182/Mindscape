<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: Components are referenced in the Vue template.
import { motion } from 'motion-v';

interface Props {
	name: string;
	link: string;
	icon: string;
	hoverIcon?: string;
	hoverColor: string;
	glowColor: string;
}

const props = defineProps<Props>();
const { activeKey, handleClick, handlePointerDown } = useTouchHoverNavigation();

const tooltipId = `social-tooltip-${props.name.toLowerCase().replaceAll(' ', '-')}`;

const linkVariants = {
	rest: { scale: 1, rotate: 0 },
	hover: { scale: 1.14, rotate: -4 },
};

const glowVariants = {
	rest: { opacity: 0.08, scale: 0.86 },
	hover: { opacity: 0.75, scale: 1.2 },
};

const tooltipVariants = {
	rest: { opacity: 0, y: 4, scale: 0.94 },
	hover: { opacity: 1, y: 0, scale: 1 },
};

const springTransition = {
	type: 'spring',
	stiffness: 320,
	damping: 22,
	mass: 0.8,
} as const;
</script>

<template>
  <motion.div
    class="group relative flex items-center justify-center will-change-transform"
    initial="rest"
    while-hover="hover"
    :animate="activeKey === props.name ? 'hover' : 'rest'"
    :variants="linkVariants"
    :transition="springTransition"
    :style="{ '--social-hover-color': props.hoverColor }"
  >
    <motion.span
      class="pointer-events-none absolute -inset-3 rounded-full blur-xl"
    :style="{ backgroundColor: props.glowColor }"
      :variants="glowVariants"
      :transition="springTransition"
    />
    <NuxtLink
      :to="props.link"
      target="_blank"
      class="relative flex size-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
      :aria-label="`Go to ${props.name} profile`"
      :aria-describedby="tooltipId"
      @click="handleClick($event, props.name)"
      @pointerdown="handlePointerDown($event, props.name)"
    >
      <span
        class="relative block size-8"
        :aria-label="`${props.name} logo`"
      >
        <UIcon
          :name="props.icon"
          class="absolute inset-0 size-8 text-muted transition-[opacity,color,filter] duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
          :class="{ 'opacity-0': activeKey === props.name }"
          :alt="`${props.name} logo`"
          aria-hidden="true"
        />
        <UIcon
          :name="props.hoverIcon || props.icon"
          class="absolute inset-0 size-8 text-[var(--social-hover-color)] opacity-0 transition-[opacity,color,filter] duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          :class="{ 'opacity-100': activeKey === props.name }"
          :alt="`${props.name} logo hovered`"
          aria-hidden="true"
        />
      </span>
      <motion.span
        :id="tooltipId"
        role="tooltip"
        class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 whitespace-nowrap rounded-md border border-white/10 bg-neutral-950/95 px-2 py-1 text-xs text-white shadow-lg backdrop-blur"
        :variants="tooltipVariants"
        :transition="springTransition"
      >
        {{ props.name }}
      </motion.span>
    </NuxtLink>
  </motion.div>
</template>
