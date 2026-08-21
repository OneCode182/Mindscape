---
id: TASK-CV-PROJECTS
title: Add CV projects before work experience
status: done
priority: medium
created: 2026-08-21
updated: 2026-08-21
owner: Mindscape maintainers
source_request: User request to place projects above work experience and use projects from all relevant CVs with details on hover
agent: AGENT-CV-PROJECTS
skills:
  - tech/vue-patterns
  - tech/bencium-controlled-ux-designer
architecture:
  - ARCH-FRONTEND
affected_files:
  - app/components/content/Home.vue
  - app/components/home/Projects.vue
  - app/components/content/Works.vue
  - app/components/project/Card.vue
  - app/components/project/Details.vue
  - app/types/project.ts
  - content.config.ts
  - content/en/projects/arep-twitter.json
  - content/en/projects/eci-bienestar-total.json
  - content/es/projects/arep-twitter.json
  - content/es/projects/eci-bienestar-total.json
references:
  - /home/onecode/Documents/curriculum/cv-2/resume/projects.tex
  - /home/onecode/Documents/curriculum/cv_back-java-ai-dev/resume/projects.tex
  - .agents/architecture/frontend.md
---

# Task: Add CV projects before work experience

## Outcome

The home page shows CV-backed projects before work experience, with technical context available on hover without changing the existing project item structure.

## Constraints

- Must do: Keep English and Spanish project content aligned.
- Must do: Preserve existing personal projects while adding the CV projects.
- Must do: Keep project links and hover details accessible to keyboard and touch users.
- Must not do: Import unrelated template CV content or modify curriculum files.

## Checklist

- [x] Move Projects before Experience on the home page.
- [x] Add AREP Twitter and ECI Bienestar Total from the relevant CVs.
- [x] Add localized technical details and technology badges.
- [x] Show additional project information through the existing item hover flow.
- [x] Update project schema and shared project types.
- [x] Validate type-checking, linting, formatting, SSR output, and production build.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-08-21 | Use `cv-2` and `cv_back-java-ai-dev` as the authoritative project sources | Both contain the same two projects; the backend CV adds useful cloud architecture detail | Curriculum project files |
| 2026-08-21 | Preserve existing project entries and add the CV projects as featured items | Avoids deleting personal portfolio work while making CV work visible on the home page | `content/*/projects/*.json` |
| 2026-08-21 | Reuse the project card/list shell and move context into `ProjectDetails` hover content | Keeps the established visual language while reducing card density | `app/components/project/Card.vue`, `app/components/project/Details.vue` |

## Validation evidence

- Command: `pnpm exec nuxt prepare`
- Result: Passed; content types regenerated with optional image/date and hover detail fields.
- Command: `pnpm type-check`
- Result: Passed.
- Command: `pnpm lint:biome`
- Result: Passed.
- Command: `pnpm lint:eslint`
- Result: Passed.
- Command: `git diff --check`
- Result: Passed.
- Command: `pnpm build`
- Result: Passed; localized routes were prerendered. Existing Studio, sitemap, plugin timing, and icon warnings remain non-blocking.
- Command: SSR project/order check against `.output/public/es.html` and `.output/public/en.html`
- Result: Passed; both localized CV projects appear before the localized work-experience heading.

## Progress notes

### 2026-08-21

- Status: done
- Files read: project item components, project schema, `cv-2`, `cv_back-java-ai-dev`, and unrelated CV directories for source validation
- Files changed: project ordering, localized project entries, hover details, shared project type, and content schema
- Next step: None.

## Blockers and risks

- Blocker: none
- Residual risk: Existing project images remain asset-backed while CV projects use a CSS placeholder because the CVs do not provide project artwork.
