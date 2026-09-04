# Agent Profiles

Role contracts for focused Mindscape work. Profiles select skills; they do not replace the root boot contract.

## Navigation

Read [`../AGENTS.md`](../AGENTS.md) first. Resolve each profile's `skills` entry through [`../skills/README.md`](../skills/README.md); entries without local files refer to runtime-provided skills.

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
| `AGENT-PR-DESC-CREATOR` | [pr-desc-creator.agent.md](pr-desc-creator.agent.md) | Git evidence, branch audit, PR description | Compare/audit branch or write PR body |
| `AGENT-PR-CREATOR` | [pr-creator.agent.md](pr-creator.agent.md) | Full GitHub PR lifecycle | Create or update PR with `gh` |

## Boundaries

Profiles must stay inside declared domain, load minimum context, avoid self-editing, and report files, validation, blockers, and risks.
