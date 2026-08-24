---
id: ARCH-FRONTEND
title: Mindscape Nuxt frontend structure
status: active
created: 2026-08-20
updated: 2026-08-20
owner: Mindscape maintainers
references:
  - ../../package.json
  - ../tasks/harness-bootstrap.task.md
---

# Mindscape Frontend Architecture

Nuxt 4/Vue 3/TypeScript placement contract. Keep route orchestration thin, keep runtime boundaries explicit, and prefer existing conventions.

## Placement map

| Concern | Canonical location | Rule |
|---|---|---|
| File-based route entry | `app/pages/` | One page per route pattern; compose UI, avoid heavy algorithms. Preserve Nuxt route naming. |
| Route shell | `app/layouts/` | Reusable page chrome and layout-level slots only. |
| Reusable UI | `app/components/` | Root-level components only when reused across features. |
| Feature UI | `app/components/<feature>/` | Keep feature-only components together; promote to shared only after reuse is real. |
| Reactive/stateful logic | `app/composables/` | `use*.ts`; own Vue state, watchers, browser effects, and reusable orchestration. |
| Pure functions/algorithms | `app/utils/` | Deterministic, side-effect-free helpers; no component rendering or network calls. |
| Shared app types | `app/types/` or feature-local `types.ts` | Use explicit interfaces/types; keep API contracts near their boundary. |
| Bundled CSS/assets | `app/assets/` | Global styles and build-processed assets. |
| URL-stable static assets | `public/` | Files served as-is; reference by stable public URL. |
| API handlers | `server/api/` | Server-only request/response boundary; validate input and return typed data. |
| Non-API server routes | `server/routes/` | Server route handlers such as sitemap or webhooks. |
| Server-only helpers | `server/utils/` or `server/services/` | Extract reusable server logic; never import into client code. |
| Authored localized content | `content/<locale>/` | Markdown/JSON content, not UI state or API code. |
| Interface translations | `i18n/locales/` and `i18n/` | Locale messages/config; keep product content in `content/`. |
| Focused tests | Colocate `*.test.ts` near pure logic when supported | Test behavior at smallest useful boundary. |
| Cross-feature/E2E tests | `tests/` | Use root test suite for flows spanning routes or runtime boundaries. |

## Dependency direction

```text
pages/layouts → components → composables → utils
pages/components/composables → server API boundary
content/i18n → presentation
server handlers → server utils/services
```

Presentation code must not import server-only modules. Components must not own raw network clients or large pure algorithms. Composables may call API clients and expose typed state; pure utilities stay framework-agnostic.

## Naming and design rules

- Directories: lowercase kebab-case; existing route conventions remain authoritative.
- Components: PascalCase Vue filenames where existing code uses it; keep new names consistent with neighboring files.
- Composables: `useThing.ts`.
- Utilities/services: descriptive camelCase or kebab-case matching local convention.
- Prefer one responsibility per component/composable/helper.
- Keep props and return values typed; avoid `any`.
- Reuse Nuxt UI/Vue patterns already installed before adding dependencies.
- Keep localization and content changes separate from component logic.

## Quality commands

Run proportionate checks from `package.json`:

```bash
pnpm type-check
pnpm format:check
pnpm lint:biome
pnpm lint:eslint
pnpm lint
```

Use focused commands during iteration; run `pnpm lint` before handoff when dependencies are available. Record command/result in task memory.

## Change checklist

1. Identify route, feature, runtime boundary, and reuse level.
2. Choose one placement from map.
3. Keep data fetching in server handlers/composables, not presentational render code.
4. Add/update tests and localized content when behavior requires it.
5. Link architecture/task evidence for new boundaries.
