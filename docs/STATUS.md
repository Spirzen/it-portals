# Статус порталов

> Живой чеклист. Обновляйте при каждой значимой сессии.  
> Last update: **2026-06-27**

## Сводка

| Портал | Домен | Site | Контент | Deploy | Примечание |
|--------|-------|------|---------|--------|------------|
| **Terms** | terms.spirzen.ru | 🟢 MVP | 🟢 69 MD | 🟢 workflow | 70 static pages |
| **Lab** | lab.spirzen.ru | 🟡 stub | ⬜ | 🟡 manual artifact | ждёт фазу 2 |
| **Games** | games.spirzen.ru | 🟡 stub | ⬜ | 🟡 manual artifact | |
| **Kids** | kids.spirzen.ru | 🟡 stub | ⬜ | 🟡 manual artifact | |
| **Tools** | tools.spirzen.ru | 🟡 stub | ⬜ | 🟡 manual artifact | |

Легенда: 🟢 готово · 🟡 частично · ⬜ не начато

## Terms — детали

- [x] Monorepo structure
- [x] `ecosystem-urls.json`
- [x] `@itu/portal-shared` (nav, theme, layout)
- [x] `@itu/portal-markdown` (parse glossary MD)
- [x] `@itu/portal-sync` (sync-glossary)
- [x] Страницы `/glossary/intro`, `/glossary/{letter}`
- [x] Sidebar алфавит
- [x] Light/dark theme + toggle
- [x] CI matrix build all sites
- [x] Deploy workflow + CNAME
- [ ] DNS terms.spirzen.ru → GitHub Pages (ручная настройка в GH)
- [ ] content/glossary закоммичен в it-portals (нужно для CI без clone KB)
- [ ] KB integration (wiki links, redirects)
- [ ] Federated search
- [ ] Term page: related articles/code/play (bridge)

## Lab — детали

- [x] Stub landing
- [ ] Content sync
- [ ] `/lab/[...path]` routing
- [ ] Play embeds
- [ ] Dedicated deploy repo

## Блокеры

| ID | Блокер | Решение |
|----|--------|---------|
| B1 | GH Pages: 1 domain / repo | Отдельные repos или Cloudflare — см. DEPLOY.md |
| B2 | Lab MDX components | Порт React islands / iframe |
| B3 | CI clone KB private? | Публичный Spirzen/it-knowledge-base или commit content |

## Следующие шаги (рекомендация)

1. `npm run sync:glossary` → commit `content/glossary`
2. Push → проверить CI + deploy terms
3. DNS: CNAME `terms` → `spirzen.github.io` (или Pages URL)
4. KB: external glossary URLs в wikiLinkIndex
5. Lab: sync + routing

## История

| Дата | Изменение |
|------|-----------|
| 2026-06-27 | Initial scaffold: 5 sites, terms MVP, docs, CI |
