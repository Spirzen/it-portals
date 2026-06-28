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
| ExternalPlayEmbed | ✅ | iframe play.spirzen.ru |
| ExternalCodeEmbed | ✅ | iframe code.spirzen.ru |
| LabTrainersHub | ✅ | каталог тренажёров + play embeds |
| DeveloperExamPlay | ✅ | play embed `lab/developer-exam-play` + `article-exam` postMessage |
| RandomQuestionFromArticle | ✅ | inline `article-question-picker.js` из DOM статьи |
| DocCardList | ✅ | build-time карточки раздела в `load-lab.mjs` |
| Deploy lab.spirzen.ru | ✅ | GitHub Pages |
| KB: exclude `lab/**` | ✅ | docusaurus docs |
| KB: redirects `/lab/*` | ✅ | `labExternalRedirects.json` (716 routes) |
| KB: sidebar → lab external | ✅ | lab.spirzen.ru/lab/intro |
| KB: doc-search без lab | ✅ | −180 страниц |
| KB: wikiLinkIndex lab | ✅ | 180 статей → lab URL |
| KB: wikiLink `/lab` rewrite | ✅ | `wikiLink.js` |
| Mobile ContentCatalog | ✅ | lab.spirzen.ru |
| Article chrome (TOC, breadcrumbs, tags) | ✅ | sidebar collapse, share/PDF |
| Полная ширина карточки статьи | ✅ | layout без `max-width` при sidebar/TOC |
| ITU loader на embed play/code | ✅ | `itu-loader` в embed-host |
| Закрепить content/lab в it-lab | ⬜ | источник правды, удалить docs/lab из KB позже |

## Фаза 3 — tools 🟢 мигрировано (2026-06-28)

| Шаг | Статус | Действие |
|-----|--------|----------|
| Repo it-tools | ✅ | `tools.spirzen.ru`, порт 4334 |
| Sync + routing | ✅ | 65 страниц, `/tools/{category}/{id}` |
| ExternalPlayEmbed / CodeEmbed | ✅ | iframe + article chrome |
| RandomGameGenerator | ✅ | перенесён в games/9-031-gametools/4 |
| KB integration | ✅ | exclude, redirects, sidebar, wikiLink |
| Deploy tools.spirzen.ru | ✅ | push it-tools → CI |
| ITU loader на embed | ✅ | зеркало it-lab |

## Фаза 4 — UX экосистемы 🟡 в работе (2026-06-28)

| Шаг | Статус | Действие |
|-----|--------|----------|
| Единая шапка EcosystemNav | ✅ | lab, tools, terms; **play**, **code** |
| Единая тема `itu-portal-theme` | ✅ | play, code, lab, tools |
| ITU loader (книга + орбы) | ✅ | KB redirects, embed play/code, lab/tools, play/code iframe |
| WebEditor (html.spirzen.ru) шапка | ✅ | standalone `packages/shared/src/standalone/` |
| SQL Generator (sql.spirzen.ru) шапка | ✅ | `public/itu/` + EcosystemNav |
| Schema Maker (schema.spirzen.ru) шапка | ✅ | `public/itu/` + EcosystemNav |
| Деплой code.spirzen.ru (postMessage origins) | ⬜ | parent-origin для lab/tools embed |
| PDF через html2canvas | ⛔ | не нужен (print достаточно) |
| Shared package вместо дублирования CSS | 🟡 | `it-portals/packages/shared` — loader, nav, **standalone/** для внешних repo |

## Фаза 5 — games + kids 🟢 мигрировано (2026-06-28)

| Шаг | Статус | Действие |
|-----|--------|----------|
| Sync spinoff 9-03 + 9-04 → it-games | ✅ | `npm run sync:games` (126 MD) |
| Sync spinoff 9-11 → it-kids | ✅ | `npm run sync:kids` (80 MD) |
| Маршруты `/games/…`, `/kids/…` | ✅ | catch-all + embed play/code |
| Два раздела games (индустрия + gamedev) | ✅ | sidebar по `9-03` / `9-04` |
| tools/games → `9-031-gametools` | ✅ | «Полезные инструменты», 6 страниц + redirects |
| Kids UI theme | ✅ | `data-portal="kids"`, тёплая палитра |
| Build games/kids | ✅ | 133 + 81 страниц |
| KB: exclude spinoff paths | ✅ | docusaurus exclude |
| KB: redirects | ✅ | `gamesExternalRedirects.json`, `kidsExternalRedirects.json` |
| KB: wikiLinkIndex | ✅ | games + kids URLs |
| KB: doc-search exclude | ✅ | −206 страниц spinoff |
| Mobile ContentCatalog | ✅ | games + kids external |
| Deploy games/kids GH Pages | ⬜ | push it-games, it-kids |
| Закрепить content/ в репо | 🟡 | после sync, commit content/ |

## Скрипты миграции ссылок (KB)

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

## Критерии «lab/tools готовы к выключению в KB»

- [ ] lab.spirzen.ru и tools.spirzen.ru в проде с CI
- [ ] embed play/code работают (fullscreen, тема, высота)
- [ ] redirects spirzen.ru/lab и /tools отдают ITU loader, не пустую страницу
- [ ] content/lab и content/tools закреплены в отдельных репо
- [ ] docs/lab и docs/tools удалены из it-knowledge-base

## Общий loader

Канонические файлы: `it-portals/packages/shared/src/loader/itu-loader.{css,js}`.

Копии и интеграции:

| Репо | Где используется |
|------|------------------|
| it-knowledge-base | redirect pages (plugin `ituRedirectLoader`), ExternalPlay/CodeEmbed, lazy embed |
| it-lab, it-tools | embed-host (iframe mask) |
| it-play | EmbedLayout, demo fallbacks |
| it-code-examples | EmbedLayout |

При правках — синхронизировать CSS/разметку из shared package.
