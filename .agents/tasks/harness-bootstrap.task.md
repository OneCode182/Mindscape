---
id: TASK-HARNESS-BOOTSTRAP
title: Create Mindscape mini-harness
status: done
priority: high
created: 2026-08-20
updated: 2026-08-20
owner: Codex
source_request: User request to abstract TecniPass harness into Mindscape
agent: AGENT-ORCHESTRATOR
skills:
  - tech/openspec-apply-change
architecture:
  - ARCH-FRONTEND
affected_files:
  - AGENTS.md
  - .agents/
references:
  - ../../openspec/changes/add-project-agent-harness/proposal.md
  - ../../openspec/changes/add-project-agent-harness/specs/project-agent-harness/spec.md
  - ../../openspec/changes/add-project-agent-harness/design.md
  - ../../openspec/changes/add-project-agent-harness/tasks.md
---

# Task: Create Mindscape mini-harness

## Outcome

Provide concise English agent navigation, templates, Nuxt architecture guidance, task memory, and explicit local paths under `.agents/`.

## Constraints

- Must keep harness project-local and shallow.
- Must preserve Nuxt/Vue source boundaries.
- Must not copy or modify TecniPass internals or curriculum files.

## Checklist

- [x] Add root and harness navigation.
- [x] Add environment path config and privacy policy.
- [x] Add agents, skills, architecture, and tasks templates/indexes.
- [x] Add Nuxt frontend placement contract.
- [x] Run final inventory, link, JSON, and diff validation.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-08-20 | Keep only project-relevant TecniPass patterns | Avoid multi-repo/provider/Graphify complexity | `design.md` |
| 2026-08-20 | Keep curriculum external and read-only | Prevent accidental personal-data mutation or duplication | `.agents/env.json` |

## Validation evidence

- `jq empty .agents/env.json` → pass.
- Configured `.paths` entries, including `currentCv`, exist → pass.
- Exact expected inventory: 17 harness files → pass.
- Markdown local-link check → pass.
- Template metadata check (`id`, `status`, `created`, `updated`, `references`) → pass.
- `openspec validate add-project-agent-harness --strict` → pass.
- `git diff --check` → pass.

## Progress notes

### 2026-08-20

- Status: done
- Files read: OpenSpec artifacts, `package.json`, `nuxt.config.ts`, TecniPass indexes/templates
- Files changed: `AGENTS.md`, `.agents/`
- Next step: use harness from root `AGENTS.md`; archive OpenSpec change when desired.

## Blockers and risks

- Blocker: none.
- Residual risk: absolute paths are machine-specific; update `.agents/env.json` if repository moves.
