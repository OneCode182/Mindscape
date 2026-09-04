# Mindscape Agent Contract

Project entry point for coding agents. Keep guidance scoped, traceable, and navigable.

## Boot

1. Read this file.
2. Read [.agents/AGENTS.md](.agents/AGENTS.md).
3. Parse [.agents/env.json](.agents/env.json); verify configured paths before use.
4. Select one task-relevant index from the routing table; load only that index and linked docs.
5. Record meaningful work in [.agents/tasks/README.md](.agents/tasks/README.md) using its template.
6. Validate local links and paths before handoff.

## Context map

| Path | Role | Entry point |
|---|---|---|
| `.agents/AGENTS.md` | Harness boot, routing, boundaries | [Harness navigation](.agents/AGENTS.md) |
| `.agents/env.json` | Repo, harness, base-ref, and privacy config | [Environment config](.agents/env.json) |
| `.agents/agents/` | Agent role contracts | [Agent profiles](.agents/agents/README.md) |
| `.agents/architecture/` | Technical placement decisions | [Architecture index](.agents/architecture/README.md) |
| `.agents/skills/` | Project, technical, and imported autoskill guidance | [Skills index](.agents/skills/README.md) |
| `.agents/tasks/` | Durable task state and validation evidence | [Task index](.agents/tasks/README.md) |
| `.agents/workflows/` | Human-gated repeatable workflows | [Workflow index](.agents/workflows/README.md) |
| `.claude/skills/` | Claude-compatible symlink mirror | Edit source under `.agents/skills/` |
| `skills-lock.json` | Autoskills registry sources and integrity hashes | [Autoskills lockfile](skills-lock.json) |

## Authority

1. Current human request
2. This contract
3. `.agents/AGENTS.md` for harness navigation and boundaries
4. `.agents/architecture/` for technical placement
5. `.agents/skills/` for execution guidance
6. `.agents/tasks/` for active work state
7. Source code and tests as implementation evidence

When sources conflict, stop and record conflict in active task.

## Project facts

- Frontend: Nuxt 4, Vue 3, TypeScript, Nuxt UI, Nuxt Content, i18n.
- Runtime areas: `app/`, `server/`, `content/`, `i18n/`, `public/`.
- Frontend placement authority: [.agents/architecture/frontend.md](.agents/architecture/frontend.md).
- Imported autoskills live at `.agents/skills/<skill-name>/`; registry metadata lives in `skills-lock.json`.
- `.claude/skills/<skill-name>` must remain symlink to matching `.agents/skills/<skill-name>`.

## Routing

| Work | Read first | Then load |
|---|---|---|
| Route, component, composable, utility, server, or style | `.agents/architecture/README.md` | `.agents/architecture/frontend.md` |
| Project skill | `.agents/skills/project/README.md` | Selected project skill |
| Technical or imported autoskill | `.agents/skills/README.md` | `.agents/skills/tech/README.md` or `.agents/skills/<name>/SKILL.md` |
| New agent profile | `.agents/agents/README.md` | Selected `*.agent.md` |
| Branch comparison, PR audit, or PR description | `.agents/agents/pr-desc-creator.agent.md` | Linked workflow and runtime skills |
| Create or update GitHub PR | `.agents/agents/pr-creator.agent.md` | Linked workflow and runtime skills |
| Human-gated PR lifecycle | `.agents/workflows/README.md` | `.agents/workflows/github-pr-human-loop.workflow.md` |
| New, resumed, or completed task | `.agents/tasks/README.md` | Selected `*.task.md` |
| Curriculum/profile context | `.agents/env.json` | External CV only when task-relevant |

## Editable source rules

- Harness docs and indexes are editable in `.agents/`.
- Imported autoskill payloads are source-controlled snapshots; preserve content and lock hashes unless user requests skill changes.
- Edit `.agents/skills/<skill-name>/` when changing an imported skill; never replace `.claude/skills/<skill-name>` symlink with copied content.
- Resolve relative links from the file containing them. Missing upstream companion references must not be treated as local harness paths.

## Guardrails

- Keep changes inside requested scope; do not copy TecniPass harness internals wholesale.
- Do not edit, commit, or publish files under `/home/onecode/Documents/curriculum/`.
- Never place secrets in `.agents/env.json` or Markdown.
- PR work must use Git evidence, `gh` CLI, and explicit human approval before push or PR mutation.
- Never merge, close, comment, force-push, or rewrite history through PR agents.
- Use templates, stable IDs, references, validation evidence, and concise English docs.
- Run proportionate checks; report skipped checks and residual risks.
