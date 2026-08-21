## Why

Mindscape lacks a project-local operating guide for coding agents, so task context, frontend placement rules, reusable skills, and work history are currently implicit. A compact harness will make those contracts discoverable and traceable without importing TecniPass-specific complexity.

## What Changes

- Add a root `AGENTS.md` as the mandatory entry point for agents working in Mindscape.
- Add a self-contained `.agents/` harness with navigation, environment paths, agent profiles, frontend architecture, task memory, and project/technical skill areas.
- Provide concise English documentation and copy-ready templates for every harness area.
- Define stable traceability metadata and links among tasks, agents, skills, architecture decisions, validation evidence, and source requests.
- Record `/home/onecode/Documents/curriculum/` as the personal-information source and `/home/onecode/Documents/curriculum/cv-2/` as the current CV source, while keeping those external files read-only.
- Tailor frontend placement guidance to Mindscape's Nuxt 4, Vue 3, TypeScript, Nuxt Content, i18n, and server layout.

## Capabilities

### New Capabilities

- `project-agent-harness`: Defines discoverable navigation, scoped agent/skill templates, frontend architecture guidance, environment path resolution, and traceable task memory for Mindscape.

### Modified Capabilities

None.

## Impact

- Adds documentation and JSON configuration under `AGENTS.md`, `.agents/`, and `openspec/changes/add-project-agent-harness/`.
- Does not change application runtime behavior, dependencies, APIs, generated output, or curriculum files.
- Future agents will treat the root `AGENTS.md` and `.agents/env.json` as project-local navigation and path authorities.
