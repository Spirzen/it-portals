# План миграции контента на порталы

> Пошаговый перенос разделов с spirzen.ru на поддомены без поломки ссылок.

## Принципы

1. **Перенос владения**, не постоянный sync — `content/` в it-portals становится источником правды.
2. **Path сохраняем** — `/glossary/Д`, `/lab/questions/114`.
3. **Интеграция через конфиг** — `ecosystem-urls.json` + правка генераторов индексов в KB.
4. **По одному порталу** — terms → lab → tools → games/kids.

## Фаза 1 — terms (глоссарий) 🟡 в работе

| Шаг | Статус | Действие |
|-----|--------|----------|
| Scaffold it-portals | ✅ | monorepo, sites/terms, packages |
| Sync glossary → content/ | ✅ | `npm run sync:glossary` |
| terms.spirzen.ru UI | ✅ | Astro, sidebar, theme, `/glossary/[slug]` |
| CI build | ✅ | `.github/workflows/ci.yml` |
| Deploy terms GH Pages | ✅ | `deploy-terms.yml` + CNAME |
| KB: wikiLinkIndex → terms URL | ⬜ | правка `build-wiki-link-index.mjs` |
| KB: убрать glossary из sidebar | ⬜ | stub + ссылка на terms |
| KB: redirects `/glossary/*` | ⬜ | client-redirects или stub HTML |
| KB: doc-search glossary → terms index | ⬜ | split search |
| Mobile app search URLs | ⬜ | manifest |
| Закоммитить content/glossary в it-portals | ⬜ | после первого sync |

## Фаза 2 — lab 🟡 заготовка

| Шаг | Статус | Действие |
|-----|--------|----------|
| sites/lab placeholder | ✅ | landing |
| Sync lab content | ⬜ | `npm run sync:lab` |
| MDX/embed: ExternalPlayEmbed | ⬜ | React islands или iframe wrapper |
| LabTrainersHub | ⬜ | порт в shared или lab site |
| Маршруты `/lab/...` | ⬜ | catch-all как glossary |
| quiz/exam/checklist внутри lab | ⬜ | без отдельных доменов |
| Deploy lab.spirzen.ru | ⬜ | отдельный repo или CF Pages |

## Фаза 3 — tools ⬜

- Перенос `docs/tools`
- Интеграция spirzen.github.io утилит (WebEditor уже html.spirzen.ru)
- Каталог + deep links

## Фаза 4 — games + kids ⬜

- Фильтр spinoff 9-03, 9-04, 9-11
- games + gamedev — один портал, два раздела
- kids — отдельная тема UI

## Скрипты миграции ссылок (KB)

Планируемые скрипты в `it-knowledge-base/scripts/`:

| Скрипт | Назначение |
|--------|------------|
| `migrate-links-to-terms.mjs` | `/glossary/` → `https://terms.spirzen.ru/glossary/` в MD |
| `build-glossary-redirects.mjs` | static redirects для stub pages |

**Важно:** `[[термин]]` трогать не нужно — достаточно обновить `wikiLinkIndex`.

## Rollback

- glossary MD остаётся в git history KB до удаления;
- terms можно выключить DNS, вернуть sidebar в KB;
- sync восстанавливает content из KB.

## Критерии «миграция terms завершена»

- [ ] spirzen.ru/glossary не отдаёт контент (redirect/stub)
- [ ] все `[[wiki]]` glossary ведут на terms.spirzen.ru
- [ ] DocSearch KB не дублирует glossary (или помечает external)
- [ ] it-portals/content/glossary — единственное место правок
- [ ] ECOSYSTEM.md обновлён
