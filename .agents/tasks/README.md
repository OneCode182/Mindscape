# Task Memory

Concise, durable records for meaningful work. Task files are the resume/audit source; Git history remains the change source.

## Lifecycle

`backlog → in-progress → blocked → done` (a blocked task may return to `in-progress`).

## Create

1. Copy [`_template.task.md`](_template.task.md) to `<id>-<slug>.task.md`.
2. Use `TASK-<slug>` ID and fill source request, owner/agent, skills, architecture, affected files, decisions, validation, blockers, and next step.
3. Keep one outcome per task; update `status`, `updated`, and progress notes as work changes.
4. Link task from related agent, skill, and architecture indexes when those artifacts exist.

## Records

| ID | File | Status | Scope |
|---|---|---|---|
| TASK-HARNESS-BOOTSTRAP | [harness-bootstrap.task.md](harness-bootstrap.task.md) | done | Initial harness creation |
| TASK-PR-HARNESS-BOOTSTRAP | [pr-harness-bootstrap.task.md](pr-harness-bootstrap.task.md) | done | PR agents, Git audit, and GitHub CLI flow |

## Resume rule

Read the task first, then only its listed references. A complete task must state validation evidence and residual risk. Do not store secrets or copied personal data.
