# Архитектура status.spirzen.ru

## Роль

**it-portals** — единый **хаб навигации и статуса** экосистемы «Вселенная IT».

Раньше репозиторий задумывался как monorepo контентных порталов (terms, lab, …).  
Сейчас каждый контентный портал живёт в **отдельном repo**; **it-portals** отвечает только за:

- визуальную сетку всех сервисов;
- быстрые переходы на поддомены;
- мониторинг доступности (snapshot + live refresh).

```
                    ┌─────────────────────┐
                    │  status.spirzen.ru  │
                    │     (it-portals)    │
                    └──────────┬──────────┘
           links + status      │
    ┌──────────┬───────────────┼───────────────┬──────────┐
    ▼          ▼               ▼               ▼          ▼
spirzen.ru  code.spirzen   terms.spirzen   play.spirzen  …
            (it-code)       (it-terms)      (it-play)
```

## Стек

| Слой | Технология |
|------|------------|
| UI | Astro 5, static output |
| Данные сервисов | `src/data/services.json` |
| Snapshot статусов | `public/status.json` (генерируется) |
| Проверка | Node `fetch` в CI / prebuild |
| Live refresh | favicon ping в браузере |
| Деплой | GitHub Pages → status.spirzen.ru |

## Источник правды

- **Список сервисов** — `src/data/services.json` (id, name, domain, url, category, accent, description).
- **URL всех доменов** — `ecosystem-urls.json` (для синхронизации с nav в других repo).
- **Статусы** — `public/status.json`, не редактируется вручную.

## Категории карточек

| Ключ | Label | Примеры |
|------|-------|---------|
| `core` | Ядро | spirzen, search, assets |
| `learn` | Обучение | terms, lab, exam, quiz, kids |
| `create` | Создание | code, play, html, writer, schema, sql |
| `tools` | Инструменты | tools, color, random |
| `play` | Игра | games |

## Ограничения live-проверки в браузере

Cross-origin `fetch` блокируется CORS на большинстве GH Pages.  
Live refresh использует загрузку `/favicon.ico` через `Image()` — это даёт бинарный up/down, но не HTTP-код.

Точные коды и latency — только из server-side `check-status.mjs`.

## Добавление нового сервиса

1. Запись в `src/data/services.json`.
2. Домен в `ecosystem-urls.json`.
3. Push → CI пересоберёт хаб; cron обновит статус.
