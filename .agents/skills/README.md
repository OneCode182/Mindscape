# Skills

On-demand execution guidance. Skills are Markdown packages; load only the skill matching the task.

## Categories

| Category | Path | Use for |
|---|---|---|
| Project | [project/README.md](project/README.md) | Mindscape product, content, conventions, and repository knowledge |
| Technical | [tech/README.md](tech/README.md) | Tools, languages, frameworks, testing, and reusable engineering practice |

## Imported autoskills

These skills are local snapshots installed by `npx autoskills`. Read `SKILL.md` first; follow linked references only when task requires them. Sources and integrity hashes live in [`skills-lock.json`](../../skills-lock.json).

| ID | Skill | Path | Trigger |
|---|---|---|---|
| `SKILL-AUTOSKILLS-ACCESSIBILITY` | accessibility | [accessibility/SKILL.md](accessibility/SKILL.md) | WCAG, a11y, keyboard, screen reader, accessible UI |
| `SKILL-AUTOSKILLS-FRONTEND-DESIGN` | frontend-design | [frontend-design/SKILL.md](frontend-design/SKILL.md) | Build or style distinctive frontend UI |
| `SKILL-AUTOSKILLS-NODEJS-BACKEND-PATTERNS` | nodejs-backend-patterns | [nodejs-backend-patterns/SKILL.md](nodejs-backend-patterns/SKILL.md) | Node.js API, server, middleware, auth, DB |
| `SKILL-AUTOSKILLS-NODEJS-BEST-PRACTICES` | nodejs-best-practices | [nodejs-best-practices/SKILL.md](nodejs-best-practices/SKILL.md) | Node.js architecture, async, security, deployment |
| `SKILL-AUTOSKILLS-NUXT` | nuxt | [nuxt/SKILL.md](nuxt/SKILL.md) | Nuxt routes, server routes, SSR, useFetch, middleware |
| `SKILL-AUTOSKILLS-SEO` | seo | [seo/SKILL.md](seo/SKILL.md) | SEO, metadata, structured data, sitemap |
| `SKILL-AUTOSKILLS-TYPESCRIPT-ADVANCED-TYPES` | typescript-advanced-types | [typescript-advanced-types/SKILL.md](typescript-advanced-types/SKILL.md) | Generics, conditional, mapped, template-literal types |

## Resolution rules

- Local project skill -> `project/`.
- Local technical skill -> `tech/` or imported skill table above.
- Runtime skill with no local path -> use agent skill catalog; do not invent repository link.
- `.claude/skills/<name>` mirrors imported source through symlink; edit `.agents/skills/<name>/`.
- Upstream companion links inside imported snapshots may target skills not vendored in this repo; treat those as external references.

## Create and register

1. Copy `_template.skill.md` from selected category into `<category>/<skill-name>/SKILL.md`.
2. Use `SKILL-<slug>` ID, concise description, and lowercase kebab-case folder.
3. Add references and validation evidence; register skill in category `README.md`.
4. Keep skill read-only by default; explicit user request controls writes.

## Routing

Load project skill first for product behavior. Load technical skill first for tool/framework mechanics. For cross-cutting work, load both indexes then only named skills.
