# Agent Profiles

Role contracts for focused Mindscape work. Profiles select skills; they do not replace the root boot contract.

## Create

1. Copy [`_template.agent.md`](_template.agent.md) to `<name>.agent.md`.
2. Use `AGENT-<slug>` ID and lowercase kebab-case filename.
3. List only skills required for role scope.
4. Register profile here with domain and trigger.

## Required sections

Frontmatter: `id`, `name`, `description`, `status`, `created`, `updated`, `owner`, `skills`, `references`.
Body: scope, inputs, workflow, output contract, boundaries, verification, traceability.

## Profiles

| ID | File | Domain | Trigger |
|---|---|---|---|
| — | — | No project-specific profiles yet | Add from template |

## Boundaries

Profiles must stay inside declared domain, load minimum context, avoid self-editing, and report files, validation, blockers, and risks.
