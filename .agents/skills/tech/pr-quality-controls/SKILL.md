---
id: SKILL-TECH-PR-QUALITY-CONTROLS
name: pr-quality-controls
description: Add evidence-based quality-control statuses to PR descriptions without inventing passes.
category: tech
status: active
created: 2026-08-20
updated: 2026-08-20
owner: AGENT-ORCHESTRATOR
references:
  - pr-description-generator/SKILL.md
---

# Technical Skill: PR Quality Controls

## Required controls

Every generated PR description includes this table:

| Control | Status | Evidence |
|---|---|---|
| Sonar lint | `PASS` / `PARTIAL` / `NOT RUN` / `N/A` | Command/result or reason |
| SonarQube server | `PASS` / `PARTIAL` / `NOT RUN` / `N/A` | Scanner/server evidence or reason |
| Codex code reviewer | `PASS` / `PARTIAL` / `NOT RUN` / `N/A` | Audit verdict/findings |
| QA tools | `PASS` / `PARTIAL` / `NOT RUN` / `N/A` | Tests/build/lint/accessibility evidence |
| MoSCoW matrix | `PASS` / `PARTIAL` / `NOT RUN` / `N/A` | Task scope or reason |
| Software-engineering practices | `PASS` / `PARTIAL` / `NOT RUN` / `N/A` | Architecture/security/maintainability evidence |

## Rules

- `PASS` requires executed evidence.
- `PARTIAL` means limited scope, warnings, or unresolved findings.
- `NOT RUN` means useful/expected but no command evidence exists.
- `N/A` requires a concrete reason.
- Keep details short; link deeper review artifacts when present.

## Traceability

- Related agents: `AGENT-PR-DESC-CREATOR`, `AGENT-PR-CREATOR`
- Related skill: `SKILL-TECH-PR-AUDIT`
- Validation: every control has one allowed status and evidence/reason
