## Context

Mindscape is a Nuxt 4/Vue 3 portfolio with source split across `app/`, `server/`, `content/`, `i18n/`, and `public/`. It has no agent instructions or task-memory layer. TecniPass offers useful index/template/traceability patterns, but its multi-repository, backend, infrastructure, Graphify, and orchestration machinery exceeds this project's needs. See `proposal.md` and `specs/project-agent-harness/spec.md`.

## Goals / Non-Goals

**Goals:**

- Create a small, self-contained harness with deterministic navigation.
- Describe current Nuxt placement rules, not generic or TecniPass-specific architecture.
- Make every managed area documented, templated, and traceable.
- Keep external curriculum paths discoverable but read-only by default.

**Non-Goals:**

- Copy TecniPass agents, skills, generated graphs, histories, or provider config.
- Change Mindscape runtime code, dependencies, content, or deployment.
- Build automated task databases, agent orchestration, or skill installation.

## Decisions

### 1. Use a shallow project-local tree

Create this inventory:

```text
AGENTS.md
.agents/
├── AGENTS.md
├── _template.document.md
├── env.json
├── agents/
│   ├── README.md
│   └── _template.agent.md
├── architecture/
│   ├── README.md
│   ├── _template.architecture.md
│   └── frontend.md
├── skills/
│   ├── README.md
│   ├── _template.skill.md
│   ├── project/
│   │   ├── README.md
│   │   └── _template.skill.md
│   └── tech/
│       ├── README.md
│       └── _template.skill.md
└── tasks/
    ├── README.md
    ├── _template.task.md
    └── harness-bootstrap.task.md
```

Each functional directory owns its index and template. Root `_template.document.md` covers future top-level harness documents. Alternative rejected: cloning `.tecnipass`; too broad, project-specific, and costly to navigate.

### 2. Use indexes as routers

Root `AGENTS.md` defines authority and boot order. `.agents/AGENTS.md` maps task intent to one area/file. Area `README.md` files define ownership, naming, template use, and registration. Agents MUST load indexes first and avoid broad directory reads. Alternative rejected: one monolithic guide; conflicts with concise/modular rule.

### 3. Use portable Markdown metadata

Templates use YAML frontmatter with stable IDs and explicit `created`, `updated`, `status`, and `references` fields. Tasks additionally link source request, agent, skills, architecture, files, decisions, and validation. Alternative rejected: custom database; unnecessary tooling and weak portability.

### 4. Encode current Nuxt boundaries

`architecture/frontend.md` maps:

- `app/pages/` → file-based route entry components; keep orchestration thin.
- `app/layouts/` → reusable route shells.
- `app/components/<feature>/` → feature UI; `app/components/` root → truly shared primitives.
- `app/composables/` → reusable reactive/stateful Vue composition logic named `use*.ts`.
- `app/utils/` → pure functions and algorithms with no Vue/runtime state.
- `app/assets/` → bundled styles and source assets; `public/` → URL-stable static assets.
- `server/api/` → API handlers; `server/routes/` → non-API server routes; `server/utils/` or `server/services/` → extracted server-only logic when introduced.
- `content/` → localized authored content; `i18n/` → interface messages and locale configuration.
- colocated `*.test.ts` for focused units and root `tests/` for cross-feature/e2e suites when introduced.

Alternative rejected: importing TecniPass's Remix/React layout; it contradicts repository reality.

### 5. Keep path config explicit and non-secret

`env.json` uses absolute local paths and a small privacy policy. It includes repository/harness/area paths plus `curriculumRoot` and `currentCv`. It contains no tokens or `.env` values. Agents verify paths before use and treat curriculum as external, task-scoped, read-only context. Alternative rejected: shell-only variables; less discoverable across agent runtimes.

## Risks / Trade-offs

- [Absolute paths reduce portability] → Keep all machine-specific values centralized in `env.json`; document updating that file after relocation.
- [Docs can drift from source layout] → Require architecture `updated` metadata and task references when structure changes.
- [Task memory can become noisy] → One compact file per meaningful task; archive policy documented in tasks index.
- [Personal data could be over-read or copied] → Read only when request needs it; never modify/copy/publish by default.
- [Templates may be mistaken for active artifacts] → Prefix templates with `_template` and document copy/rename flow.

## Migration Plan

1. Add root and harness navigation/config files.
2. Add each area index and template.
3. Add Nuxt-specific frontend architecture contract.
4. Create initial task record for harness installation, then mark it complete with validation evidence.
5. Validate JSON, links, required metadata, English text, file inventory, and Git diff.

Rollback: remove only newly added `AGENTS.md` and `.agents/` files; application runtime remains unchanged.
