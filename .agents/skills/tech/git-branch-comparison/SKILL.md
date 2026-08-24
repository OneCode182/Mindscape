---
id: SKILL-TECH-GIT-BRANCH-COMPARISON
name: git-branch-comparison
description: Compare a head ref with an exact base ref using merge-base, commit, file, and line evidence.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - ../../../env.json
  - git-repo-exploration/SKILL.md
---

# Technical Skill: Git Branch Comparison

## When to use

Use for branch audits, release review, PR descriptions, or before any PR mutation.

## Inputs

- `BASE_REF`: requested base; default `origin/dev` from `env.json`.
- `HEAD_REF`: current branch/commit; default `HEAD`.
- `REPO`: repository resolved from `MINDSCAPE_REPO`.

## Procedure

1. Verify refs and derive the common ancestor:

   ```sh
   git rev-parse --verify "$BASE_REF"
   git rev-parse --verify "$HEAD_REF"
   MERGE_BASE="$(git merge-base "$BASE_REF" "$HEAD_REF")"
   ```

2. Report topology:

   ```sh
   git rev-list --left-right --count "$BASE_REF...$HEAD_REF"
   git log --left-right --cherry-pick --oneline "$BASE_REF...$HEAD_REF"
   git log --oneline --decorate "$MERGE_BASE..$HEAD_REF"
   ```

3. Report complete committed impact:

   ```sh
   git diff --find-renames --name-status "$MERGE_BASE...$HEAD_REF"
   git diff --find-renames --numstat "$MERGE_BASE...$HEAD_REF"
   git diff --find-renames --stat "$MERGE_BASE...$HEAD_REF"
   git diff --find-renames "$MERGE_BASE...$HEAD_REF" -- <focused-path>
   ```

4. Capture current worktree separately with `git-repo-exploration`. Never mix untracked or dirty changes into the committed range silently.

## Output

Return base/head refs, merge-base SHA, ahead/behind counts, commit list, changed files, line totals, and dirty-worktree state.

## Boundaries

Do not infer a base branch, checkout refs, run `git pull`, or hide stale/missing refs. Remote refresh requires explicit workflow scope; use `git fetch --all --prune` only when authorized.

## Traceability

- Related agents: `AGENT-PR-DESC-CREATOR`, `AGENT-PR-CREATOR`
- Related skill: `SKILL-TECH-GIT-REPO-EXPLORATION`
- Validation: merge-base and diff command output
