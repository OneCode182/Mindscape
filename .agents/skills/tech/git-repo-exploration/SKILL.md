---
id: SKILL-TECH-GIT-REPO-EXPLORATION
name: git-repo-exploration
description: Inspect repository state, history, remotes, and worktree evidence without changing Git state.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - ../../../AGENTS.md
  - ../../../env.json
---

# Technical Skill: Git Repository Exploration

## When to use

Use before branch comparison, review, PR description, or any task needing trustworthy repository context.

## Procedure

1. Resolve the repository without changing directories permanently:

   ```sh
   git rev-parse --show-toplevel
   git rev-parse --is-inside-work-tree
   ```

2. Capture current state:

   ```sh
   git status --short --branch
   git branch --show-current
   git remote -v
   git branch --all --no-color
   ```

3. Inspect history and local worktree evidence:

   ```sh
   git log -n 10 --oneline --decorate
   git diff --name-status
   git diff --numstat
   git diff --cached --name-status
   git diff --cached --numstat
   git ls-files --others --exclude-standard
   ```

4. Keep committed, staged, unstaged, and untracked changes separate in every report.

## Output

Report repository root, current branch, remotes, dirty-state classification, recent history, changed paths, and skipped checks.

## Boundaries

Read-only. Do not checkout, stash, reset, clean, commit, pull, fetch, push, or rewrite history unless another approved workflow explicitly authorizes it.

## Traceability

- Related agents: `AGENT-PR-DESC-CREATOR`, `AGENT-PR-CREATOR`
- Related workflow: `WORKFLOW-PR-HUMAN-LOOP`
- Validation: command output from listed Git queries
