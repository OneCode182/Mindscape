---
id: SKILL-TECH-PR-DESCRIPTION-GENERATOR
name: pr-description-generator
description: Write exact, line-accounted PR Markdown with before/after narrative and file-level details.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - generate-pr-description/SKILL.md
  - pr-quality-controls/SKILL.md
  - ../../../env.json
---

# Technical Skill: PR Description Generator

## Inputs

- Repository and current branch.
- Base ref, default `origin/dev`.
- Output path, default `.local/pr-description.md`.
- Exact branch diff plus separate dirty-worktree evidence.

## Procedure

1. Resolve repo, base, head, and merge-base. Use local refs; fetch only when explicitly requested.
2. Capture status, commit log, name-status, numstat, stat, and complete `--find-renames` patch.
3. For each changed file, calculate:
   - Added file: `added=raw_added`, `deleted=0`, `modified=0`.
   - Deleted file: `added=0`, `deleted=raw_deleted`, `modified=0`.
   - Modified/renamed/copied: `modified=min(raw_added, raw_deleted)`; remaining lines become added/deleted.
   - Binary: zero line counts; note `binary/no line count`.
4. Reconcile `sumAll.added`, `sumAll.deleted`, and `sumAll.modified` to every row.
5. Write Markdown with `# PR Description`, `## Summary`, `## Changes`, `## Diff Before / After`, `## sumAll`, collapsible `## Details`, `## Verification`, `## Notes`, and `## Quality Controls`.
6. Check output is non-empty; reject `Co-authored-by:`; report dirty/untracked state and skipped checks.

## Output

Review-ready English Markdown. Keep it short; mention meaningful files, risks, evidence, and exact totals.

## Boundaries

May write only requested Markdown output. No GitHub PR creation, push, commit, merge, rebase, reset, comment, or product-code mutation.

## Traceability

- Related agent: `AGENT-PR-DESC-CREATOR`
- Related skills: `SKILL-TECH-GENERATE-PR-DESCRIPTION`, `SKILL-TECH-PR-QUALITY-CONTROLS`
- Validation: `test -s <output>` plus reconciliation check
