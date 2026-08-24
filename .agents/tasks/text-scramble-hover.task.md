---
id: TASK-TEXT-SCRAMBLE-HOVER
title: Add Shelve-style text scramble hover
status: done
priority: low
created: 2026-08-20
updated: 2026-08-20
owner: Mindscape maintainers
source_request: User request to add Shelve's encryption-like hover effect to the name and portfolio headings
agent: AGENT-HOME-HERO-REFRESH
skills:
  - tech/vue-patterns
  - tech/bencium-controlled-ux-designer
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/components/ScrambleText.vue
  - app/components/content/Home.vue
  - app/components/content/Experiences.vue
  - app/components/home/Projects.vue
  - app/components/home/Faq.vue
  - app/components/content/About.vue
  - app/components/content/Works.vue
  - app/components/content/Writing.vue
  - app/components/content/Contact.vue
references:
  - /home/onecode/shelve/apps/base/components/ScrambleText.vue
---

# Task: Add Shelve-style text scramble hover

## Outcome

Portfolio name and section headings reveal their original text through a short character scramble on hover or keyboard focus.

## Constraints

- Must do: Preserve readable text, spaces, punctuation, and localized content.
- Must do: Respect `prefers-reduced-motion` and keep headings accessible to screen readers.
- Must not do: Add a dependency or copy Shelve source code directly.

## Checklist

- [x] Add a reusable `ScrambleText` component.
- [x] Apply it to the home name and major portfolio headings.
- [x] Support keyboard focus and reduced-motion preferences.
- [x] Validate type-checking, linting, formatting, and production build.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-08-20 | Use a local reusable component instead of per-heading animation code | Keeps the interaction consistent and easy to extend | `app/components/ScrambleText.vue` |
| 2026-08-20 | Preserve whitespace and punctuation while scrambling letters and numbers | Keeps the effect legible for names, accents, and localized headings | `app/components/ScrambleText.vue` |
| 2026-08-20 | Add focus and reduced-motion behavior | Makes the hover treatment keyboard-friendly and motion-sensitive | `app/components/ScrambleText.vue` |

## Validation evidence

- Command: `pnpm type-check`
- Result: Passed.
- Command: `pnpm lint:biome`
- Result: Passed.
- Command: `pnpm lint:eslint`
- Result: Passed.
- Command: `git diff --check`
- Result: Passed.
- Command: `pnpm build`
- Result: Passed; localized routes were prerendered. Existing non-blocking Studio, sitemap, plugin timing, and icon warnings remain.

## Progress notes

### 2026-08-20

- Status: done
- Files read: Shelve `ScrambleText.vue`, Mindscape heading components, Vue/Nuxt project guidance
- Files changed: reusable scramble component and localized heading usages
- Next step: None.

## Blockers and risks

- Blocker: none
- Residual risk: Exact animation timing may feel different across devices and font rendering.
