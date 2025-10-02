-- примеры запросов

-- получаем все предпочтительные дни для путешествий
SELECT * FROM preferred_travel_days;

-- получаем все роли пользователей
SELECT * FROM roles;

-- добавляем новую роль
INSERT INTO roles (code, name) VALUES ('moderator', '{"ru": "Модератор", "en": "Moderator"}');

-- получаем все уровни лояльности
SELECT * FROM loyalty;

-- добавляем новый уровень лояльности
INSERT INTO loyalty (code, name, min_score, max_score) VALUES ('platinum', '{"ru": "Платиновый", "en": "Platinum"}', 10001, NULL);

-- получаем все города
SELECT * FROM cities;

-- получаем всех пользователей
SELECT * FROM users;

-- получаем пользователей с их ролями
SELECT u.username, r.name FROM users u JOIN roles r ON u.role_id = r.id;

-- добавляем нового пользователя (с ролью и городом)
INSERT INTO users (role_id, city_id, username, password, first_name, last_name, email, phone, age) VALUES
((SELECT id FROM roles WHERE code = 'user'), (SELECT id FROM cities WHERE code = 'moscow'), 'newuser', 'password', 'Иван', 'Сидоров', 'ivan.sidorov@example.com', '+79994444444', 25);

-- получаем все заявки на участие в программе
SELECT * FROM requests;

-- добавляем новую заявку (с пользователем и предпочтительным днем)
INSERT INTO requests (user_id, preferred_travel_day_id, travel_experience, writing_reviews_experience, reason, agree_with_rules) VALUES
((SELECT id FROM users WHERE username = 'user'), (SELECT id FROM preferred_travel_days WHERE code = 'anytime'), 'Много путешествую', 'Пишу отзывы часто', 'Хочу помогать', TRUE);

-- обновляем статус заявки
UPDATE requests SET status = 'approved' WHERE user_id = (SELECT id FROM users WHERE username = 'user');

-- получаем все этапы отчета
SELECT * FROM stages;

-- получаем все категории
SELECT * FROM categories;

-- добавляем новую категорию (с этапом)
INSERT INTO categories (stage_id, code, name, description) VALUES
((SELECT id FROM stages WHERE code = 'reservation'), 'new_category', '{"ru": "Новая категория", "en": "New category"}', '{"ru": "Описание", "en": "Description"}');

-- получаем все критерии
SELECT * FROM criteria;

-- добавляем новый критерий (с категорией)
INSERT INTO criteria (category_id, code, name, description, is_basic) VALUES
((SELECT id FROM categories WHERE code = 'online_booking'), 'new_criterion', '{"ru": "Новый критерий", "en": "New criterion"}', '{"ru": "Описание", "en": "Description"}', TRUE);

-- получаем все отели
SELECT * FROM hotels;

-- получаем все поездки
SELECT * FROM trips;

-- добавляем новую поездку (с пользователем и отелем)
INSERT INTO trips (user_id, hotel_id, start_date, end_date) VALUES
((SELECT id FROM users WHERE username = 'user'), (SELECT id FROM hotels WHERE code = 'grand_moscow'), '2025-10-01', '2025-10-03');

-- получаем все отчеты об отелях (hotel_reports)
SELECT * FROM hotel_reports;

-- добавляем новый отчет (с пользователем и поездкой)
INSERT INTO hotel_reports (user_id, trip_id, total_score, comment) VALUES
((SELECT id FROM users WHERE username = 'user'), (SELECT id FROM trips LIMIT 1), 4, 'Хороший отель');

-- получаем все оценки
SELECT * FROM scores;

-- добавляем новую оценку (с пользователем, критерием и отчетом)
INSERT INTO scores (user_id, criterion_id, report_id, score, comment, media_urls) VALUES
((SELECT id FROM users WHERE username = 'user'), (SELECT id FROM criteria WHERE code = 'interface_convenience'), (SELECT id FROM hotel_reports LIMIT 1), 5, 'Отлично', ARRAY['{"url": "photo.jpg"}']::JSONB[]);

-- получаем категории по этапу
SELECT c.name, s.name AS stage FROM categories c JOIN stages s ON c.stage_id = s.id WHERE s.code = 'reservation';

-- получаем критерии по категории
SELECT cr.name, ca.name AS category FROM criteria cr JOIN categories ca ON cr.category_id = ca.id WHERE ca.code = 'online_booking';

-- получаем поездки пользователя с отелями
SELECT t.start_date, t.end_date, h.name AS hotel FROM trips t JOIN users u ON t.user_id = u.id JOIN hotels h ON t.hotel_id = h.id WHERE u.username = 'user';

-- получаем отчеты с итоговыми оценками по поездкам
SELECT hr.total_score, t.start_date, h.name AS hotel FROM hotel_reports hr JOIN trips t ON hr.trip_id = t.id JOIN hotels h ON t.hotel_id = h.id;

-- получаем оценки по отчету
SELECT s.score, cr.name AS criterion FROM scores s JOIN hotel_reports hr ON s.report_id = hr.id JOIN criteria cr ON s.criterion_id = cr.id WHERE hr.id = 1;

-- получаем среднюю оценку по отелю
SELECT AVG(hr.total_score) AS average_score, h.name FROM hotel_reports hr JOIN trips t ON hr.trip_id = t.id JOIN hotels h ON t.hotel_id = h.id GROUP BY h.name;