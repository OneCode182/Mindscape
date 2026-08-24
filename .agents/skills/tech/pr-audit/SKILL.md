---
id: SKILL-TECH-PR-AUDIT
name: pr-audit
description: Audit every changed commit and file for defects, regressions, security, architecture, and test gaps.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - ../../../architecture/frontend.md
  - git-branch-comparison/SKILL.md
---

# Technical Skill: Pull Request Audit

## When to use

Use after exact branch comparison and before PR description or GitHub mutation.

## Procedure

1. Read the complete committed patch and commit sequence; inspect every changed file, not only the stat.
2. Classify each change as feature, fix, refactor, test, docs, configuration, or generated output.
3. For every finding, record stable ID, severity (`P0`–`P3`), file/line or commit evidence, defect mechanism, user/business impact, mitigation, and validation scenario.
4. Check architecture placement, dependency direction, security boundaries, error handling, performance, accessibility, and regression/test coverage as applicable.
5. Separate confirmed findings, residual risks, and unexecuted test gaps. Never infer business rules without repository evidence.

## Output

Provide verdict, finding table, covered files, checks run, deferred items, and residual risks. Read-only audit must not alter product code or Git history.

## Boundaries

No broad cleanup. No fixes, commits, comments, merge, push, or PR mutation. Fixes require a separate explicitly authorized implementation task.

## Traceability

- Related agents: `AGENT-PR-DESC-CREATOR`, `AGENT-PR-CREATOR`
- Related skill: `SKILL-TECH-GIT-BRANCH-COMPARISON`
- Validation: finding evidence links to exact diff paths and commands
