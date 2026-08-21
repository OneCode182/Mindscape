---
id: TASK-PR-HARNESS-BOOTSTRAP
title: Add Git and GitHub PR agents to Mindscape harness
status: done
priority: high
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
source_request: User requested the two AGENT-PR profiles from TecniPass with Git exploration, branch comparison, audit, PR description, gh access, and PR creation/update.
agent: AGENT-ORCHESTRATOR
skills:
  - tech/git-repo-exploration
  - tech/git-branch-comparison
  - tech/pr-audit
  - tech/pr-description-generator
  - tech/create-pull-request
architecture: []
affected_files:
  - AGENTS.md
  - .agents/AGENTS.md
  - .agents/env.json
  - .agents/agents/
  - .agents/skills/tech/
  - .agents/workflows/
references:
  - /home/onecode/tecni/AgentsAI/.tecnipass/agents/AGENT-PR-CREATOR/AGENTS.md
  - /home/onecode/tecni/AgentsAI/.tecnipass/agents/AGENT-PR-DESC-CREATOR/AGENT.md
  - /home/onecode/tecni/AgentsAI/.tecnipass/workflows/github-pr-human-loop.workflow.md
  - /home/onecode/tecni/AgentsAI/.tecnipass/tools/tecnipass-git-diff/tecnipass-git-diff.md
---

# Task: Add Git and GitHub PR agents

## Outcome

Mindscape contains exactly two PR agents with source-traceable Git audit, branch comparison, description generation, and human-gated `gh` PR create/update behavior.

## Constraints

- Must do: preserve source capabilities; adapt paths/defaults to Mindscape; document every dependency in English.
- Must not do: copy TecniPass internals wholesale; copy credentials; mutate source harness or curriculum; auto-mutate GitHub.

## Checklist

- [x] Add `AGENT-PR-DESC-CREATOR` profile.
- [x] Add `AGENT-PR-CREATOR` profile.
- [x] Add Git exploration, branch comparison, audit, description, quality, readiness, and `gh` skills.
- [x] Add human-gated PR workflow.
- [x] Register profiles and skills in indexes.
- [x] Validate JSON, links, metadata, and capability coverage.

## Decisions

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-08-20 | Use two flat target profiles with exact source IDs. | Matches Mindscape registry while preserving `AGENT-PR-*` identity. | `.agents/agents/README.md` |
| 2026-08-20 | Default base is `origin/dev`; GitHub base is `dev`. | Matches current Mindscape branch topology. | `.agents/env.json`, `git branch --all` |
| 2026-08-20 | Require explicit approval before push or `gh` mutation. | Prevents unexpected external state changes. | `github-pr-human-loop.workflow.md` |
| 2026-08-20 | Use `gh auth status`; no copied vars/password file. | Auth remains local; harness stores no credentials. | `create-pull-request/SKILL.md` |

## Validation evidence

- `jq empty .agents/env.json`: pass.
- `gh --version`: `/usr/bin/gh`, version 2.97.0 observed.
- Capability scan: pass; Git exploration, merge-base/diff comparison, audit, `sumAll`, `gh auth status`, `gh pr view`, `gh pr create`, `gh pr edit`, and human-approval gates present.
- Markdown/link scan: pass; local links, target frontmatter, and whitespace validated.

## Progress notes

### 2026-08-20

- Status: done; copied/adapted two PR profiles and supporting contracts.
- Files read: both source `AGENT-PR-*` profiles, PR skills, PR workflow, Git diff helper docs, target harness indexes.
- Files changed: root routing, env config, two agents, eight tech skills, PR workflow, task registry.
- Next step: use `AGENT-PR-DESC-CREATOR` for read-only audit/description or `AGENT-PR-CREATOR` after explicit GitHub approval.

## Blockers and risks

- Blocker: none.
- Residual risk: `gh` auth and remote permissions depend on local operator; no GitHub mutation was run during bootstrap.
