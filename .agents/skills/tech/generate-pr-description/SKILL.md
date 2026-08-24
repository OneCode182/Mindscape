---
id: SKILL-TECH-GENERATE-PR-DESCRIPTION
name: generate-pr-description
description: Synthesize concise business-readable PR Markdown from exact Git history and diff evidence.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - pr-description-generator/SKILL.md
  - pr-quality-controls/SKILL.md
  - git-branch-comparison/SKILL.md
---

# Technical Skill: Generate PR Description

## When to use

Use after branch comparison and audit when a concise review-ready PR body is needed.

## Procedure

1. Use exact merge-base evidence; inspect complete patch with `git diff --find-renames`.
2. Synthesize business objective, before/after behavior, meaningful change groups, affected files, risk, verification, and review findings.
3. Use tables/bullets; never paste raw Git logs or raw patches.
4. Include `## Quality Controls` from `pr-quality-controls` with evidence-based statuses.
5. Write only requested Markdown output; default path comes from `MINDSCAPE_PR_DESCRIPTION_OUTPUT`.

## Output

English, concise, scannable Markdown. Include base, branch, scope, state, changes, before/after, exact `sumAll`, collapsible per-file details, verification, notes, and quality controls.

## Boundaries

Read-only for source/Git history. No push, `gh`, commit, comment, merge, rebase, formatting, or product-code mutation.

## Traceability

- Related agents: `AGENT-PR-DESC-CREATOR`, `AGENT-PR-CREATOR`
- Related skills: `SKILL-TECH-PR-AUDIT`, `SKILL-TECH-PR-DESCRIPTION-GENERATOR`, `SKILL-TECH-PR-QUALITY-CONTROLS`
- Validation: output is non-empty and reconciles file rows to `sumAll`
