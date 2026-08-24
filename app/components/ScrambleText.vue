<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = withDefaults(
	defineProps<{
		label?: string;
		duration?: number;
	}>(),
	{
		label: undefined,
		duration: 20,
	},
);

const source = ref<HTMLElement | null>(null);
const displayText = ref(props.label ?? '');
const originalText = ref(props.label ?? '');
const hasLabel = computed(() => props.label !== undefined);
const charset = 'abcdefghijklmnopqrstuvwxyz1234567890';

let timer: number | undefined;
let animationId = 0;

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

const syncSourceText = () => {
	if (hasLabel.value || !source.value) return;

	const nextText = normalize(source.value.textContent ?? '');
	if (nextText && nextText !== originalText.value) {
		originalText.value = nextText;
		displayText.value = nextText;
	}
};

const randomCharacter = () => {
	const randomValues = new Uint32Array(1);
	globalThis.crypto.getRandomValues(randomValues);
	return charset[randomValues[0] % charset.length];
};

const isScrambleable = (character: string) =>
	/[a-z0-9áéíóúüñ]/i.test(character);

const stopScrambling = () => {
	animationId += 1;
	if (timer !== undefined) {
		window.clearTimeout(timer);
		timer = undefined;
	}
};

const startScrambling = () => {
	syncSourceText();
	if (!originalText.value) return;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		displayText.value = originalText.value;
		return;
	}

	stopScrambling();
	const currentAnimation = animationId;
	const characters = [...originalText.value];
	let revealed = 0;

	const tick = () => {
		if (currentAnimation !== animationId) return;

		displayText.value = characters
			.map((character, index) => {
				if (index < revealed || !isScrambleable(character)) return character;
				return randomCharacter();
			})
			.join('');

		if (revealed >= characters.length) {
			displayText.value = originalText.value;
			timer = undefined;
			return;
		}

		revealed += 1;
		timer = window.setTimeout(tick, props.duration);
	};

	tick();
};

watch(
	() => props.label,
	(nextLabel) => {
		if (nextLabel === undefined) return;
		stopScrambling();
		originalText.value = nextLabel;
		displayText.value = nextLabel;
	},
);

onMounted(() => {
	syncSourceText();
});

onBeforeUnmount(stopScrambling);
</script>

<template>
  <span
    class="inline"
    :aria-label="originalText || undefined"
    @mouseenter="startScrambling"
    @focusin="startScrambling"
  >
    <template v-if="hasLabel">
      <span aria-hidden="true">{{ displayText }}</span>
    </template>
    <template v-else>
      <span
        ref="source"
        class="sr-only"
      >
        <slot />
      </span>
      <span
        v-if="originalText"
        aria-hidden="true"
      >
        {{ displayText }}
      </span>
      <span
        v-else
        aria-hidden="true"
      >
        <slot />
      </span>
    </template>
  </span>
</template>
