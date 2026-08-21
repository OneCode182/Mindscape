<script setup lang="ts">
const { profile } = useAppConfig();
</script>

<template>
  <div class="z-10 flex items-center justify-center lg:justify-end">
    <div class="group relative">
      <div class="absolute -inset-8 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:bg-white/20" />
      <ProseImg
        width="384"
        :src="profile.picture!"
        class="relative size-64 rounded-3xl border border-white/15 object-cover grayscale transition duration-500 group-hover:grayscale-0 sm:size-80 lg:size-[26rem]"
        :alt="`${profile.name} profile picture`"
        :aria-label="`${profile.name} profile picture`"
      />
    </div>
  </div>
</template>
