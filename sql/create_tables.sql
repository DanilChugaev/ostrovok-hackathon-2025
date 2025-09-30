-- Предпочтительные дня для путешествий
CREATE TABLE preferred_travel_days (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL, -- например: weekends_only
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- например: '{ru: "Только выходные", en: "Weekends only"}'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Роли пользователей
-- примечание: после принятия заявки обычный пользователь становится секретным гостем, т.е. пользователю ставится роль 'secret_guest'
-- только после этого он сможет участвовать в программе "Секретный гость" и заполнять отчеты
-- при статусах заявки "На рассмотрении" и "Отклонена" пользователь остается в роли 'user'
-- в идеале, нужно сделать таблицу role_permissions и через нее предоставлять доступы ролям
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL, -- например: admin, hotel, user или secret_guest
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- например: '{ru: "Администратор системы", en: "System Administrator"}'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Программа лояльности
CREATE TABLE loyalty (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL, -- например: bronze, silver, gold или diamond
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- например: '{ru: "Бронзовый", en: "Bronze"}'
    min_score INT NOT NULL CHECK (min_score >= 0), -- минимальное количество баллов для получения статуса, например: 0 для статуса Бронзовый
    max_score INT CHECK (max_score > min_score OR max_score IS NULL), -- максимальное количество баллов у статуса, например: 500 для статуса Бронзовый
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Города
-- предполагается, что в production ready решении список городов берется из внешнего сервиса, например, из DaData
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL, -- например: moscow
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- например: '{ru: "Москва", en: "Moscow"}'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Пользователи
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    city_id INTEGER NOT NULL REFERENCES cities(id),
    username VARCHAR(50) UNIQUE NOT NULL, -- никнейм для входа в систему
    password VARCHAR(255) NOT NULL, -- в production ready решении пароль тут хранится в хешированном виде
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar_url VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(25) UNIQUE NOT NULL, -- любые международные номера могут подойти
    age INT NOT NULL CHECK (age >= 18),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Связь таблиц программы лояльности и пользователей
CREATE TABLE loyalty_users (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    loyalty_id INTEGER NOT NULL REFERENCES loyalty(id),
    score INTEGER NOT NULL CHECK (score >= 0), -- количество баллов пользователя
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Заявки на участие в программе "Секретный гость"
-- в mvp прежде чем создается заявка на участие, создается пользователь по данным из формы
-- в production ready решении в идеальном случае пользователь уже должен быть зарегистрирован, чтобы меньше полей в заявке заполнять
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    preferred_travel_day_id INTEGER NOT NULL REFERENCES preferred_travel_days(id) ON DELETE CASCADE, -- доступность для поездок (предпочтительные дни для путешествий), например: выходные, будни и т.д.
    travel_experience TEXT NOT NULL, -- опыт путешествий
    writing_reviews_experience TEXT NOT NULL, -- опыт написания отзывов
    reason TEXT NOT NULL, -- почему хотите стать секретным гостем
    agree_with_rules BOOLEAN NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Этапы отчета - фиксированные, в дальнейшем могут пополняться и изменяться
CREATE TABLE stages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL, -- например: reservation
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'),  -- название этапа, например: '{ru: "Бронирование", en: "Reservation"}'
    description JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- описание этапа, например: '{ru: "Описание этапа", en: "Description of the stage"}'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Категории - подкатегории внутри этапа
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    stage_id INTEGER NOT NULL REFERENCES stages(id) ON DELETE CASCADE,
    code VARCHAR(100) UNIQUE NOT NULL, -- например: online_booking
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'),  -- название категорий, например: '{ru: "Онлайн-бронирование", en: "Online booking"}'
    description JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- описание категории, например: '{ru: "Описание категории", en: "Category description"}'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Критерии - конкретные пункты оценки
CREATE TABLE criteria (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    code VARCHAR(100) UNIQUE NOT NULL, -- например: interface_convenience
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'),  -- например: '{ru: "Удобство интерфейса сайта/приложения", en: "Convenience of the website/application interface"}'
    description JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- описание критерия, например: '{ru: "Описание критерия", en: "Description of the criterion"}'
    is_basic BOOLEAN DEFAULT TRUE,  -- основной (true) или дополнительный (false)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Отели
-- предполагается, что она уже существует, для полноты картины описана упрощенная версия (без добавления детальных таблиц)
CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    city_id INTEGER NOT NULL REFERENCES cities(id),
    address JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- предполагается, что адрес тоже берется из внешнего сервиса (и тут будет address_id)
    code VARCHAR(255) UNIQUE NOT NULL, -- например: first_hotel
    name JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- например: '{ru: "Первый Отель", en: "First Hotel"}'
    description JSONB NOT NULL DEFAULT '{}' CHECK (name ? 'ru' AND name ? 'en'), -- например: '{ru: "Описание отеля", en: "Hotel description"}'
    stars INTEGER CHECK (stars BETWEEN 1 AND 5),  -- количество звезд отеля от 1 до 5
    price_per_night INTEGER NOT NULL CHECK (price_per_night > 0),  -- стоимость ночи
    available_dates DATE[] DEFAULT '{}', -- список доступных дат для бронирования
    photo_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Поездки пользователей
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hotel_id INTEGER NOT NULL REFERENCES hotels(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL CHECK (end_date >= start_date),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Отчеты пользователей об отелях
-- чтобы данные были достоверными, пользователь обязан посетить этот отель
CREATE TABLE user_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    trips_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    total_score INTEGER CHECK (total_score BETWEEN 1 AND 5),  -- итоговая оценка 1–5
    comment TEXT, -- итоговый вывод в свободной форме
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, trip_id)
);

-- Оценки - данные, которые заполняет пользователь
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    criterion_id INTEGER NOT NULL REFERENCES criteria(id) ON DELETE CASCADE,
    report_id INTEGER NOT NULL REFERENCES user_reports(id) ON DELETE CASCADE,
    score INTEGER CHECK (score BETWEEN 1 AND 5),  -- оценка 1–5
    comment TEXT,  -- комментарии или детали
    media_urls JSONB[],  -- массив ссылок на медиа, например: {'url1.jpg', 'url2.mp4'}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);