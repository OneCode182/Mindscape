# Workflows

Human-gated sequences for repeatable multi-step work. Workflows route agents; they do not replace agent contracts.

## Navigation

| Workflow | Trigger | Output |
|---|---|---|
| [github-pr-human-loop.workflow.md](github-pr-human-loop.workflow.md) | Compare, audit, describe, create/update a PR | Paused evidence at each gate |

## Create

1. Copy [`_template.workflow.md`](_template.workflow.md).
2. Define inputs, ordered steps, pause points, mutation gates, and output.
3. Link agents, skills, task records, and validation commands.

## Boundary

Workflows must preserve explicit approvals for irreversible or external mutations.
