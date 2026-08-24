---
id: SKILL-TECH-CREATE-PULL-REQUEST
name: create-pull-request
description: Use GitHub CLI to inspect, create, or update a PR after explicit human approval.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - ../../../env.json
  - prepare-pr/SKILL.md
  - ../../../workflows/github-pr-human-loop.workflow.md
---

# Technical Skill: Create or Update Pull Request

## When to use

Use only after Git evidence, audit, description, readiness, and explicit human approval are complete.

## Procedure

1. Verify CLI and authentication:

   ```sh
   command -v gh
   gh auth status
   ```

2. Resolve current branch and inspect existing PR:

   ```sh
   CURRENT_BRANCH="$(git branch --show-current)"
   gh pr view --head "$CURRENT_BRANCH" --json number,url,title,baseRefName,headRefName,state
   ```

3. Confirm planned base, head, title, body path, and whether branch is published. Stop if current branch is empty, `main`, `dev`, or selected base.
4. If an existing PR targets the approved base, update body only:

   ```sh
   gh pr edit <number> --body-file <description-path>
   ```

5. If no PR exists, publish only the intended current head after separate approval:

   ```sh
   git push -u origin "$CURRENT_BRANCH"
   gh pr create --base <base-branch> --head "$CURRENT_BRANCH" --title <title> --body-file <description-path>
   ```

6. Report URL, number, title, base, head, body path, commit range, and command outcomes.

## Safety

- `gh` is the only GitHub interface; do not use browser or hidden API calls.
- Never force-push, merge, close, comment, modify reviewers/labels, amend, rebase, reset, or hide dirty state.
- Never print, persist, or request passwords/tokens in harness files. `gh auth status` is evidence only.
- If existing PR base differs, stop and ask; do not retarget silently.

## Traceability

- Related agents: `AGENT-PR-CREATOR`, `AGENT-PR-DESC-CREATOR`
- Related workflow: `WORKFLOW-PR-HUMAN-LOOP`
- Validation: `gh auth status`, `gh pr view`, and final PR response
