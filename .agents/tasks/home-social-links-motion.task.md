---
id: TASK-HOME-SOCIAL-LINKS-MOTION
title: Animate home social links and add Instagram
status: done
priority: medium
created: 2026-09-03
updated: 2026-09-03
owner: Mindscape maintainers
source_request: Animate all home social links, add Instagram, tooltips, hover colors, and Instagram SVG swap
agent: AGENT-HOME-HERO-REFRESH
skills:
  - superpowers:brainstorming
  - superpowers:test-driven-development
  - motion-dev-animations
  - vue-patterns
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/app.config.ts
  - app/components/home/Social.vue
  - app/components/home/SocialLink.vue
  - app/components/home/ProfilePicture.vue
  - app/assets/icons/instagram.svg
  - app/assets/icons/instagram-hover.svg
  - tests/social-icons.test.mjs
  - tests/home-cta.test.mjs
references:
  - .agents/architecture/frontend.md
  - /home/onecode/Downloads/instagram-logo-facebook-2-svgrepo-com.svg
  - /home/onecode/Downloads/instagram-2016-logo-svgrepo-com.svg
---

# Task: Animate home social links and add Instagram

## Outcome

Home social links share one reusable animated component. Hover/focus shows zoom, slight tilt, neon glow, hover color, and tooltip. Instagram swaps supplied SVG states.

## Constraints

- Must do: Keep all social links on one reusable component API.
- Must do: Respect reduced-motion through `MotionConfig`.
- Must do: Keep supplied SVG files under `/home/onecode/Downloads/` untouched.
- Must do: Use `https://www.instagram.com/sergiosilva182` for Instagram.
- Must do: Preserve external-link behavior and accessible labels.
- Must not do: Copy curriculum data or secrets.

## Checklist

- [x] Add Instagram app config URL.
- [x] Copy normal and hover Instagram SVG assets.
- [x] Add reusable `SocialLink` component.
- [x] Add common zoom/tilt/glow motion.
- [x] Add hover color metadata and Instagram SVG swap.
- [x] Add hover tooltip and focus-visible affordance.
- [x] Run build and runtime smoke after final component adjustment.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-03 | Use `SocialLink.vue` props for link metadata | One behavior path -> consistent SOLID-style social interaction | `app/components/home/SocialLink.vue` |
| 2026-09-03 | Use spring `scale: 1.14`, `rotate: -4` | Matches existing badge motion pattern with slightly larger links | `app/components/home/SocialLink.vue` |
| 2026-09-03 | Use supplied Instagram SVG as base/hover pair | User requested normal logo -> 2016 gradient logo on hover | `app/assets/icons/instagram*.svg` |
| 2026-09-03 | Use `#E1306C` Instagram glow color | User omitted Instagram hex; Instagram brand pink provides consistent hover feedback | `app/components/home/Social.vue` |
| 2026-09-03 | Separate GitHub SVG color from neon glow color | Preserve black SVG while making hover glow visible white | `app/components/home/Social.vue`, `app/components/home/SocialLink.vue` |
| 2026-09-03 | Normalize normal Instagram SVG to N2 dimensions | Match N1/N2 internal `width`, `height`, and `viewBox`; scale paths to preserve visual size | `app/assets/icons/instagram.svg` |
| 2026-09-03 | Use `currentColor` for normal Instagram SVG | Match muted color of other social links before hover | `app/assets/icons/instagram.svg` |
| 2026-09-03 | Change badge hover scale to `1.08` | Hover must zoom in, not zoom out | `app/components/home/ProfilePicture.vue` |

## Validation evidence

- Command: `node --test tests/social-icons.test.mjs`
- Result: Passed 6 focused tests after implementation; RED observed before implementation.
- Command: `pnpm lint`
- Result: Passed type-check, Biome, ESLint/SonarJS.
- Command: `pnpm build`
- Result: Passed; Nuxt loaded 27 local custom icons and prerendered localized routes. Existing Studio, sitemap, plugin timing, browser data, and `vscode-icons` warnings remain non-blocking.
- Command: `curl --fail --silent --show-error http://127.0.0.1:4000/es` plus SSR marker checks
- Result: Passed; 4 tooltip nodes, Instagram URL, hover colors, and no unresolved `SocialLink` component.

## Progress notes

### 2026-09-03

- Status: done
- Files read: project contract, frontend architecture, Social component, app config, supplied Instagram SVGs, Motion implementation.
- Files changed: app config, Social mapping, new reusable SocialLink, Instagram assets, regression tests.
- Follow-up fix: normalized Instagram transform translation to center N1 after 2500-scale conversion.
- Next step: None.

## Blockers and risks

- Blocker: none.
- Residual risk: GitHub hover black can have low contrast on dark background because requested color is black.
