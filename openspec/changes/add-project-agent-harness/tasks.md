## 1. Harness Entry and Configuration

- [x] 1.1 Create root `AGENTS.md` with authority, boot sequence, scope rules, and harness links; verify every referenced path exists.
- [x] 1.2 Create `.agents/AGENTS.md` and `_template.document.md`; verify navigation routes each work type to one minimal context path.
- [x] 1.3 Create `.agents/env.json` with repository, harness, area, curriculum, and current-CV absolute paths plus privacy rules; verify with a JSON parser and filesystem existence checks.

## 2. Area Documentation and Templates

- [x] 2.1 Create `.agents/agents/README.md` and `_template.agent.md` with role boundaries, required skills, inputs, outputs, and traceability metadata; verify template fields are documented by the index.
- [x] 2.2 Create `.agents/skills/README.md` plus root `_template.skill.md`; verify package creation and registration steps target `<category>/<skill-name>/SKILL.md`.
- [x] 2.3 Create `skills/project/` and `skills/tech/` indexes and templates; verify routing examples distinguish repository knowledge from reusable technical guidance.
- [x] 2.4 Create `.agents/architecture/README.md` and `_template.architecture.md`; verify ownership, review triggers, status, dates, decisions, and references are present.
- [x] 2.5 Create `.agents/tasks/README.md` and `_template.task.md`; verify lifecycle and required resume/audit evidence fields are present.

## 3. Frontend Architecture

- [x] 3.1 Create `.agents/architecture/frontend.md` for current Nuxt/Vue boundaries across `app/`, `server/`, `content/`, `i18n/`, `public/`, and tests; verify every placement category in the spec maps to one canonical location.
- [x] 3.2 Document dependency direction, naming, route/component/composable/utility rules, and quality commands from `package.json`; verify guidance does not import TecniPass's Remix/React conventions.

## 4. Traceability and Validation

- [x] 4.1 Create `.agents/tasks/harness-bootstrap.task.md` linked to this OpenSpec change, relevant architecture, affected files, decisions, and validation evidence; verify status reflects implementation outcome.
- [x] 4.2 Validate exact harness inventory, local Markdown links, JSON syntax, absolute configured paths, required template metadata, and English documentation; record commands/results in bootstrap task.
- [x] 4.3 Run repository documentation-safe checks and inspect `git diff --check` plus `git status --short`; document any unrelated pre-existing changes without modifying them.
