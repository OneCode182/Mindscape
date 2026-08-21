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
| Task memory/resume | [tasks/README.md](tasks/README.md) | `tasks/<id>-<slug>.task.md` |

## Rules

- Read area `README.md` before any area artifact.
- Use `_template.*` files; replace placeholders and register new artifacts in the area index.
- Every artifact carries stable ID, status, dates, owner, and references.
- Keep one concern per document. Split and link when navigation becomes slow.
- Treat curriculum paths from `env.json` as external, read-only, task-scoped context.
- Harness describes Mindscape; no TecniPass-specific backend, cloud, graph, or provider machinery.

## Traceability IDs

`AGENT-*`, `ARCH-*`, `SKILL-*`, and `TASK-*`. Link related IDs and repository paths in frontmatter and task notes.

## Curriculum context

Personal/profile information lives at `/home/onecode/Documents/curriculum/`. Current CV: `/home/onecode/Documents/curriculum/cv-2/`. Read only when explicitly relevant; never copy or modify by default.
