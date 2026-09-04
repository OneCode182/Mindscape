# Mindscape Harness Navigation

Compact project memory for agents. Indexes route work; templates define contribution shape.

## Boot contract

1. Read root [`AGENTS.md`](../AGENTS.md).
2. Parse [`env.json`](env.json); resolve configured paths.
3. Select one task-relevant index below.
4. Read that index before any linked artifact; load only linked docs needed for current task.
5. Record meaningful work in [`tasks/README.md`](tasks/README.md).
6. Verify relative links, configured paths, and symlink targets before handoff.

## Directory map

| Directory/file | Purpose | Entry |
|---|---|---|
| [`agents/`](agents/) | Agent role contracts | [`agents/README.md`](agents/README.md) |
| [`architecture/`](architecture/) | Technical placement decisions | [`architecture/README.md`](architecture/README.md) |
| [`skills/`](skills/) | Project, technical, and imported autoskill guidance | [`skills/README.md`](skills/README.md) |
| [`tasks/`](tasks/) | Durable task state and validation evidence | [`tasks/README.md`](tasks/README.md) |
| [`workflows/`](workflows/) | Human-gated repeatable workflows | [`workflows/README.md`](workflows/README.md) |
| [`env.json`](env.json) | Repo, path, GitHub, and privacy config | — |
| [`_template.document.md`](_template.document.md) | Shared document template | — |

## Routing

| Intent | Read first | Output |
|---|---|---|
| Agent role/profile | [`agents/README.md`](agents/README.md) | `agents/<name>.agent.md` |
| Frontend structure/decision | [`architecture/README.md`](architecture/README.md) | `architecture/<topic>.md` |
| Project skill | [`skills/project/README.md`](skills/project/README.md) | `skills/project/<name>/SKILL.md` |
| Technical skill | [`skills/tech/README.md`](skills/tech/README.md) | Local technical skill or runtime skill ID |
| Imported autoskill | [`skills/README.md`](skills/README.md) | `skills/<name>/SKILL.md` |
| Branch comparison, PR audit, or PR description | [`agents/pr-desc-creator.agent.md`](agents/pr-desc-creator.agent.md) | Git evidence and Markdown output |
| Create or update GitHub PR | [`agents/pr-creator.agent.md`](agents/pr-creator.agent.md) | Human-approved `gh` action |
| Human-gated PR lifecycle | [`workflows/README.md`](workflows/README.md) | Paused evidence at each gate |
| Task memory/resume | [`tasks/README.md`](tasks/README.md) | `tasks/<id>-<slug>.task.md` |

## Editable source rules

- Harness indexes, contracts, templates, profiles, architecture docs, workflows, and task records are editable in `.agents/`.
- Imported autoskills under `skills/<name>/` are source snapshots; preserve generated content and `skills-lock.json` hashes unless skill update is requested.
- `.claude/skills/<name>` is a symlink mirror. Edit `skills/<name>/` source; do not replace symlinks with copied directories.
- Runtime-provided skills listed in agent profiles may have no repository file. Load them from the agent skill catalog when no local path exists.

## Rules

- Read area `README.md` before any area artifact.
- Use `_template.*` files; replace placeholders and register new artifacts in area index.
- Every harness-authored artifact carries stable ID, status, dates, owner, and references.
- Keep one concern per document. Split and link when navigation becomes slow.
- Treat curriculum paths from `env.json` as external, read-only, task-scoped context.
- Harness describes Mindscape; no TecniPass-specific backend, cloud, graph, or provider machinery.
- PR agents may inspect Git and use `gh`, but GitHub mutations require explicit human approval.
- PR agents must not merge, close, comment, rewrite history, or expose credentials.

## Traceability IDs

`AGENT-*`, `ARCH-*`, `SKILL-*`, `TASK-*`, and `WORKFLOW-*`. Link related IDs and repository paths in frontmatter and task notes.

## Curriculum context

Personal/profile information lives at `/home/onecode/Documents/curriculum/`. Current CV: `/home/onecode/Documents/curriculum/cv-2/`. Read only when explicitly relevant; never copy or modify by default.
