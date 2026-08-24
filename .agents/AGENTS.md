# Mindscape Harness Navigation

Compact project memory for agents. Indexes route work; templates define contribution shape.

## Boot contract

Read `.agents/env.json`, resolve paths, then load only needed context:

| Intent | Entry | Output |
|---|---|---|
| Agent role/profile | [agents/README.md](agents/README.md) | `agents/<name>.agent.md` |
| Frontend structure/decision | [architecture/README.md](architecture/README.md) | `architecture/<topic>.md` |
| Project skill | [skills/project/README.md](skills/project/README.md) | `skills/project/<name>/SKILL.md` |
| Tool/language/framework skill | [skills/tech/README.md](skills/tech/README.md) | `skills/tech/<name>/SKILL.md` |
| Branch comparison, PR audit, or PR description | [agents/pr-desc-creator.agent.md](agents/pr-desc-creator.agent.md) | Git evidence and Markdown output |
| Create or update GitHub PR | [agents/pr-creator.agent.md](agents/pr-creator.agent.md) | Human-approved `gh` action |
| Human-gated PR lifecycle | [workflows/github-pr-human-loop.workflow.md](workflows/github-pr-human-loop.workflow.md) | Paused evidence at each gate |
| Task memory/resume | [tasks/README.md](tasks/README.md) | `tasks/<id>-<slug>.task.md` |

## Rules

- Read area `README.md` before any area artifact.
- Use `_template.*` files; replace placeholders and register new artifacts in the area index.
- Every artifact carries stable ID, status, dates, owner, and references.
- Keep one concern per document. Split and link when navigation becomes slow.
- Treat curriculum paths from `env.json` as external, read-only, task-scoped context.
- Harness describes Mindscape; no TecniPass-specific backend, cloud, graph, or provider machinery.
- PR agents may inspect Git and use `gh`, but GitHub mutations require explicit human approval.
- PR agents must not merge, close, comment, rewrite history, or expose credentials.

## Traceability IDs

`AGENT-*`, `ARCH-*`, `SKILL-*`, `TASK-*`, and `WORKFLOW-*`. Link related IDs and repository paths in frontmatter and task notes.

## Curriculum context

Personal/profile information lives at `/home/onecode/Documents/curriculum/`. Current CV: `/home/onecode/Documents/curriculum/cv-2/`. Read only when explicitly relevant; never copy or modify by default.
