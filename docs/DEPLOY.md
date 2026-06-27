# Деплой status.spirzen.ru

## GitHub Pages

1. Repo **Spirzen/it-portals** → Settings → Pages.
2. Source: **GitHub Actions**.
3. Custom domain: `status.spirzen.ru` (файл `public/CNAME` уже есть).
4. Enforce HTTPS — включить после верификации DNS.

## DNS

```
status.spirzen.ru  CNAME  spirzen.github.io
```

(или CNAME на `<user>.github.io` — как настроено для остальных поддоменов.)

## Workflows

| Workflow | Триггер | Действие |
|----------|---------|----------|
| `deploy.yml` | push main | check status → build → GitHub Pages |
| `update-status.yml` | cron */10 min | check status → commit `status.json` |
| `ci.yml` | PR / push | build без деплоя |

## Переменные сборки

| Env | Значение prod |
|-----|---------------|
| `IT_STATUS_SITE` | `https://status.spirzen.ru` |
| `IT_STATUS_BASE` | `/` |

## Локальная проверка перед push

```bash
npm ci
npm run check:status
npm run build
npm run preview   # http://localhost:4335
```

## Первый деплой

1. Push в `main`.
2. Дождаться `Deploy to GitHub Pages`.
3. Проверить https://status.spirzen.ru — 18 карточек, summary bar.
4. Убедиться, что `update-status.yml` имеет permission на push (для bot commit).
