# Деплой на GitHub Pages

## Ограничение GitHub Pages

**Один репозиторий → один custom domain** (CNAME).

В monorepo `it-portals` несколько сайтов в `sites/*`, но только **один** может использовать GitHub Pages custom domain этого репо.

## Текущая схема

| Портал | Workflow | Artifact | Domain |
|--------|----------|----------|--------|
| terms | `deploy-terms.yml` (push main) | `sites/terms/dist` | **terms.spirzen.ru** |
| lab, games, kids, tools | `deploy-portal-manual.yml` | artifact only | см. ниже |

### terms.spirzen.ru

1. В GitHub repo **Settings → Pages → Build: GitHub Actions**.
2. Workflow `Deploy terms.spirzen.ru` публикует `sites/terms/dist`.
3. Файл `sites/terms/public/CNAME` содержит `terms.spirzen.ru`.
4. DNS у регистратора:
   - `CNAME terms → <user>.github.io` **или**
   - A/AAAA записи GitHub Pages (см. актуальную доку GitHub).

### Остальные поддомены (варианты)

**A. Отдельный репозиторий на портал (классика GH Pages)**

```
Spirzen/it-portals-lab   → lab.spirzen.ru
Spirzen/it-portals-games → games.spirzen.ru
…
```

CI в monorepo собирает site, action пушит `dist/` в deploy-repo (PAT `DEPLOY_TOKEN`).

**B. Cloudflare Pages**

Один git repo, несколько projects:

| Project | Root directory | Domain |
|---------|----------------|--------|
| itu-terms | `sites/terms` | terms.spirzen.ru |
| itu-lab | `sites/lab` | lab.spirzen.ru |

Build command: `cd ../.. && npm ci && npm run build:terms` (настроить в CF).

**C. Временный preview**

Без DNS — `npx wrangler pages dev` или `astro preview` локально.

## CI

| Workflow | Trigger | Что делает |
|----------|---------|------------|
| `ci.yml` | push, PR | matrix build всех 5 sites |
| `deploy-terms.yml` | push main (paths) | sync glossary + deploy terms |
| `deploy-portal-manual.yml` | manual | build + artifact |

## Sync контента в CI

`deploy-terms.yml` и CI для terms клонируют `Spirzen/it-knowledge-base` и запускают `sync-glossary.mjs`.

Если clone недоступен — используется закоммиченный `content/glossary/` (`continue-on-error: true`).

**Рекомендация для prod:** коммитить `content/glossary` после sync, не зависеть от clone в CI.

## Env prod build

```bash
IT_TERMS_SITE=https://terms.spirzen.ru IT_TERMS_BASE=/ npm run build:terms
IT_LAB_SITE=https://lab.spirzen.ru IT_LAB_BASE=/ npm run build:lab
# …
```

## Проверка после деплоя

- [ ] https://terms.spirzen.ru/glossary/intro
- [ ] https://terms.spirzen.ru/glossary/Д (кириллица в URL)
- [ ] Theme toggle сохраняется
- [ ] Nav ведёт на spirzen.ru, code, play
- [ ] CNAME не перезаписывается (Astro копирует `public/CNAME` в dist)

## it-management (план)

Добавить проекты в локальную панель:

| id | port | path |
|----|------|------|
| portals-terms | 4330 | sites/terms |
| portals-lab | 4331 | sites/lab |

См. it-knowledge-base/info/ECOSYSTEM.md после интеграции.
