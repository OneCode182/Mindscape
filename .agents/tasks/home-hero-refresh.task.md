---
id: TASK-HOME-HERO-REFRESH
title: Refresh home hero layout
status: done
priority: medium
created: 2026-08-20
updated: 2026-08-20
owner: Mindscape maintainers
source_request: User request to adapt the home hero to the Shelve visual reference
agent: AGENT-HOME-HERO-REFRESH
skills:
  - tech/vue-patterns
  - tech/bencium-controlled-ux-designer
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/app.config.ts
  - app/assets/style/main.css
  - app/components/DotPattern.vue
  - app/components/content/Home.vue
  - app/components/home/ProfilePicture.vue
  - app/components/home/Social.vue
  - content/en/1.index.md
  - content/es/1.index.md
references:
  - /home/onecode/shelve/apps/lp/app/components/landing/Hero.vue
  - /home/onecode/shelve/apps/base/assets/css/base.css
  - /home/onecode/Documents/curriculum/cv-2/resume.tex
  - /home/onecode/Documents/curriculum/cv-2/resume/summary.tex
---

# Task: Refresh home hero layout

## Outcome

Home hero presents the owner's name and CV summary on the left with a portrait on the right against Shelve's near-black background treatment. Experience now starts as a distinct dotted section connected by a soft gradient bridge.

## Constraints

- Must do: Keep English and Spanish hero content localized.
- Must do: Preserve responsive stacking and accessible image text alternatives.
- Must do: Keep the hero black and retain the dotted background through the experience section.
- Must not do: Copy Shelve source code or external project content as portfolio identity.

## Checklist

- [x] Apply Shelve's `#010101` dark background.
- [x] Arrange hero copy left and portrait right on large screens.
- [x] Stack hero content on narrow screens.
- [x] Replace inherited template identity with CV-based name and summary.
- [x] Add a soft Shelve-inspired transition before the experience section.
- [x] Keep the dotted treatment visible below the transition.
- [x] Run build and SSR checks.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-08-20 | Use `#010101` for the dark page background | Matches Shelve's documented dark UI base while keeping the existing token system | `app/assets/style/main.css`, Shelve `base.css` |
| 2026-08-20 | Use a two-column hero with progressive mobile stacking | Mirrors the requested Shelve composition without reducing mobile readability | `app/components/content/Home.vue` |
| 2026-08-20 | Use CV name and summary for hero content | Keeps the visual reference separate from personal content authorship | `content/en/1.index.md`, `content/es/1.index.md`, `cv-2/resume.tex` |
| 2026-08-20 | Split hero and experience into dark sections with a soft bridge | Preserves the black hero while giving the experience area its own dotted surface | `app/components/content/Home.vue`, Shelve `BgGradient.vue` |
| 2026-08-20 | Remove the bridge divider and blend section backgrounds vertically | Prevents a bar-like overlay and keeps the light treatment and dots continuous | `app/components/content/Home.vue` |
| 2026-08-20 | Let Home bleed behind the fixed navbar | Removes the layout's top band so the hero gradient starts continuously under the header | `app/components/content/Home.vue`, `app/layouts/default.vue` |

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
- Result: Passed; Nuxt prerendered localized home routes. Existing Studio, sitemap, plugin timing, and icon warnings remain non-blocking.
- Command: `rg -o "Sergio Andrey Silva Rodríguez|Ingeniero de Sistemas|Systems Engineer" .output/public/es.html .output/public/en.html`
- Result: Passed; localized name and hero summaries are present in SSR output.

## Progress notes

### 2026-08-20

- Status: done
- Files read: project contracts, frontend architecture, Shelve hero/background reference, CV header/summary
- Files changed: hero layout, profile presentation, dark background, localized hero content, section transition, dotted backgrounds
- Follow-up: removed the horizontal bridge divider and softened the section boundary with a vertical gradient.
- Follow-up: offset Home by the desktop navbar height to remove the top layout band under the fixed header.
- Next step: None.

## Blockers and risks

- Blocker: none
- Residual risk: Exact visual parity depends on viewport and font rendering.
