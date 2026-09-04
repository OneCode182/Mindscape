# Architecture

Technical placement and decisions for Mindscape. Architecture is the authority for where new code belongs; source code proves current implementation.

## Navigation

Read [`../AGENTS.md`](../AGENTS.md) first. Load this index, then only architecture doc matching current change.

## Documents

| ID | File | Scope | Load when |
|---|---|---|---|
| ARCH-FRONTEND | [frontend.md](frontend.md) | Nuxt/Vue routes, components, composables, utilities, server, content, styles, tests | Any frontend or full-stack change |

## Create

Copy [`_template.architecture.md`](_template.architecture.md) to `<topic>.md`; use `ARCH-<slug>`, record alternatives, and register it here.

## Review triggers

Update architecture when a new top-level folder, runtime boundary, routing convention, data-flow rule, or cross-feature pattern is introduced. Link the decision from the task that caused it.

## Required metadata

`id`, `title`, `status`, `created`, `updated`, `owner`, `references`, decision rationale, alternatives, risks, and validation evidence.
