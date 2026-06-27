# План миграции контента на порталы

> Пошаговый перенос разделов с spirzen.ru на поддомены без поломки ссылок.

## Принципы

1. **Перенос владения**, не постоянный sync — `content/` в it-portals становится источником правды.
2. **Path сохраняем** — `/glossary/Д`, `/lab/questions/114`.
3. **Интеграция через конфиг** — `ecosystem-urls.json` + правка генераторов индексов в KB.
4. **По одному порталу** — terms → lab → tools → games/kids.

| Фаза 1 — terms (глоссарий) | 🟢 мигрировано (2026-06-27) |

| Шаг | Статус | Действие |
|-----|--------|----------|
| Scaffold it-portals | ✅ | monorepo, sites/terms, packages |
| Sync glossary → content/ | ✅ | `npm run sync:glossary` |
| terms.spirzen.ru UI | ✅ | Astro, sidebar, theme, `/glossary/[slug]` |
| CI build | ✅ | `.github/workflows/ci.yml` |
| Deploy terms GH Pages | ✅ | `deploy-terms.yml` + CNAME |
| KB: wikiLinkIndex → terms URL | ✅ | `build-wiki-link-index.mjs` |
| KB: убрать glossary из sidebar | ✅ | ссылка на terms.spirzen.ru |
| KB: redirects `/glossary/*` | ✅ | `glossaryExternalRedirects.json` |
| KB: doc-search glossary → terms index | ✅ | exclude `glossary/**` |
| Mobile app catalog | ✅ | ContentCatalog → terms |
| Закоммитить content/glossary в it-terms | ⬜ | источник правды после sync |

## Фаза 2 — lab 🟢 мигрировано (2026-06-28)

| Шаг | Статус | Действие |
|-----|--------|----------|
| Repo it-lab (отдельный) | ✅ | `lab.spirzen.ru`, порт 4331 |
| Sync lab content | ✅ | `npm run sync:lab` → `content/lab` |
| Маршруты `/lab/…` | ✅ | catch-all `[...slug].astro`, кириллические slug |
| ExternalPlayEmbed | ✅ | iframe play.spirzen.ru (PoC + roadmap) |
| ExternalCodeEmbed | ✅ | iframe code.spirzen.ru |
| LabTrainersHub | ✅ | каталог тренажёров + play embeds |
| Deploy lab.spirzen.ru | ✅ | GitHub Pages |
| KB: exclude `lab/**` | ✅ | docusaurus docs |
| KB: redirects `/lab/*` | ✅ | `labExternalRedirects.json` (716 routes) |
| KB: sidebar → lab external | ✅ | lab.spirzen.ru/lab/intro |
| KB: doc-search без lab | ✅ | −180 страниц |
| KB: wikiLinkIndex lab | ✅ | 180 статей → lab URL |
| KB: wikiLink `/lab` rewrite | ✅ | `wikiLink.js` |
| Mobile ContentCatalog | ✅ | lab.spirzen.ru |
| Закрепить content/lab в it-lab | ⬜ | источник правды, удалить docs/lab из KB позже |

## Фаза 3 — tools 🟢 мигрировано (2026-06-28)

| Шаг | Статус | Действие |
|-----|--------|----------|
| Repo it-tools | ✅ | `tools.spirzen.ru`, порт 4334 |
| Sync + routing | ✅ | 65 страниц, `/tools/{category}/{id}` |
| ExternalPlayEmbed | ✅ | iframe play.spirzen.ru |
| RandomGameGenerator | 🟡 | stub (список игр в MD ниже) |
| KB integration | ✅ | exclude, redirects, sidebar, wikiLink |
| Deploy tools.spirzen.ru | ⬜ | push it-tools → CI |

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
