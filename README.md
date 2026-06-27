# it-portals — Astro-порталы «Вселенная IT»

Monorepo статических порталов экосистемы [spirzen.ru](https://spirzen.ru): глоссарий, лаборатория, инструменты и тематические разделы.

| Портал | Домен | Статус |
|--------|-------|--------|
| Terms (глоссарий) | [terms.spirzen.ru](https://terms.spirzen.ru) | MVP — `/glossary/*` |
| Lab | lab.spirzen.ru | заготовка |
| Games | games.spirzen.ru | заготовка |
| Kids | kids.spirzen.ru | заготовка |
| Tools | tools.spirzen.ru | заготовка |

**Docusaurus остаётся на spirzen.ru.** Контент порталов живёт в `content/`; интеграция через [`ecosystem-urls.json`](./ecosystem-urls.json).

---

## Быстрый старт

```bash
npm install
npm run sync:glossary   # из ../it-knowledge-base
npm run dev:terms       # http://localhost:4330
```

---

## Документация

| Файл | Содержание |
|------|------------|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Архитектура monorepo, пакеты, URL-схема |
| [docs/MIGRATION.md](./docs/MIGRATION.md) | План переноса с it-knowledge-base |
| [docs/STATUS.md](./docs/STATUS.md) | Чеклист и статусы (для агентов между сессиями) |
| [docs/DEPLOY.md](./docs/DEPLOY.md) | GitHub Pages, DNS, CI |
| [docs/LOCAL-DEV.md](./docs/LOCAL-DEV.md) | Порты, команды, troubleshooting |
| [content/README.md](./content/README.md) | Источник markdown контента |

---

## Структура

```
packages/shared     — nav, theme, layout
packages/markdown   — парсинг glossary MD
packages/sync       — sync из it-knowledge-base
content/            — markdown (источник правды)
sites/terms         — terms.spirzen.ru
sites/lab|games|kids|tools
ecosystem-urls.json — URL всех сервисов
```

---

## Связанные репозитории

- [it-knowledge-base](https://github.com/Spirzen/it-knowledge-base) — энциклопедия
- [it-code-examples](https://github.com/Spirzen/it-code-examples) — code.spirzen.ru
- [it-play](https://github.com/Spirzen/it-play) — play.spirzen.ru

---

## Лицензия

MIT — см. [LICENSE](./LICENSE).

Автор: **Тагиров Тимур Владиславович**
