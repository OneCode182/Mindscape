---
id: TASK-PROJECT-PAGES-MOTION
title: Project detail pages and Motion interactions
status: done
priority: high
created: 2026-09-04
updated: 2026-09-04
owner: Mindscape maintainers
source_request: Add project previews, DeliverAI-first ordering, project detail routes, and Motion animations
agent: AGENT-CODEX
skills:
  - frontend-design
  - motion-dev-animations
  - nuxt
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/components/content/Works.vue
  - app/components/home/Projects.vue
  - app/components/project/Card.vue
  - app/components/project/Details.vue
  - app/components/project/List.vue
  - app/components/project/Preview.vue
  - app/pages/project/[slug].vue
  - app/pages/works.vue
  - app/utils/projects.ts
  - content.config.ts
  - content/en/2.projects.md
  - content/es/2.projects.md
  - content/en/projects/*.json
  - content/es/projects/*.json
  - i18n/locales/en/projects.json
  - i18n/locales/es/projects.json
  - i18n/locales/messages.ts
  - package.json
  - scripts/copy-public-assets.mjs
  - tests/projects-routing.test.mjs
references:
  - .agents/architecture/frontend.md
  - .agents/tasks/README.md
---

# Task: Project detail pages and Motion interactions

## Outcome

Projects render DeliverAI first, expose short neon previews on hover/touch, and link to localized `/project/{slug}` detail pages.

## Constraints

- Must preserve existing project data and bilingual routing.
- Must keep external project links on detail pages.
- Must support keyboard focus, touch navigation delay, and reduced motion.
- Must not edit curriculum files.

## Checklist

- [x] Add stable bilingual project slugs and `/projects` content route.
- [x] Add localized project detail page with article-style layout.
- [x] Add DeliverAI-first ordering across project views.
- [x] Add Motion hover/tap/layout transitions and short previews.
- [x] Preserve static deployment assets after generation.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-04 | Use `motion-v` for Vue Motion integration. | Existing Nuxt app is Vue-based; `motion-v` is already installed. | `app/components/home/Projects.vue`, `app/components/project/Card.vue` |
| 2026-09-04 | Use stable content `slug` fields for internal routes. | Names are presentation data; slugs must remain URL-safe and bilingual. | `content.config.ts`, `app/pages/project/[slug].vue` |
| 2026-09-04 | Keep `/works` as a compatibility redirect page. | Existing inbound links remain usable after canonicalizing `/projects`. | `app/pages/works.vue` |
| 2026-09-04 | Add post-build asset sync for static output. | Nuxt static generation emitted route HTML without root `public/` assets in this environment. | `scripts/copy-public-assets.mjs`, `package.json` |

## Validation evidence

- Command: `node --test tests/*.test.mjs`
- Result: 24/24 passed.
- Command: `pnpm type-check`
- Result: Passed.
- Command: `pnpm exec biome check ...`
- Result: Passed for all changed implementation, test, config, and task files.
- Command: `pnpm lint:eslint`
- Result: Passed.
- Command: `pnpm generate`
- Result: Routes prerendered; Nuxt emitted known Studio, Browserslist, plugin-timing, and missing vscode-icons warnings.
- Command: `pnpm build`
- Result: Passed; routes prerendered and `postbuild` executed.
- Command: `pnpm run postgenerate`
- Result: Static output contains project, profile, OG, and badge assets.

## Progress notes

### 2026-09-04

- Status: Done; implementation and final verification complete.
- Files read: `.agents/AGENTS.md`, `.agents/env.json`, `.agents/architecture/frontend.md`, `.agents/tasks/README.md`.
- Files changed: project content schemas/data, project UI, localized route, Motion interactions, static asset sync, tests.
- Next step: Explicit Git commit request, if needed.

## Blockers and risks

- Blocker: none.
- Residual risk: Nuxt static output still requires the post-build/post-generate asset sync because the native copy path did not emit root `public/` files here.
