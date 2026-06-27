# AGENTS.md — it-portals

> Инструкции для AI-агентов и авторов между сессиями.

## Что это

Monorepo **Astro-порталов** экосистемы «Вселенная IT». Не Docusaurus. Не encyclopedia.

## Читать первым

1. [docs/STATUS.md](./docs/STATUS.md) — что сделано / что дальше
2. [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — структура и правила
3. [ecosystem-urls.json](./ecosystem-urls.json) — домены и маршруты

## Правила

- **Контент порталов** → `content/`, не `it-knowledge-base` (после миграции).
- **URL glossary** → `terms.spirzen.ru/glossary/{letter}#{anchor}` — path как на spirzen.ru.
- **Общий UI** → `packages/shared`, не дублировать в sites.
- **Парсинг MD** → `packages/markdown`, strip Docusaurus artifacts.
- **Sync** → только миграция; не полагаться на sync в runtime.
- **Новый портал** → копировать `sites/lab` stub, добавить в CI matrix, DEPLOY.md, ecosystem-urls.json.

## Команды

```bash
npm install
npm run sync:glossary
npm run dev:terms
npm run build:all
```

## Не ломать

- `ecosystem-urls.json` — согласовать с KB при смене glossary URL
- postMessage theme keys — совместимость с embed code/play
- CNAME в `sites/*/public/CNAME`

## Связь с it-knowledge-base

Миграция terms: см. [docs/MIGRATION.md](./docs/MIGRATION.md) фаза 1.  
KB меняется **после** работающего terms deploy: wikiLinkIndex, redirects, sidebar.

## Порты dev

4330 terms · 4331 lab · 4332 games · 4333 kids · 4334 tools
