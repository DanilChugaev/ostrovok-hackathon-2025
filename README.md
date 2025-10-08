# Трек «Секретный гость»

С данным решением вышел в финал, в топ 10 лучших решений из 221 команды

Решение представляет собой прототип программы "Секретный гость" для платформы бронирования.
Оно позволяет путешественникам подавать заявки на участие, оценивать отели по заданным критериям, 
передавать подробные отчеты и получать за это баллы лояльности, которые можно потратить на скидки или бесплатное проживание.

- [проблематика](https://github.com/DanilChugaev/ostrovok-hackathon-2025/blob/master/PROBLEM.md)
- [технические требования](https://github.com/DanilChugaev/ostrovok-hackathon-2025/blob/master/TECHNICAL_REQUIREMENTS.md)
- ссылка на видео-скринкаст
- [ссылка на презентацию](https://github.com/DanilChugaev/ostrovok-hackathon-2025/blob/master/presentation.pdf)

## Быстрый старт

```bash
git clone git@github.com:DanilChugaev/ostrovok-hackathon-2025.git ostrovok-hackathon-2025
cd ostrovok-hackathon-2025
docker compose up --build или make up
# открыть http://localhost:8080
```

## Зависимости и переменные окружения

Рекомендованные ресурсы:
- **Продакшен**:
  - CPU: 1 core
  - RAM: 1GB
- **Разработка**:
  - CPU: 2 cores
  - RAM: 2GB

## Сидирование

В рамках данного проекта бэкенд и база данных не использовалась. 
Все данные замоканы и будут добавлены в localStorage при запуске приложения. 
Дополнительно ничего делать не нужно.

Для будущей интеграции [в папке sql](https://github.com/DanilChugaev/ostrovok-hackathon-2025/blob/master/sql) корне проекта я расписал скрипты для создания необходимых таблиц
Также добавил максимально подробные данные, которые используются при составлении отчета об оценке отеля

## Маршруты/доступ

- `/` — UI
- `/health` — 200 OK, JSON `{ "status": "ok" }` - в UI также можно перейти по данному маршруту и увидеть ожидаемый результат
- Полное описание API сделал в отдельном файле [API](https://github.com/DanilChugaev/ostrovok-hackathon-2025/blob/master/API) в корне проекта
- Полное описание UI маршрутов сделал в отдельном файле [UI.md](https://github.com/DanilChugaev/ostrovok-hackathon-2025/blob/master/UI.md) в корне проекта
- В проекте реализована адаптивная версия

- Тестовые пользователи:
  - `user/user` - обычный пользователь, при создании пользователя устанавливается данный статус. Без возможности заполнять отчеты по поездкам, есть доступ к программе лояльности
  - `secret_guest/secret_guest` - секретный гость, статус устанавливается после одобрения заявки на участие в программе "Секретный гость". Есть доступ к заполнению отчета по поездкам, есть доступ к программе лояльности
  - `admin/admin` - администратор системы, есть доступ к админ панели
  - `hotel/hotel` - представитель отелей, есть доступ к панели управления отелями

## Команды для работы с докером

- `docker compose up --build` или `yarn docker:prod` или `make up` - продакшен режим (доступно на http://localhost:8080)
- `docker compose --profile dev up --build` или `yarn docker:dev` или `make up --profile dev` - dev режим с hot-reload (доступно на http://localhost:8081)
- `make down` - остановка
- `docker-compose logs app` - логи

## Проверка healthcheck

- curl http://localhost:8080/health  # Продакшен
- curl http://localhost:8081/health  # Разработка