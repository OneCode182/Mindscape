import { useMediaQuery } from '@vueuse/core';

type TouchHoverKey = string | number;

interface TouchHoverNavigationOptions {
	delay?: number;
}

export function useTouchHoverNavigation(
	options: TouchHoverNavigationOptions = {},
) {
	const delay = options.delay ?? 1000;
	const isTouchDevice = useMediaQuery('(hover: none), (pointer: coarse)');
	const activeKey = ref<TouchHoverKey | null>(null);
	const router = useRouter();
	let timer: ReturnType<typeof setTimeout> | undefined;

	function clearTimer() {
		if (timer) clearTimeout(timer);
		timer = undefined;
	}

	function schedule(key: TouchHoverKey = '__touch__', callback?: () => void) {
		clearTimer();
		activeKey.value = key;
		timer = setTimeout(() => {
			activeKey.value = null;
			timer = undefined;
			callback?.();
		}, delay);
	}

	function handlePointerDown(
		_event: PointerEvent,
		key: TouchHoverKey = '__touch__',
	) {
		if (!isTouchDevice.value) return;
		schedule(key);
	}

	function navigate(href: string) {
		const url = new URL(href, window.location.href);

		if (url.origin === window.location.origin) {
			void router.push(`${url.pathname}${url.search}${url.hash}`);
			return;
		}

		window.location.assign(url.href);
	}

	function handleClick(event: MouseEvent, key: TouchHoverKey = '__touch__') {
		if (!isTouchDevice.value) return;

		const target = event.currentTarget;
		if (!(target instanceof HTMLAnchorElement)) return;

		event.preventDefault();
		schedule(key, () => navigate(target.href));
	}

	function cancel() {
		clearTimer();
		activeKey.value = null;
	}

	onBeforeUnmount(cancel);

	return {
		delay,
		isTouchDevice,
		activeKey,
		handlePointerDown,
		handleClick,
		cancel,
	};
}
