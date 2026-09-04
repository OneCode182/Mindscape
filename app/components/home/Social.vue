<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: Components are referenced in the Vue template.
import { MotionConfig } from 'motion-v';

const socialMediaRegexMap = [
	{
		regex: /github\.com/,
		name: 'GitHub',
		icon: 'custom:github',
		hoverColor: '#000000',
		glowColor: '#FFFFFF',
	},
	{
		regex: /linkedin\.com/,
		name: 'LinkedIn',
		icon: 'custom:linkedin',
		hoverColor: '#0966C3',
		glowColor: '#0966C3',
	},
	{
		regex: /hackerrank\.com/,
		name: 'HackerRank',
		icon: 'custom:hackerrank',
		hoverColor: '#2EC866',
		glowColor: '#2EC866',
	},
	{
		regex: /instagram\.com/,
		name: 'Instagram',
		icon: 'custom:instagram',
		hoverIcon: 'custom:instagram-hover',
		hoverColor: '#E1306C',
		glowColor: '#E1306C',
	},
];

const { socials } = useAppConfig();
const mappedSocials = Object.values(socials).map((link) => {
	const foundSocial = socialMediaRegexMap.find((social) =>
		social.regex.test(link),
	);
	if (!foundSocial) throw new Error(`No social media found for link: ${link}`);
	const { name, icon, hoverIcon, hoverColor, glowColor } = foundSocial;
	return { name, link, icon, hoverIcon, hoverColor, glowColor };
});
</script>

<template>
  <MotionConfig reduced-motion="user">
    <div class="my-7 flex items-center justify-start gap-6 sm:gap-10">
      <HomeSocialLink
        v-for="social in mappedSocials"
        :key="social.name"
        :name="social.name"
        :link="social.link"
        :icon="social.icon"
        :hover-icon="social.hoverIcon"
        :hover-color="social.hoverColor"
        :glow-color="social.glowColor"
      />
    </div>
  </MotionConfig>
</template>
