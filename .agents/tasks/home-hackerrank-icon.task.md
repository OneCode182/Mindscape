---
id: TASK-HOME-HACKERRANK-ICON
title: Replace HackerRank social icon
status: done
priority: low
created: 2026-09-03
updated: 2026-09-03
owner: Mindscape maintainers
source_request: User request to replace the current HackerRank icon with /home/onecode/Downloads/hackerrank-svgrepo-com (1).svg
agent: AGENT-HOME-HERO-REFRESH
skills:
  - superpowers:brainstorming
  - superpowers:test-driven-development
  - vue-patterns
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/assets/icons/hackerrank.svg
  - app/components/home/Social.vue
  - tests/social-icons.test.mjs
  - .agents/tasks/README.md
references:
  - .agents/architecture/frontend.md
  - /home/onecode/Downloads/hackerrank-svgrepo-com.svg
---

# Task: Replace HackerRank social icon

## Outcome

Home social links render the supplied HackerRank SVG from the local custom icon collection with theme-aware color inheritance.

## Constraints

- Must do: Copy source SVG into `app/assets/icons/` with the name `hackerrank.svg`.
- Must do: Map HackerRank to `custom:hackerrank`.
- Must do: Use `currentColor` so existing muted/hover styles apply.
- Must do: Preserve HackerRank URL from app config.
- Must not do: Modify the source file under `/home/onecode/Downloads/`.

## Checklist

- [x] Copy supplied SVG to local icon collection.
- [x] Replace local SVG with the updated supplied source.
- [x] Normalize fill to `currentColor`.
- [x] Replace Heroicons mapping.
- [x] Add regression test.
- [x] Run full verification and runtime smoke.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-03 | Use `app/assets/icons/hackerrank.svg` | Matches existing GitHub/LinkedIn custom SVG collection | `nuxt.config.ts`, `app/assets/icons/` |
| 2026-09-03 | Use `fill="currentColor"` | Keeps icon visible and theme-aware through `UIcon` classes | `app/assets/icons/hackerrank.svg` |
| 2026-09-03 | Use supplied `24×24` SVG source | Replaces prior mark with requested HackerRank shape while preserving local rendering contract | `app/assets/icons/hackerrank.svg` |

## Validation evidence

- Command: `node --test tests/social-icons.test.mjs`
- Result: RED before implementation; GREEN after implementation, 1 test passed.
- Command: `node --test tests/social-icons.test.mjs tests/home-cta.test.mjs`
- Result: Passed; 2 tests passed.
- Command: `pnpm build`
- Result: Passed; Nuxt loaded 26 local custom icons and prerendered localized routes. Existing Studio, sitemap, plugin timing, browser data, and vscode-icons warnings remain non-blocking.
- Command: `curl --fail --silent --show-error http://127.0.0.1:4000/es | rg -o -m 1 'HackerRank icon'`
- Result: Passed; dev SSR includes updated HackerRank SVG title.
- Command: `pnpm lint`
- Result: Passed; type-check, Biome, ESLint/SonarJS.
- Command: `pnpm format:check && git diff --check && xmllint --noout app/assets/icons/hackerrank.svg`
- Result: Passed.
- Command: `pnpm build`
- Result: Passed; Nuxt loaded 26 local custom icons and prerendered localized routes. Existing Studio, sitemap, plugin timing, browser data, and vscode-icons warnings remain non-blocking.
- Command: `curl --fail --silent --show-error http://127.0.0.1:4000/es | rg -o -m 1 'HackerRank icon'`
- Result: Passed; dev SSR includes supplied HackerRank SVG title.

## Progress notes

### 2026-09-03

- Status: done
- Files read: project contract, frontend architecture, Social component, icon config, supplied SVG
- Files changed: local HackerRank SVG, Social mapping, regression test, task registry
- Next step: None.

### 2026-09-03 — source refresh

- Status: done
- Files read: `/home/onecode/Downloads/hackerrank-svgrepo-com (1).svg`
- Files changed: replaced local SVG content; extended test for `viewBox="0 0 24 24"` and `role="img"`
- Next step: None.

## Blockers and risks

- Blocker: none
- Residual risk: Final visual size/color depends on rendered `UIcon` CSS and viewport.
