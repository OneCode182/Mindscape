---
id: WORKFLOW-XXX
name: workflow-name
description: Short routing description.
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: agent-or-human
agents:
  - AGENT-XXX
skills:
  - SKILL-TECH-XXX
references:
  - ../tasks/TASK-XXX
---

# Workflow: {Name}

## Inputs

- Request, repository, refs, and approval scope.

## Steps

1. Preflight and resolve context.
2. Execute read-only evidence work.
3. Pause before any external mutation.

## Output and traceability

- Report status, evidence, artifacts, blockers, and residual risks.
- Related task: `TASK-XXX`
