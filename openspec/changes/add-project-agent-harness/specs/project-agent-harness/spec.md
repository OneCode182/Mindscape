## Purpose

Provide Mindscape agents with a compact, project-local operating system for navigation, scoped expertise, frontend placement rules, and auditable task memory.

## ADDED Requirements

### Requirement: Harness discovery and navigation
The project SHALL expose `AGENTS.md` at the repository root and `.agents/AGENTS.md` inside the harness. Together they MUST define authority, boot order, minimal-context navigation, and links to each harness area.

#### Scenario: Agent starts repository work
- **WHEN** an agent begins work from the Mindscape repository root
- **THEN** `AGENTS.md` directs it to `.agents/AGENTS.md`, `.agents/env.json`, and only the task-relevant harness documents

### Requirement: Documented and templated harness areas
The harness SHALL contain `agents/`, `architecture/`, `skills/`, and `tasks/` areas. Each area MUST include concise English navigation documentation, a copy-ready template, naming rules, ownership, and traceability fields.

#### Scenario: Contributor creates a harness artifact
- **WHEN** a contributor opens any harness area
- **THEN** that area identifies its purpose, template, required metadata, and registration steps without requiring broad folder reads

### Requirement: Skill classification
The skills area SHALL separate Mindscape-specific skills under `skills/project/` from reusable tool, language, and framework skills under `skills/tech/`. Both categories MUST document routing and provide a skill template compatible with a `SKILL.md` package.

#### Scenario: Contributor classifies a new skill
- **WHEN** a skill encodes Mindscape product or repository knowledge
- **THEN** navigation assigns it to `skills/project/`, while reusable technical guidance is assigned to `skills/tech/`

### Requirement: Mindscape frontend placement contract
The architecture area SHALL document Mindscape's actual Nuxt/Vue structure and MUST state where route pages, layouts, shared and feature components, composables, pure functions and algorithms, server handlers, content, locale messages, styles, types, tests, and public assets belong.

#### Scenario: Agent plans a frontend file
- **WHEN** an agent needs to add frontend behavior
- **THEN** architecture guidance yields one canonical location based on routing, reuse, runtime boundary, and purity

### Requirement: Traceable task memory
The tasks area SHALL provide a compact task record with stable ID, status, dates, source request, related agents, skills, architecture references, affected files, decisions, validation evidence, blockers, and next step.

#### Scenario: Work pauses or completes
- **WHEN** an active task changes state
- **THEN** its task record contains enough evidence for another agent to resume or audit the work

### Requirement: Canonical environment paths
The harness SHALL provide valid `.agents/env.json` containing absolute paths for the repository, harness, skill categories, agents, architecture, tasks, curriculum root, and current CV directory. It MUST identify `/home/onecode/Documents/curriculum/cv-2/` as current and MUST prohibit treating personal files as writable project assets.

#### Scenario: Agent needs project or profile context
- **WHEN** an agent resolves repository, harness, skill, or authorized personal-information sources
- **THEN** it uses `.agents/env.json` and reads curriculum content only when task-relevant, without modifying or copying it by default

### Requirement: Concise modular documentation
Harness documents SHALL be written in English, scoped to one concern, and linked through local indexes. A document that grows beyond quick navigation or one focused contract MUST be split into linked modules.

#### Scenario: Harness guidance expands
- **WHEN** new guidance makes an existing document difficult to scan
- **THEN** the contributor extracts the concern into a linked document and preserves index traceability
