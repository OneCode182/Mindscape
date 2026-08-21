---
id: WORKFLOW-PR-HUMAN-LOOP
name: github-pr-human-loop
description: Compare, audit, describe, and create or update a GitHub PR with explicit approval gates.
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
agents:
  - AGENT-PR-DESC-CREATOR
  - AGENT-PR-CREATOR
skills:
  - tech/git-repo-exploration
  - tech/git-branch-comparison
  - tech/pr-audit
  - tech/pr-description-generator
  - tech/create-pull-request
references:
  - ../env.json
  - ../tasks/pr-harness-bootstrap.task.md
---

# GitHub PR Human-in-the-Loop

## Defaults

- Repository: `MINDSCAPE_REPO` from `env.json`.
- Base ref: `MINDSCAPE_DEFAULT_BASE_REF` (`origin/dev`).
- Base branch for `gh`: `MINDSCAPE_DEFAULT_BASE_BRANCH` (`dev`).
- Description: `MINDSCAPE_PR_DESCRIPTION_OUTPUT` (`.local/pr-description.md`).
- Head: current checked-out branch; never infer another branch.

## Ordered steps

1. **Preflight:** resolve repository, base, head, output, dirty state, and task scope. Block on missing refs.
2. **Compare:** collect merge-base, ahead/behind commits, complete diff, changed files, and line totals. No checkout, stash, pull, or rewrite.
3. **Audit:** inspect every changed file and commit. Report finding ID, severity, evidence, impact, mitigation, and test gap.
4. **Describe:** write concise English Markdown with before/after, exact `sumAll`, file details, verification, risks, and quality controls. No `gh` mutation.
5. **Approve:** show planned GitHub action, target base/head, title, body path, and push requirement. Stop until human says continue.
6. **Mutate:** verify `gh auth status`; inspect existing PR; update body or create PR with `gh`. Push only current head with explicit approval and `git push -u origin <head>`; never force.

## Pause contract

After steps 1–4, emit:

```md
PR_STEP_RESULT:
- Step: 1 | 2 | 3 | 4
- Status: completed | blocked | partial
- Evidence:
- Findings:
- Artifacts:
- Risks:
- Next decision: correct | continue | stop
```

`continue` requires passing criteria or explicit acceptance of residual risks. `correct` reruns current step. `stop` preserves artifacts and performs no GitHub mutation.

## Mutation rules

- Existing PR with correct base: `gh pr edit <number> --body-file <path>`.
- No PR: `gh pr create --base <base> --head <head> --title <title> --body-file <path>`.
- Never merge, close, comment, change reviewers/labels, amend, rebase, reset, or force-push.

## Completion

Report repository, base, head, PR URL/action, description path, commit range, review findings, validations, blockers, and residual risks.
