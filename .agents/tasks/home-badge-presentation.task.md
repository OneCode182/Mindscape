---
id: TASK-HOME-BADGE-PRESENTATION
title: Add AWS Academy badge to home presentation
status: done
priority: low
created: 2026-09-03
updated: 2026-09-03
owner: Mindscape maintainers
source_request: User request to reposition and enlarge AWS Academy Data Engineering badge below home profile photo
agent: AGENT-HOME-HERO-REFRESH
skills:
  - frontend-design
  - superpowers:brainstorming
  - superpowers:test-driven-development
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/components/home/CTA.vue
  - app/components/home/ProfilePicture.vue
  - public/media/badges/aws-academy-data-engineering-trained.png
  - tests/home-cta.test.mjs
  - .agents/tasks/README.md
references:
  - .agents/architecture/frontend.md
  - /home/onecode/Documents/aws-academy-data-engineering-trained.png
---

# Task: Add AWS Academy badge to home presentation

## Outcome

Home profile presentation shows a larger AWS Academy Data Engineering Trained badge centered below the photo, sourced from stable portfolio media path.

## Constraints

- Must do: Keep Contact, Meeting, and Deploy controls grouped separately from profile badge.
- Must do: Center badge below profile photo and increase its visual size.
- Must do: Lift profile presentation slightly on large screens.
- Must do: Store portfolio media under `public/media/badges/`.
- Must do: Provide descriptive image alternative text.
- Must not do: Modify source image or curriculum files.

## Checklist

- [x] Copy badge into portfolio media path.
- [x] Render badge centered below home profile photo.
- [x] Validate asset path, type-check, format, lint, and build.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-03 | Use `public/media/badges/` for badge storage | Stable URL path groups future portfolio media by type | `.agents/architecture/frontend.md` |
| 2026-09-03 | Render badge below `HomeProfilePicture` | Keeps profile media with profile presentation; centers badge independently from CTA actions | `app/components/home/ProfilePicture.vue` |
| 2026-09-03 | Use `size-28` badge plus `lg:-translate-y-6` profile offset | Improves badge legibility; raises desktop profile group slightly | `app/components/home/ProfilePicture.vue` |

## Validation evidence

- Command: `node --test tests/home-cta.test.mjs`
- Result: RED before implementation; GREEN after implementation, 1 test passed.
- Command: `pnpm format:check`
- Result: Passed.
- Command: `pnpm lint:biome`
- Result: Passed.
- Command: `pnpm lint:eslint`
- Result: Passed.
- Command: `pnpm type-check`
- Result: Passed.
- Command: `pnpm build`
- Result: Passed; localized routes prerendered. Existing Studio, sitemap, plugin timing, browser data, and icon warnings remain non-blocking.
- Command: `pnpm generate`
- Result: Passed; static localized routes generated. Existing public-asset output behavior remains unchanged.
- Command: `curl --fail --silent --show-error --head http://127.0.0.1:4000/media/badges/aws-academy-data-engineering-trained.png`
- Result: Passed; dev server returned `HTTP/1.1 200 OK`, `Content-Type: image/png`.
- Command: `curl --fail --silent --show-error http://127.0.0.1:4000/es | rg -o -m 1 '/media/badges/aws-academy-data-engineering-trained\\.png'`
- Result: Passed; Spanish home SSR references badge path.
- Command: `git diff --check`
- Result: Passed.
- Command: `node --test tests/home-cta.test.mjs`
- Result: Passed after relocation; 1 test passed.
- Command: `pnpm exec biome check app/components/home/CTA.vue app/components/home/ProfilePicture.vue tests/home-cta.test.mjs`
- Result: Passed.

## Progress notes

### 2026-09-03

- Status: done
- Files read: project contract, frontend architecture, home CTA components, package scripts
- Files changed: CTA markup, profile presentation markup, AWS badge asset, regression test, task registry
- Next step: None.

## Blockers and risks

- Blocker: none
- Residual risk: Exact visual spacing depends on viewport and font rendering.
