---
id: TASK-HOME-WORK-EXPERIENCE
title: Add CV-based work experience to home page
status: done
priority: medium
created: 2026-08-20
updated: 2026-08-20
owner: Mindscape maintainers
source_request: User request to add work experience above Projects using current CV
agent: AGENT-HOME-WORK-EXPERIENCE
skills:
  - tech/vue-patterns
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/components/content/Home.vue
  - app/components/content/Experiences.vue
  - content/en/1.index.md
  - content/es/1.index.md
  - i18n/locales/en/global.json
  - i18n/locales/es/global.json
  - .agents/tasks/README.md
references:
  - /home/onecode/Documents/curriculum/cv-2/resume/experience.tex
---

# Task: Add CV-based work experience to home page

## Outcome

Home page renders localized work experience above Projects, using the three roles from `cv-2`.

## Constraints

- Must do: Keep English and Spanish content localized.
- Must do: Preserve existing About experience data compatibility.
- Must not do: Edit curriculum source files or copy external harness internals.

## Checklist

- [x] Add home experience slot before Projects.
- [x] Extend experience renderer with role, location, and highlights.
- [x] Add CV-based English and Spanish entries.
- [x] Move detailed achievements into an accessible hover/focus popover.
- [x] Present company as title, role as subtitle, and right-aligned date/location metadata.
- [x] Mark the current role with a green lower-right status badge.
- [x] Show localized work-mode badges below each location.
- [x] Run type, format, lint, and build checks.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-08-20 | Reuse `Experiences.vue` through a new home content slot | Keeps one presentation component while allowing localized page content | `app/components/content/Home.vue` |
| 2026-08-20 | Store entries in localized index content | Separates authored profile content from Vue rendering logic | `content/en/1.index.md`, `content/es/1.index.md` |
| 2026-08-20 | Use progressive disclosure with a hover/focus/touch popover | Keeps the home scan compact while preserving keyboard and touch access to long achievements | `app/components/content/Experiences.vue` |
| 2026-08-20 | Use company-first hierarchy with right-aligned metadata | Makes employer identity scan first while keeping role, interval, and location distinct | `app/components/content/Experiences.vue` |
| 2026-08-20 | Mark only explicitly current experience with a green badge | Keeps status semantic and independent from list ordering | `content/es/1.index.md`, `content/en/1.index.md`, `app/components/content/Experiences.vue` |
| 2026-08-20 | Show work mode below location with a blue badge | Makes workplace arrangement scannable without competing with role/date hierarchy | `content/es/1.index.md`, `content/en/1.index.md`, `app/components/content/Experiences.vue` |

## Validation evidence

- Command: `pnpm type-check`
- Result: Passed.
- Command: `pnpm lint:biome`
- Result: Passed with no fixes.
- Command: `pnpm lint:eslint`
- Result: Passed with no errors or warnings.
- Command: `pnpm build`
- Result: Passed; Nuxt prerendered EN/ES home routes. Existing Studio, sitemap, and icon warnings remain non-blocking.
- Command: `rg -o "Experiencia laboral|Proyectos" .output/public/es.html`
- Result: Passed; both headings present, work experience offset precedes projects.
- Command: `rg -o "Ver logros|View achievements" .output/public/es.html .output/public/en.html`
- Result: Passed; localized progressive-disclosure affordance rendered for all three entries.
- Command: `rg -o "Actual|Current" .output/public/es.html .output/public/en.html`
- Result: Passed; one localized current-status badge rendered per home route without parentheses.
- Command: `rg -o "Híbrido|Presencial|Remoto|Hybrid|On-site|Remote" .output/public/es.html .output/public/en.html`
- Result: Passed; all localized work-mode labels rendered below experience metadata.
- Command: `git diff --check`
- Result: Passed; no whitespace errors.

## Progress notes

### 2026-08-20

- Status: done
- Files read: `AGENTS.md`, `.agents/AGENTS.md`, `.agents/architecture/frontend.md`, `cv-2/resume/experience.tex`
- Files changed: home renderer, experience component, localized home content, task index
- Next step: None.

## Blockers and risks

- Blocker: none
- Residual risk: Long CV bullets increase home-page vertical length.
