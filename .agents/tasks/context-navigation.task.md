---
id: TASK-CONTEXT-NAVIGATION
title: Update agent context navigation
status: done
priority: medium
created: 2026-09-03
updated: 2026-09-03
owner: Codex
source_request: User request to update root AGENTS.md and .agents/ context for autoskills navigation
agent: AGENT-ORCHESTRATOR
skills:
  - tech/git-repo-exploration
architecture: []
affected_files:
  - AGENTS.md
  - .agents/AGENTS.md
  - .agents/agents/README.md
  - .agents/architecture/README.md
  - .agents/skills/README.md
  - .agents/skills/tech/README.md
  - .agents/tasks/README.md
  - .agents/tasks/context-navigation.task.md
  - .agents/workflows/README.md
references:
  - .agents/env.json
  - skills-lock.json
---

# Task: Update agent context navigation

## Outcome

Root and harness context route agents to all `.agents/` areas, imported autoskills, runtime skills, and Claude symlink sources.

## Constraints

- Must keep imported autoskill snapshots and lock hashes unchanged.
- Must keep `.claude/skills/` symlinks pointing to `.agents/skills/`.
- Must not edit curriculum files.
- Must not claim upstream companion refs are local when not vendored.

## Checklist

- [x] Update root `AGENTS.md` context map and routing.
- [x] Update `.agents/AGENTS.md` directory map, routing, and editable-source rules.
- [x] Register imported autoskills and runtime skill resolution.
- [x] Validate links, configured paths, lock entries, symlinks, and Git state.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-09-03 | Keep autoskill snapshots at `.agents/skills/<name>/` | Matches current `npx autoskills` layout and preserves lock hashes | `skills-lock.json` |
| 2026-09-03 | Treat `.claude/skills/<name>` as symlink mirror | One editable source prevents drift between agent integrations | `find .claude/skills -type l` |
| 2026-09-03 | Separate local paths from runtime skill IDs | Existing PR profiles reference skills not vendored in repo | `.agents/agents/*.agent.md`, `.agents/skills/tech/README.md` |

## Validation evidence

- `harness markdown links` check over root and all harness indexes → pass.
- `env.json` configured path existence check → pass.
- `skills-lock.json` 7 entries ↔ 7 source dirs, `SKILL.md` files, and `.claude/skills/` symlinks → pass.
- `.claude/` symlink target check → pass.
- `git diff --check` for current docs changes → pass.
- Imported autoskill snapshots and `skills-lock.json` unchanged → pass.

## Progress notes

### 2026-09-03

- Status: done
- Files read: root and harness contracts, all area indexes, agent profiles, architecture doc, PR workflow, task template, autoskill headers
- Files changed: root `AGENTS.md`, `.agents/AGENTS.md`, area indexes, task record
- Next step: handoff after local commit; no remote mutation

## Blockers and risks

- Blocker: none.
- Residual risk: imported upstream skills may link to companion skills not vendored in this repository; preserve snapshots unless explicitly updating skills.
