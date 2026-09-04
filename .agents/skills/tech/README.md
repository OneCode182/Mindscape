# Technical Skills

Reusable tool, language, framework, testing, accessibility, and engineering guidance.

## Navigation

Read [`../README.md`](../README.md) for complete skill registry, imported autoskill sources, and symlink rules.

## Create

Copy [`_template.skill.md`](_template.skill.md) into `<skill-name>/SKILL.md`; set `category: tech`, register below, and state tool/version assumptions.

## Skills

### Local imported skills

| ID | Path | Trigger |
|---|---|---|
| `SKILL-AUTOSKILLS-ACCESSIBILITY` | [../accessibility/SKILL.md](../accessibility/SKILL.md) | WCAG and accessible UI |
| `SKILL-AUTOSKILLS-FRONTEND-DESIGN` | [../frontend-design/SKILL.md](../frontend-design/SKILL.md) | Production frontend design |
| `SKILL-AUTOSKILLS-NODEJS-BACKEND-PATTERNS` | [../nodejs-backend-patterns/SKILL.md](../nodejs-backend-patterns/SKILL.md) | Node.js backend/API patterns |
| `SKILL-AUTOSKILLS-NODEJS-BEST-PRACTICES` | [../nodejs-best-practices/SKILL.md](../nodejs-best-practices/SKILL.md) | Node.js decisions and best practices |
| `SKILL-AUTOSKILLS-NUXT` | [../nuxt/SKILL.md](../nuxt/SKILL.md) | Nuxt full-stack work |
| `SKILL-AUTOSKILLS-SEO` | [../seo/SKILL.md](../seo/SKILL.md) | Search visibility and technical SEO |
| `SKILL-AUTOSKILLS-TYPESCRIPT-ADVANCED-TYPES` | [../typescript-advanced-types/SKILL.md](../typescript-advanced-types/SKILL.md) | Advanced TypeScript types |

### Runtime-provided technical skills

PR profiles reference these stable runtime skill IDs. They are available from the agent skill catalog; no local repository file is expected.

| Skill ID | Trigger |
|---|---|
| `tech/git-repo-exploration` | Inspect repo, history, remotes, and dirty state |
| `tech/git-branch-comparison` | Compare base/head refs and exact diff |
| `tech/pr-audit` | Audit changed files and commits |
| `tech/generate-pr-description` | Synthesize business-readable PR body |
| `tech/pr-description-generator` | Calculate totals and write Markdown contract |
| `tech/pr-quality-controls` | Add evidence-based quality statuses |
| `tech/prepare-pr` | Run safe readiness checks |
| `tech/create-pull-request` | Inspect/create/update PR with `gh` |

## Boundary

Keep product rules out. Technical skills must remain reusable beyond one Mindscape feature.
