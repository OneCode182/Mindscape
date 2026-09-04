<script setup lang="ts">
const localePath = useLocalePath();

await navigateTo(localePath('/projects'), {
	redirectCode: 301,
	replace: true,
});
</script>
