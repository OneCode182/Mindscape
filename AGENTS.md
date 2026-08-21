# Mindscape Agent Contract

Project entry point for coding agents. Keep guidance short, scoped, and traceable.

## Boot

1. Read this file.
2. Read [.agents/AGENTS.md](.agents/AGENTS.md).
3. Parse [.agents/env.json](.agents/env.json); verify paths before use.
4. Load only one task-relevant index and its linked documents.
5. Record meaningful work in `.agents/tasks/`.

## Authority

1. Current human request
2. This contract
3. `.agents/architecture/` for technical placement
4. `.agents/skills/` for execution guidance
5. `.agents/tasks/` for active work state
6. Source code and tests as implementation evidence

When sources conflict, stop and record the conflict in the active task.

## Project facts

- Frontend: Nuxt 4, Vue 3, TypeScript, Nuxt UI, Nuxt Content, i18n.
- Runtime areas: `app/`, `server/`, `content/`, `i18n/`, `public/`.
- Frontend placement authority: [.agents/architecture/frontend.md](.agents/architecture/frontend.md).

## Routing

| Work | Read first |
|---|---|
| Route, component, composable, utility, server, or style | `.agents/architecture/frontend.md` |
| New project skill | `.agents/skills/project/README.md` |
| New technical skill | `.agents/skills/tech/README.md` |
| New agent profile | `.agents/agents/README.md` |
| New, resumed, or completed task | `.agents/tasks/README.md` |
| Curriculum/profile context | `.agents/env.json`; read external CV only when task-relevant |

## Guardrails

- Keep changes inside requested scope; do not copy TecniPass harness internals wholesale.
- Do not edit, commit, or publish files under `/home/onecode/Documents/curriculum/`.
- Never place secrets in `.agents/env.json` or Markdown.
- Use templates, stable IDs, references, validation evidence, and concise English docs.
- Run proportionate checks; report skipped checks and residual risks.
