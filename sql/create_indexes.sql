-- Для таблицы preferred_travel_days: не обязательно, так как таблица маленькая
CREATE INDEX idx_preferred_travel_days_code ON preferred_travel_days(code);

-- Для таблицы roles: не обязательно, так как таблица маленькая
CREATE INDEX idx_roles_code ON roles(code);

-- Для таблицы loyalty: не обязательно, так как таблица маленькая
CREATE INDEX idx_loyalty_code ON loyalty(code);

-- Для таблицы cities: поиск по code/name
CREATE INDEX idx_cities_code ON cities(code);
CREATE INDEX idx_cities_name ON cities USING GIN(name);  -- для JSONB поиска

-- Для таблицы users: поиск по role, city, email, phone
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_city_id ON users(city_id);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Для таблицы loyalty_users: поиск по user/loyalty
CREATE INDEX idx_loyalty_users_loyalty_id ON loyalty_users(loyalty_id);
CREATE INDEX idx_loyalty_users_score ON loyalty_users(score);

-- Для таблицы requests: поиск по user/status
CREATE INDEX idx_requests_user_id ON requests(user_id);
CREATE INDEX idx_requests_status ON requests(status);

-- Для таблицы stages: не обязательно, так как таблица маленькая
CREATE INDEX idx_stages_code ON stages(code);

-- Для таблицы categories: поиск по stage
CREATE INDEX idx_categories_stage_id ON categories(stage_id);
CREATE INDEX idx_categories_code ON categories(code);

-- Для таблицы criteria: поиск по category
CREATE INDEX idx_criteria_category_id ON criteria(category_id);
CREATE INDEX idx_criteria_code ON criteria(code);

-- Для таблицы hotels: поиск по city, code, stars, price
CREATE INDEX idx_hotels_city_id ON hotels(city_id);
CREATE INDEX idx_hotels_code ON hotels(code);
CREATE INDEX idx_hotels_stars ON hotels(stars);
CREATE INDEX idx_hotels_price_per_night ON hotels(price_per_night);

-- Для таблицы scores: по user, criterion, report
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_criterion_id ON scores(criterion_id);
CREATE INDEX idx_scores_report_id ON scores(report_id);

-- Для таблицы trips: поиск по hotel, user, dates
CREATE INDEX idx_trips_hotel_id ON trips(hotel_id);
CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_trips_start_date ON trips(start_date);
CREATE INDEX idx_trips_end_date ON trips(end_date);

-- Для таблицы user_reports: поиск по user, trip, total_score
CREATE INDEX idx_user_reports_user_id ON user_reports(user_id);
CREATE INDEX idx_user_reports_trip_id ON user_reports(trip_id);
CREATE INDEX idx_user_reports_total_score ON user_reports(total_score);