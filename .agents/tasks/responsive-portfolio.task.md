---
id: TASK-RESPONSIVE-PORTFOLIO
title: Make portfolio responsive with a mobile-first layout
status: done
priority: medium
created: 2026-09-04
updated: 2026-09-04
owner: Mindscape maintainers
source_request: User request to make the complete portfolio responsive/mobile-first while preserving the current desktop presentation
agent: AGENT-HOME-HERO-REFRESH
skills:
  - responsive-design
  - frontend-design
  - nuxt
  - vue-patterns
  - ui-ux-pro-max
  - accessibility
  - superpowers:test-driven-development
  - superpowers:verification-before-completion
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/layouts/default.vue
  - app/assets/style/main.css
  - app/components/content/Home.vue
  - app/components/content/About.vue
  - app/components/content/Works.vue
  - app/components/content/Writing.vue
  - app/components/content/Contact.vue
  - app/components/content/Experiences.vue
  - app/components/home/CTA.vue
  - app/components/home/Faq.vue
  - app/components/home/ProfilePicture.vue
  - app/components/home/Projects.vue
  - app/components/layout/Navbar.vue
  - app/components/project/Card.vue
  - app/components/project/List.vue
  - app/pages/articles/[...slug].vue
  - tests/responsive-layout.test.mjs
references:
  - .agents/architecture/frontend.md
  - .agents/skills/responsive-design/SKILL.md
  - .agents/skills/frontend-design/SKILL.md
---

# Task: Make portfolio responsive with a mobile-first layout

## Outcome

All public portfolio routes adapt from 320px mobile through desktop widths without horizontal overflow, while desktop composition remains unchanged from the existing design.

## Constraints

- Must do: keep the mobile navbar as a bottom bar; preserve desktop layout at `lg` widths; respect safe-area insets; keep existing dependencies.
- Must not do: redesign desktop identity, add dependencies, edit curriculum files, or copy TecniPass internals.

## Checklist

- [x] Add mobile-first hero, media, CTA, navbar, shell, list, card, and experience layout rules.
- [x] Add regression tests for mobile-safe-area, stacking, wrapping, and desktop CTA behavior.
- [x] Complete fresh project QA commands and browser smoke checks after error-page adjustment.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-04 | Use Tailwind responsive utilities plus minimal global CSS | Matches Nuxt UI/Tailwind architecture; limits global layout risk | `app/` diff; `ARCH-FRONTEND` |
| 2026-09-04 | Keep navbar bottom-fixed on mobile, top navigation on `sm+` | Preserves existing mobile interaction model while preventing hero overlap | `app/layouts/default.vue`, `app/components/layout/Navbar.vue` |
| 2026-09-04 | Use wrapper-based hero ordering | `HomeProfilePicture` does not forward arbitrary class attrs to its root | `tests/responsive-layout.test.mjs`; browser screenshot |

## Validation evidence

- Command: `node --test tests/responsive-layout.test.mjs tests/home-cta.test.mjs tests/social-icons.test.mjs`
- Result: 13/13 passing after final error-page adjustment.
- Command: `pnpm type-check`
- Result: passing after final error-page adjustment.
- Command: `pnpm exec biome check ...`
- Result: passing for 18 changed source/test files.
- Command: `pnpm format:check`
- Result: existing failure in unchanged `skills-lock.json` indentation; must report as residual baseline issue.
- Command: `pnpm lint:eslint`
- Result: passing.
- Command: `pnpm build`
- Result: passing; client/server build plus prerendered public routes after final error-page adjustment.
- Command: `google-chrome-stable --headless ... --window-size=320,900 --screenshot=... http://127.0.0.1:4000/es`
- Result: passing; fresh mobile screenshot confirms text-first hero, stacked CTAs, fixed bottom navbar.
- Command: `google-chrome-stable --headless ... --window-size=1440,900 --screenshot=... http://127.0.0.1:4000/es`
- Result: passing; fresh desktop screenshot confirms preserved two-column composition and one-line CTAs.

## Progress notes

### 2026-09-04

- Status: done.
- Files read: project contract, `.agents/AGENTS.md`, frontend architecture, responsive/frontend/Nuxt/Vue/UI/a11y skill refs.
- Files changed: responsive portfolio components, error page, global overflow/safe-area CSS, regression test.
- Next step: none; ready for review/commit.

## Blockers and risks

- Blocker: none.
- Residual risk: full `pnpm format:check` and `pnpm lint:biome` remain blocked by pre-existing formatting in unchanged `skills-lock.json`; browser coverage is smoke-level, not automated E2E.
