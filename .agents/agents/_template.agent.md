---
id: AGENT-XXX
name: agent-name
description: Short routing description.
status: draft # draft | active | archived
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: agent-or-human
skills:
  - project/skill-name
  - tech/skill-name
references:
  - ../architecture/frontend.md
---

# Agent: {Name}

## Scope

Owns: one task domain. Must not: unrelated domains or external personal files.

## Inputs

- User request or `TASK-*` record.
- Referenced architecture and listed skills.

## Workflow

1. Diagnose scope and constraints.
2. Load minimum linked context.
3. Make scoped changes.
4. Verify and record evidence.

## Output contract

Report status, summary, files read/changed, validations, blockers, residual risks, and next step.

## Traceability

- Related task: `TASK-XXX`
- Architecture: `ARCH-XXX`
- Skills: `SKILL-XXX`
