# Skills

On-demand execution guidance. Skills are Markdown packages; load only the skill matching the task.

## Categories

| Category | Path | Use for |
|---|---|---|
| Project | [project/README.md](project/README.md) | Mindscape product, content, conventions, and repository knowledge |
| Technical | [tech/README.md](tech/README.md) | Tools, languages, frameworks, testing, and reusable engineering practice |

## Create and register

1. Copy `_template.skill.md` from selected category into `<category>/<skill-name>/SKILL.md`.
2. Use `SKILL-<slug>` ID, concise description, and lowercase kebab-case folder.
3. Add references and validation evidence; register skill in category `README.md`.
4. Keep skill read-only by default; explicit user request controls writes.

## Routing

Load project skill first for product behavior. Load technical skill first for tool/framework mechanics. For cross-cutting work, load both indexes then only named skills.
