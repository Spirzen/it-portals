# Локальная разработка

## Требования

- Node.js ≥ 20
- npm (workspaces)
- Рядом с `it-portals` — `it-knowledge-base` (для sync)

Ожидаемая структура:

```
ITUniverse/
├── it-knowledge-base/
├── it-portals/          ← этот репозиторий
├── it-code-examples/
└── it-play/
```

## Первый запуск

```bash
cd it-portals
npm install
npm run sync:glossary    # IT_KB_ROOT=../it-knowledge-base
npm run dev:terms
```

Откройте http://localhost:4330/glossary/intro

## Команды

| Команда | Описание |
|---------|----------|
| `npm run sync:glossary` | KB → content/glossary |
| `npm run sync:lab` | KB → content/lab |
| `npm run sync:all` | оба sync |
| `npm run dev:terms` | terms :4330 |
| `npm run dev:lab` | lab :4331 |
| `npm run dev:games` | games :4332 |
| `npm run dev:kids` | kids :4333 |
| `npm run dev:tools` | tools :4334 |
| `npm run build:all` | production build всех sites |
| `npm run build:terms` | только terms |

## Localhost URLs в nav

При `astro dev` nav использует production URLs из `ecosystem-urls.json`.

Чтобы nav указывал на localhost всех сервисов:

```bash
IT_PORTALS_DEV=1 npm run dev:terms
```

(подменяет `domains.*` на `localDev.*` из конфига)

## Порты

| Site | Port |
|------|------|
| terms | 4330 |
| lab | 4331 |
| games | 4332 |
| kids | 4333 |
| tools | 4334 |

Не пересекаются с code (4321), play (4322), KB (3000), management (8787).

## Правка shared UI

Компоненты: `packages/shared/src/components/`  
Стили: `packages/shared/src/styles/`

Изменения видны во всех sites после перезапуска dev server.

## Правка glossary

1. Либо правите `content/glossary/*.md` напрямую;
2. Либо правите в KB и `npm run sync:glossary` (перезапишет content).

## Troubleshooting

| Проблема | Решение |
|----------|---------|
| `getStaticPaths` 0 pages | Запустите sync; проверьте `content/glossary` |
| KB not found | `IT_KB_ROOT=F:\ITUniverse\it-knowledge-base npm run sync:glossary` |
| Theme flash | FOUC script в PortalLayout; проверьте localStorage |
| Cyrillic 404 | slug должен совпадать с именем файла (`Д.md` → `/glossary/Д`) |
