---
id: TASK-ROUTING-DEPLOY-TOUCH
title: Update locale routing, deploy visibility, and touch interactions
status: done
priority: medium
created: 2026-09-04
updated: 2026-09-04
owner: Mindscape maintainers
source_request: User request to move Spanish to root, limit Vercel Deploy to local, and enable hover effects on touch devices
agent: AGENT-HOME-HERO-REFRESH
skills:
  - nuxt
  - vue-patterns
  - responsive-design
  - superpowers:executing-plans
  - superpowers:test-driven-development
  - superpowers:verification-before-completion
architecture:
  - ARCH-FRONTEND
affected_files:
  - nuxt.config.ts
  - content.config.ts
  - app/middleware/legacy-es-redirect.global.ts
  - app/composables/useTouchHoverNavigation.ts
  - app/components/home/CTA.vue
  - tests/routing-deploy-touch.test.mjs
references:
  - .agents/architecture/frontend.md
  - .agents/skills/nuxt/SKILL.md
  - .agents/skills/vue-patterns/SKILL.md
  - .agents/skills/responsive-design/SKILL.md

# Task: Update locale routing, deploy visibility, and touch interactions

## Outcome

Spanish serves from `/`, English from `/en`, Vercel Deploy is local-only, and touch taps expose hover feedback before navigation.

## Constraints

- Must do: preserve `/es` compatibility, keep desktop navigation immediate, delay touch navigation by 1 second.
- Must not do: add deploy secrets, add dependencies, or modify `studio.repository`.

## Checklist

- [x] Add root-default i18n/content routing plus legacy `/es` redirects.
- [x] Restrict Vercel Deploy UI to loopback hosts and point source to `OneCode182/Mindscape` `main`.
- [x] Add shared touch hover/navigation composable and wire interactive links.
- [x] Complete full QA and browser smoke checks.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-04 | Use `prefix_except_default` with Spanish as default | Keeps Spanish at root while retaining `/en` | Nuxt i18n routing strategy docs; `nuxt.config.ts` |
| 2026-09-04 | Redirect `/es/*` to unprefixed equivalents | Preserves existing links and SEO entrypoints | `app/middleware/legacy-es-redirect.global.ts` |
| 2026-09-04 | Show official Deploy Button only on loopback hosts | Official button creates/clones a Vercel project; Git branch flow owns Preview/Production | Vercel Deploy Button docs; `app/components/home/CTA.vue` |
| 2026-09-04 | Mobile external links navigate same tab after 1 second | Avoids popup-blocked delayed `window.open`; desktop target semantics remain unchanged | `app/composables/useTouchHoverNavigation.ts` |

## Validation evidence

- Command: `node --test tests/routing-deploy-touch.test.mjs`
- Result: RED first, then 5/5 passing after implementation.
- Command: `node --test tests/*.test.mjs`
- Result: 18/18 passing.
- Command: `pnpm type-check`
- Result: passing.
- Command: `pnpm lint:eslint`
- Result: passing with no warnings.
- Command: `pnpm build`
- Result: passing; static Nitro output generated with `.output/public/index.html` and `.output/public/en.html`.
- Browser smoke: dev SSR routes `/`, `/en`, `/es`, `/es/about`; local/preview Deploy visibility; desktop/mobile screenshots.
- Result: `/` and `/en` return 200; `/es` and `/es/about` return 301 to `/` and `/about`; static root and English artifacts exist; Deploy visible on loopback only; screenshots render at 1440px and 390px.
- Command: `git diff --check`
- Result: passing.

## Progress notes

### 2026-09-04

- Status: done.
- Files read: project contract, frontend architecture, Nuxt/Vue/responsive skills, implementation plan.
- Files changed: routing config/content, legacy middleware, touch navigation, CTA/social/nav/project/article targets, README, tests.
- Final QA complete; no commit requested.

## Blockers and risks

- Blocker: none.
- Residual risk: touch behavior is covered by source tests and responsive browser smoke; physical-device validation remains external. Official Vercel Deploy Button remains a project creation flow, not a one-click promotion API.
