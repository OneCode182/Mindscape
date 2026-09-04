---
id: TASK-DELIVERAI-PROJECT
title: Add DeliverAI academic project and paper diagram
status: done
priority: medium
created: 2026-09-04
updated: 2026-09-04
owner: Mindscape maintainers
source_request: Add DeliverAI from /home/onecode/ECI/DeliverAI/docs/paper/main.tex and main.pdf to the portfolio projects section
agent: Codex
skills:
  - nuxt
  - frontend-design
  - superpowers:test-driven-development
  - superpowers:verification-before-completion
architecture:
  - ARCH-FRONTEND
affected_files:
  - content/en/projects/deliverai.json
  - content/es/projects/deliverai.json
  - public/projects/deliverai-architecture.png
  - app/components/project/Card.vue
  - app/types/project.ts
  - content.config.ts
  - tests/deliverai-project.test.mjs
references:
  - .agents/architecture/frontend.md
  - /home/onecode/ECI/DeliverAI/docs/paper/main.tex
  - /home/onecode/ECI/DeliverAI/docs/paper/main.pdf
  - /home/onecode/ECI/DeliverAI/README.md

# Task: Add DeliverAI academic project and paper diagram

## Outcome

DeliverAI appears in the localized portfolio project collections with the paper's architecture diagram served as a non-cropped static asset.

## Constraints

- Must do: preserve ES/EN content parity; describe prototype scope without production overclaims; keep diagram source external and read-only.
- Must not do: edit `/home/onecode/ECI`; add runtime LaTeX rendering; alter unrelated project cards.

## Checklist

- [x] Add bilingual DeliverAI project records from paper/repo evidence.
- [x] Add the provided render of the TikZ diagram under `public/projects/`.
- [x] Support per-project `imageFit` with `cover` as default and `contain` for DeliverAI.
- [x] Verify focused tests, type-check, lint, build and SSR/static project rendering.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-04 | Use the team repository as project link | DeliverAI has no portfolio deployment; repo is the authoritative public project entrypoint | `/home/onecode/ECI/DeliverAI` Git remote |
| 2026-09-04 | Use static rendered diagram instead of browser LaTeX | KaTeX/MathJax target math; browser TikZ compilation adds size/security/runtime cost | `main.tex`, `main.pdf`, supplied PNG |
| 2026-09-04 | Add opt-in `imageFit: contain` | Architecture diagram is portrait and text must not be cropped; existing cards retain `cover` | `app/components/project/Card.vue` |

## Validation evidence

- Command: `node --test tests/deliverai-project.test.mjs`
- Result: RED before implementation; GREEN 2/2 after implementation.
- Command: `node --test tests/*.test.mjs`
- Result: 20/20 passing.
- Command: `pnpm type-check`
- Result: passing.
- Command: `pnpm lint:eslint`
- Result: passing with no warnings.
- Command: `pnpm exec biome check app/types/project.ts content.config.ts app/components/project/Card.vue content/en/projects/deliverai.json content/es/projects/deliverai.json tests/deliverai-project.test.mjs`
- Result: passing.
- Command: `pnpm build`
- Result: passing; Nuxt processed both localized project collections and generated `/`, `/en`, `/works` and `/en/works`.
- Command: `curl` SSR smoke against `http://127.0.0.1:4173/works` and `http://127.0.0.1:4173/en/works`
- Result: both return 200; rendered HTML contains DeliverAI, `/projects/deliverai-architecture.png` and `object-contain`.
- Command: `sha256sum public/projects/deliverai-architecture.png /home/onecode/.codex/attachments/fa9aba9f-54ca-4e13-847b-fc23c7507335/image-1.png`
- Result: hashes match.
- Command: `git diff --check`
- Result: passing.

## Progress notes

### 2026-09-04

- Status: done.
- Files read: project contract, frontend architecture, project schema/components, DeliverAI paper source/PDF, DeliverAI README.
- Files changed: focused test, project content, asset, project image-fit contract, task index/record.
- Next step: none.

## Blockers and risks

- Blocker: none.
- Residual risk: supplied PNG is a rendered snapshot of the TikZ diagram; browser does not compile LaTeX at runtime. Browser visual automation was unavailable; SSR/static smoke verified output.
