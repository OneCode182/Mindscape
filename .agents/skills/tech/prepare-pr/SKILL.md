---
id: SKILL-TECH-PREPARE-PR
name: prepare-pr
description: Run safe PR readiness checks without rewriting commits or pushing changes.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - git-repo-exploration/SKILL.md
  - git-branch-comparison/SKILL.md
  - create-pull-request/SKILL.md
---

# Technical Skill: Prepare PR

## When to use

Use before the GitHub mutation gate to detect missing refs, dirty state, failed project checks, or unresolved audit findings.

## Procedure

1. Confirm current branch is intended head and is not `main`, `dev`, or selected base.
2. Confirm merge-base and exact changed-file inventory.
3. Run only repository checks explicitly requested or listed by project scripts; capture command output.
4. Check required review findings and description validation.
5. Present readiness, blockers, and residual risks for human approval.

## Output

Readiness report: repository, base/head, dirty state, checks, findings, blockers, and whether push/PR mutation may proceed.

## Boundaries

No amend, squash, rebase, reset, merge, force-push, `gh pr merge`, or product-code fix. A separate approved task owns fixes.

## Traceability

- Related agents: `AGENT-PR-DESC-CREATOR`, `AGENT-PR-CREATOR`
- Related skill: `SKILL-TECH-CREATE-PULL-REQUEST`
- Validation: command output for every claimed check
