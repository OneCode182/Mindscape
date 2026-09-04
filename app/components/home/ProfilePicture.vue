<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: Components are referenced in the Vue template.
import { MotionConfig, motion } from 'motion-v';

const { profile } = useAppConfig();

const springTransition = {
	type: 'spring',
	stiffness: 320,
	damping: 22,
	mass: 0.8,
} as const;

const profileGlowVariants = {
	rest: { opacity: 0.1, scale: 0.96 },
	hover: { opacity: 0.24, scale: 1.04 },
};

const badgeGlowVariants = {
	rest: { opacity: 0.18, scale: 0.9 },
	hover: { opacity: 0.8, scale: 1.15 },
};
</script>

<template>
  <MotionConfig reduced-motion="user">
    <div class="z-10 flex items-center justify-center lg:-translate-y-6 lg:justify-end">
      <div class="flex flex-col items-center">
        <motion.div
          class="group relative will-change-transform"
          initial="rest"
          while-hover="hover"
          :variants="{ rest: {}, hover: { scale: 1.025 } }"
          :transition="springTransition"
        >
          <motion.div
            class="pointer-events-none absolute -inset-8 rounded-full bg-white/10 blur-3xl"
            :variants="profileGlowVariants"
            :transition="springTransition"
          />
          <ProseImg
            width="384"
            :src="profile.picture!"
            class="relative size-64 rounded-3xl border border-white/15 object-cover grayscale transition duration-500 group-hover:grayscale-0 sm:size-80 lg:size-[26rem]"
            :alt="`${profile.name} profile picture`"
            :aria-label="`${profile.name} profile picture`"
          />
        </motion.div>
        <motion.div
          class="group relative mt-4 will-change-transform"
          initial="rest"
          while-hover="hover"
          :variants="{ rest: {}, hover: { scale: 1.08, rotate: -4 } }"
          :transition="springTransition"
        >
          <motion.div
            class="pointer-events-none absolute -inset-6 rounded-full bg-cyan-300/25 blur-3xl"
            :variants="badgeGlowVariants"
            :transition="springTransition"
          />
          <img
            src="/media/badges/aws-academy-data-engineering-trained.png"
            alt="AWS Academy Data Engineering Trained badge"
            width="112"
            height="112"
            class="relative size-28 object-contain"
          >
        </motion.div>
      </div>
    </div>
  </MotionConfig>
</template>
