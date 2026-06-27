# Контент порталов

Markdown-файлы для Astro-порталов. **Источник правды** после миграции из `it-knowledge-base`.

## Синхронизация (переходный период)

Пока контент ещё в энциклопедии:

```bash
# из корня it-portals, рядом должен лежать it-knowledge-base
npm run sync:glossary
npm run sync:lab
npm run sync:all
```

Переменная `IT_KB_ROOT` — явный путь к `it-knowledge-base`.

После миграции правки делаются здесь; sync используется только для одноразового переноса или сверки.

## Структура

| Папка | Портал | URL-префикс |
|-------|--------|-------------|
| `glossary/` | terms.spirzen.ru | `/glossary/` |
| `lab/` | lab.spirzen.ru | `/lab/` (план) |

См. [docs/MIGRATION.md](../docs/MIGRATION.md) и [docs/STATUS.md](../docs/STATUS.md).
