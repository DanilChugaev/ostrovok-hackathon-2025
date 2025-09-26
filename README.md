# Трек «Секретный гость»

Одно-два предложения, что делает решение.

- ссылка на видео-скринкаст (обязательно)
- ссылка на развёрнутый сервис (опционально)

## Быстрый старт

```bash
git clone https://github.com/ostrovok-hackathon-2025/doc
cd doc
cp .env.example .env   # если нужно
docker compose up --build
# открыть http://localhost:8080
```

## Зависимости и переменные окружения

Рекомендованные ресурсы:
- X CPU cores
- YGB RAM

- Postgres 16 (в `docker-compose.yml` как `db`)
- Redis (опционально)

- `APP_PORT` (по умолчанию `8080`)
- `DB_URL` (пример: `postgres://app:app@db:5432/app`)

## Сидирование

```bash
# пример: создаем таблицы/данные
docker compose exec app bash -lc "python manage.py migrate && python manage.py loaddata seed.json"
```

## Маршруты/доступ

- `/` — UI
- `/health` — 200 OK, JSON `{ "status": "ok" }`
- Тестовый пользователь: `admin / admin123` (если релевантно)

## Если нет веб-интерфейса

Точные команды запуска, формат входных данных, пример вызова и пример вывода.

