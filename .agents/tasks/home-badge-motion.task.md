---
id: TASK-HOME-BADGE-MOTION
title: Add motion hover treatment to home profile media
status: done
priority: low
created: 2026-09-03
updated: 2026-09-03
owner: Mindscape maintainers
source_request: User request to remove badge frame and add hover motion to badge and profile photo
agent: AGENT-HOME-HERO-REFRESH
skills:
  - motion-dev-animations
  - vue-patterns
  - superpowers:brainstorming
  - superpowers:test-driven-development
  - superpowers:verification-before-completion
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/components/home/ProfilePicture.vue
  - package.json
  - pnpm-lock.yaml
  - tests/home-cta.test.mjs
  - .agents/tasks/README.md
references:
  - .agents/architecture/frontend.md
  - .agents/tasks/home-badge-presentation.task.md
---

# Task: Add motion hover treatment to home profile media

## Outcome

Home profile photo and AWS badge use subtle responsive hover motion with a neon-blue badge glow, no outer badge frame, plus reduced-motion support.

## Constraints

- Must do: Remove badge border, background, radius, and padding frame.
- Must do: Animate badge scale down and slight rotation on hover.
- Must do: Animate profile photo scale on hover in/out.
- Must do: Keep motion transform/opacity based and layout stable.
- Must do: Respect `prefers-reduced-motion` through `MotionConfig`.
- Must not do: Modify curriculum or source media files.

## Checklist

- [x] Add direct `motion-v` dependency for Vue motion components.
- [x] Apply spring hover variants to profile photo and badge.
- [x] Add neon-cyan blur layer below badge.
- [x] Remove badge exterior frame classes.
- [x] Extend regression test for motion and presentation contract.
- [x] Run project verification and runtime smoke checks.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-03 | Use `motion-v` direct import | Vue-compatible Motion API; dependency already available through Nuxt UI | `package.json`, `app/components/home/ProfilePicture.vue` |
| 2026-09-03 | Use named spring variants | One hover state drives scale/rotation and child glow; return state restores on hover out | `app/components/home/ProfilePicture.vue` |
| 2026-09-03 | Configure `MotionConfig reduced-motion="user"` | Honors system motion preference without changing layout dimensions | `app/components/home/ProfilePicture.vue` |

## Validation evidence

- Command: `node --test tests/home-cta.test.mjs`
- Result: Passed; 1 test passed after TDD RED/GREEN cycle.
- Command: `pnpm format:check`
- Result: Passed; 91 files checked.
- Command: `pnpm lint`
- Result: Passed; type-check, Biome, ESLint/SonarJS.
- Command: `pnpm build`
- Result: Passed; Nuxt client/server built and localized routes prerendered. Existing Studio, sitemap, plugin timing, browser data, and icon warnings remain non-blocking.
- Command: `git diff --check`
- Result: Passed.
- Command: `curl --fail --silent --show-error --head http://127.0.0.1:4000/media/badges/aws-academy-data-engineering-trained.png`
- Result: Passed; dev server returned `HTTP/1.1 200 OK`, `Content-Type: image/png`.
- Command: `curl --fail --silent --show-error http://127.0.0.1:4000/es | rg -o -m 1 '/media/badges/aws-academy-data-engineering-trained\\.png'`
- Result: Passed; Spanish home SSR references badge path.

## Progress notes

### 2026-09-03

- Status: done
- Files read: project contract, frontend architecture, motion-v API, Vue patterns, profile component, package config, existing badge task
- Files changed: profile motion markup, direct dependency/lockfile, regression test, task registry
- Next step: None.

## Blockers and risks

- Blocker: none
- Residual risk: Exact visual feel depends on viewport, pointer device, and font/image rendering; no Chrome DevTools FPS trace captured.
