# status.spirzen.ru — хаб экосистемы «Вселенная IT»

Единая визуальная точка входа ко **всем сервисам** экосистемы [spirzen.ru](https://spirzen.ru): карточки с переходами, фильтрация по категориям и **мониторинг доступности**.

| | |
|---|---|
| **Прод** | [status.spirzen.ru](https://status.spirzen.ru) |
| **Локально** | http://localhost:4335 |
| **Репозиторий** | [Spirzen/it-portals](https://github.com/Spirzen/it-portals) |

---

## Сервисы в хабе

| Домен | Назначение |
|-------|------------|
| spirzen.ru | Энциклопедия |
| search.spirzen.ru | Поиск |
| assets.spirzen.ru | CDN / медиа |
| terms.spirzen.ru | Глоссарий |
| lab.spirzen.ru | Лаборатория |
| exam.spirzen.ru | Экзамены |
| quiz.spirzen.ru | Квизы |
| kids.spirzen.ru | Для детей |
| code.spirzen.ru | Примеры кода |
| play.spirzen.ru | Интерактив |
| html.spirzen.ru | WebEditor |
| writer.spirzen.ru | Writer |
| schema.spirzen.ru | Схемы |
| sql.spirzen.ru | SQL |
| tools.spirzen.ru | Инструменты |
| color.spirzen.ru | Цвета |
| random.spirzen.ru | Генераторы |
| games.spirzen.ru | Игры |

Список и метаданные — [`src/data/services.json`](./src/data/services.json).

---

## Быстрый старт

```bash
npm install
npm run dev          # http://localhost:4335
npm run check:status # обновить public/status.json
npm run build
```

`prebuild` автоматически проверяет все сервисы перед сборкой.

---

## Статус доступности

1. **Серверная проверка** — `scripts/check-status.mjs` (HEAD/GET, таймаут 12 с) пишет `public/status.json`.
2. **При сборке** — `prebuild` обновляет snapshot.
3. **По расписанию** — workflow `update-status.yml` каждые 10 минут коммитит свежий `status.json`.
4. **В браузере** — кнопка «Обновить» делает live-проверку через favicon (без CORS).

Состояния: `up` · `degraded` (HTTP 4xx) · `down` · `checking`.

---

## Документация

| Файл | Содержание |
|------|------------|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Роль хаба в экосистеме |
| [docs/DEPLOY.md](./docs/DEPLOY.md) | GitHub Pages, DNS, CI |
| [ecosystem-urls.json](./ecosystem-urls.json) | Все домены (для синхронизации с другими repo) |

---

## Связанные репозитории

Каждый поддомен — отдельный repo (1 repo = 1 GitHub Pages domain):

- [it-knowledge-base](https://github.com/Spirzen/it-knowledge-base) — spirzen.ru
- [it-terms](https://github.com/Spirzen/it-terms), [it-lab](https://github.com/Spirzen/it-lab), [it-games](https://github.com/Spirzen/it-games), [it-kids](https://github.com/Spirzen/it-kids), [it-tools](https://github.com/Spirzen/it-tools)
- [it-code-examples](https://github.com/Spirzen/it-code-examples), [it-play](https://github.com/Spirzen/it-play)

**it-portals** — только хаб и status page, не контентные порталы.

---

## Лицензия

MIT — см. [LICENSE](./LICENSE).

Автор: **Тагиров Тимур Владиславович**
