-- Заполняем таблицу предпочтительных дней для путешествий
INSERT INTO preferred_travel_days (code, name) VALUES
('weekends_only', '{ru: "Только выходные", en: "Weekends only"}'),
('weekdays_only', '{ru: "Только будни", en: "Weekdays only"}'),
('anytime', '{ru: "В любое время", en: "Anytime"}'),
('holidays_vacations_only', '{ru: "Только праздники и отпуск", en: "Holidays and vacations only"}');

-- Заполняем таблицу ролей
INSERT INTO roles (code, name) VALUES
('admin', '{"ru": "Администратор системы", "en": "System Administrator"}'),
('hotel', '{"ru": "Менеджер отелей", "en": "Data Analyst"}'),
('user', '{"ru": "Обычный пользователь", "en": "Regular User"}'),
('secret_guest', '{"ru": "Секретный гость", "en": "Secret Guest"}');

-- Заполняем таблицу программы лояльности
INSERT INTO loyalty (code, name, min_score, max_score) VALUES
('bronze', '{"ru": "Бронзовый", "en": "Bronze"}', 0, 500),
('silver', '{"ru": "Серебряный", "en": "Silver"}', 501, 1000),
('gold', '{"ru": "Золотой", "en": "Gold"}', 1001, 4000),
('diamond', '{"ru": "Бриллиантовый", "en": "Diamond"}', 4001, NULL);

-- Заполняем таблицу городов
INSERT INTO cities (code, name) VALUES
('moscow', '{ru: "Москва", en: "Moscow"}'),
('saint_petersburg', '{ru: "Санкт-Петербург", en: "Saint Petersburg"}'),
('novosibirsk', '{ru: "Новосибирск", en: "Novosibirsk"}'),
('yekaterinburg', '{ru: "Екатеринбург", en: "Yekaterinburg"}'),
('kazan', '{ru: "Казань", en: "Kazan"}');

-- Заполняем таблицу пользователей
DO $$
DECLARE
    admin_id INTEGER (SELECT id FROM roles WHERE code = 'admin');
    hotel_id INTEGER (SELECT id FROM roles WHERE code = 'hotel');
    user_id INTEGER (SELECT id FROM roles WHERE code = 'user');
    secret_guest_id INTEGER (SELECT id FROM roles WHERE code = 'secret_guest');
    city_id INTEGER (SELECT id FROM cities WHERE code = 'moscow');
BEGIN
    INSERT INTO users (role_id, city_id, username, password, first_name, last_name, email, phone, age) VALUES
    (admin_id, city_id, 'admin', 'admin', 'Алексей', 'Иванов', 'alexey.ivanov@example.com', '+79990000000', 35),
    (hotel_id, city_id, 'hotel', 'hotel', 'Екатерина', 'Смирнова', 'ekaterina.smirnova@example.com', '+79991111111', 28),
    (user_id, city_id, 'user', 'user', 'Михаил', 'Петров', 'mikhail.petrov@example.com', '+79992222222', 22),
    (secret_guest_id, city_id, 'secret_guest', 'secret_guest', 'Ольга', 'Кузнецова', 'olga.kuznetsova@example.com', '+79993333333', 30);
END $$;

-- Заполняем таблицу лояльности для некоторых пользователей
DO $$
DECLARE
    test_user_id INTEGER (SELECT id FROM users WHERE username = 'user');
    test_secret_guest_id INTEGER (SELECT id FROM users WHERE username = 'secret_guest');
    bronze_loyalty_id INTEGER (SELECT id FROM users WHERE username = 'bronze');
    silver_loyalty_id INTEGER (SELECT id FROM users WHERE username = 'silver');
BEGIN
    INSERT INTO loyalty_users (user_id, loyalty_id, score) VALUES
    (test_user_id, bronze_loyalty_id, 100),
    (test_secret_guest_id, silver_loyalty_id, 600);
END $$;

-- Заполняем таблицу этапов
INSERT INTO stages (code, name, description) VALUES
('reservation', '{ru: "Бронирование", en: "Reservation"}', '{ru: "Оценка процесса бронирования (онлайн или по телефону/почте). Этот этап важен, так как первое впечатление формируется еще до приезда", en: "Evaluate the booking process (online or by phone/email). This step is important, as first impressions are formed even before arrival"}'),
('checkin', '{ru: "Заселение", en: "Check-in"}', '{ru: "Оценка процесса регистрации и первого впечатления от отеля", en: "Evaluation of the check-in process and first impression of the hotel"}'),
('accommodation', '{ru: "Проживание", en: "Accommodation"}', '{ru: "Оценка качества номера, удобств и взаимодействия с персоналом во время пребывания", en: "Rating of room quality, amenities and interaction with staff during the stay"}'),
('nutrition', '{ru: "Питание", en: "Nutrition"}', '{ru: "Оценка качества еды и обслуживания в ресторанах/кафе отеля", en: "Evaluation of the quality of food and service in the hotel restaurants/cafes"}'),
('checkinout', '{ru: "Выезд", en: "Check-out"}', '{ru: "Оценка процесса выселения и финального впечатления", en: "Evaluation of the eviction process and final impression"}');

-- Заполняем таблицу категорий
DO $$
DECLARE
    reservation_id INTEGER (SELECT id FROM stages WHERE code = 'reservation');
    checkin_id INTEGER (SELECT id FROM stages WHERE code = 'checkin');
    accommodation_id INTEGER (SELECT id FROM stages WHERE code = 'accommodation');
    nutrition_id INTEGER (SELECT id FROM stages WHERE code = 'nutrition');
    checkinout_id INTEGER (SELECT id FROM stages WHERE code = 'checkinout');
BEGIN
    INSERT INTO categories (stage_id, code, name, description) VALUES
    -- для этапа: Бронирование
    (reservation_id, 'online_booking', '{ru: "Онлайн-бронирование", en: "Online booking"}', '{ru: "Оценка удобства и прозрачности процесса бронирования через сайт или приложение", en: "Evaluation of the convenience and transparency of the booking process via the website or application"}'),
    (reservation_id, 'booking_by_phone', '{ru: "Бронирование по телефону/почте", en: "Booking by phone/mail"}', '{ru: "Оценка качества общения и скорости обработки запросов при бронировании по телефону или почте", en: "Evaluation of the quality of communication and speed of request processing for phone or email bookings"}'),
    -- для этапа: Заселение
    (checkin_id, 'registration_process','{ru: "Процесс регистрации", en: "Registration process"}', '{ru: "Оценка скорости, удобства и профессионализма процесса заселения", en: "Evaluation of the speed, convenience, and professionalism of the check-in process"}'),
    (checkin_id, 'first_impression','{ru: "Первое впечатление", en: "First impression"}', '{ru: "Оценка общего впечатления от прибытия в отель, включая чистоту и атмосферу", en: "Evaluation of the overall impression upon arrival at the hotel, including cleanliness and atmosphere"}'),
    -- для этапа: Проживание
    (accommodation_id, 'room', '{ru: "Номер", en: "Room"}', '{ru: "Оценка состояния и удобств номера", en: "Evaluation of the room’s condition and amenities"}'),
    (accommodation_id, 'room_service', '{ru: "Обслуживание в номере", en: "Room service"}', '{ru: "Оценка качества и скорости обслуживания в номере, включая уборку и выполнение запросов", en: "Evaluation of the quality and speed of room service, including cleaning and request fulfillment"}'),
    (accommodation_id, 'public_areas', '{ru: "Общественные зоны", en: "Public areas"}', '{ru: "Оценка чистоты, доступности и атмосферы общественных зон отеля", en: "Evaluation of the cleanliness, accessibility, and atmosphere of the hotel’s public areas"}'),
    -- для этапа: Питание
    (nutrition_id, 'food_quality', '{ru: "Качество еды", en: "Food quality"}', '{ru: "Оценка вкуса, свежести и презентации блюд", en: "Evaluation of the taste, freshness, and presentation of dishes"}'),
    (nutrition_id, 'service', '{ru: "Обслуживание", en: "Service"}', '{ru: "Оценка профессионализма и скорости работы персонала ресторана", en: "Evaluation of the professionalism and speed of restaurant staff"}'),
    -- для этапа: Выезд
    (checkinout_id, 'eviction_process', '{ru: "Процесс выселения", en: "The eviction process"}', '{ru: "Оценка скорости и прозрачности процесса выселения", en: "Evaluation of the speed and transparency of the check-out process"}'),
    (checkinout_id, 'final_impression', '{ru: "Финальное впечатление", en: "Final impression"}', '{ru: "Оценка общего впечатления от отеля при выезде, включая прощальные жесты", en: "Evaluation of the overall impression of the hotel upon departure, including farewell gestures"}');
END $$;

-- Заполняем таблицу критериев
DO $$
DECLARE
    online_booking_id INTEGER (SELECT id FROM categories WHERE code = 'online_booking');
    booking_by_phone_id INTEGER (SELECT id FROM categories WHERE code = 'booking_by_phone');
    registration_process_id INTEGER (SELECT id FROM categories WHERE code = 'registration_process');
    first_impression_id INTEGER (SELECT id FROM categories WHERE code = 'first_impression');
    room_id INTEGER (SELECT id FROM categories WHERE code = 'room');
    room_service_id INTEGER (SELECT id FROM categories WHERE code = 'room_service');
    public_areas_id INTEGER (SELECT id FROM categories WHERE code = 'public_areas');
    food_quality_id INTEGER (SELECT id FROM categories WHERE code = 'food_quality');
    service_id INTEGER (SELECT id FROM categories WHERE code = 'service');
    eviction_process_id INTEGER (SELECT id FROM categories WHERE code = 'eviction_process');
    final_impression_id INTEGER (SELECT id FROM categories WHERE code = 'final_impression');
BEGIN
INSERT INTO criteria (category_id, code, name, description, is_basic) VALUES
    -- для категории: Онлайн-бронирование
    (online_booking_id, 'interface_convenience', '{ru: "Удобство интерфейса сайта/приложения", en: "Convenience of the website/application interface"}', '{ru: "Оценка удобства и интуитивности интерфейса сайта или приложения для бронирования", en: "Evaluation of the convenience and intuitiveness of the website or application interface for booking"}', TRUE),
    (online_booking_id, 'transparency_conditions', '{ru: "Прозрачность информации о ценах и условиях", en: "Transparency of information on prices and conditions"}', '{ru: "Оценка ясности и полноты информации о ценах, условиях и дополнительных сборах", en: "Evaluation of the clarity and completeness of information on prices, conditions, and additional fees"}', TRUE),
    (online_booking_id, 'booking_processing_speed', '{ru: "Скорость обработки бронирования", en: "Booking processing speed"}', '{ru: "Оценка времени, необходимого для завершения процесса бронирования", en: "Evaluation of the time required to complete the booking process"}', TRUE),
    (online_booking_id, 'additional_options', '{ru: "Наличие дополнительных опций", en: "Availability of additional options"}', '{ru: "Оценка возможности выбора дополнительных параметров, таких как тип номера или кровати", en: "Evaluation of the availability of additional options, such as room or bed type selection"}', FALSE),
    (online_booking_id, 'booking_confirmation_quality', '{ru: "Качество подтверждения брони", en: "Quality of booking confirmation"}', '{ru: "Оценка четкости и информативности письма или уведомления о подтверждении брони", en: "Evaluation of the clarity and informativeness of the booking confirmation letter or notification"}', FALSE),
    -- для категории: Бронирование по телефону/почте
    (booking_by_phone_id, 'politeness_operator', '{ru: "Вежливость оператора", en: "Politeness of the operator"}', '{ru: "Оценка уровня вежливости и профессионализма оператора при бронировании", en: "Evaluation of the operator’s politeness and professionalism during booking"}', TRUE),
    (booking_by_phone_id, 'request_response_speed', '{ru: "Скорость ответа на запрос", en: "Request response speed"}', '{ru: "Оценка времени, необходимого для ответа на запрос по телефону или почте", en: "Evaluation of the time required to respond to a phone or email request"}', TRUE),
    (booking_by_phone_id, 'information_accuracy', '{ru: "Точность предоставленной информации", en: "Accuracy of the information provided"}', '{ru: "Оценка точности и полноты информации, предоставленной оператором", en: "Evaluation of the accuracy and completeness of the information provided by the operator"}', FALSE),
    (booking_by_phone_id, 'proactivity', '{ru: "Проактивность", en: "Proactivity"}', '{ru: "Оценка инициативности оператора в предложении альтернативных вариантов", en: "Evaluation of the operator’s proactivity in offering alternative options"}', FALSE),
    -- для категории: Процесс регистрации
    (registration_process_id, 'check_in_speed', '{ru: "Скорость заселения", en: "Check-in speed"}', '{ru: "Оценка времени, затраченного на процесс заселения от прибытия до получения ключа", en: "Evaluation of the time spent on the check-in process from arrival to receiving the key"}', TRUE),
    (registration_process_id, 'reception_staff', '{ru: "Вежливость персонала на ресепшен", en: "Reception staff courtesy"}', '{ru: "Оценка уровня вежливости и профессионализма персонала на ресепшен", en: "Evaluation of the politeness and professionalism of the reception staff"}', TRUE),
    (registration_process_id, 'request_fulfillment', '{ru: "Точность выполнения запросов", en: "Request fulfillment accuracy"}', '{ru: "Оценка выполнения специальных запросов, таких как выбор этажа или вида из окна", en: "Evaluation of fulfilling special requests, such as floor or window view selection"}', TRUE),
    (registration_process_id, 'provision_hotel_policies', '{ru: "Предоставление информации о правилах отеля", en: "Provision of information about hotel policies"}', '{ru: "Оценка полноты и ясности предоставленной информации о правилах отеля", en: "Evaluation of the completeness and clarity of information provided about hotel policies"}', FALSE),
    (registration_process_id, 'additional_services', '{ru: "Предложение дополнительных услуг", en: "Offering additional services"}', '{ru: "Оценка предложения дополнительных услуг, таких как поздний выезд или трансфер", en: "Evaluation of offering additional services, such as late check-out or transfer"}', FALSE),
    -- для категории: Первое впечатление
    (first_impression_id, 'cleanliness_lobby', '{ru: "Чистота лобби и общественных зон", en: "Cleanliness of the lobby and public areas"}', '{ru: "Оценка чистоты и порядка в лобби и других общественных зонах", en: "Evaluation of the cleanliness and order in the lobby and other public areas"}', TRUE),
    (first_impression_id, 'ambience', '{ru: "Атмосфера", en: "Ambience"}', '{ru: "Оценка общей атмосферы, включая освещение, музыку и запах в лобби", en: "Evaluation of the overall atmosphere, including lighting, music, and scent in the lobby"}', TRUE),
    (first_impression_id, 'accessibility_of_signs', '{ru: "Доступность указателей", en: "Accessibility of signs"}', '{ru: "Оценка наличия и понятности указателей к ключевым зонам отеля", en: "Evaluation of the presence and clarity of signs to key hotel areas"}', FALSE),
    -- для категории: Номер
    (room_id, 'room_cleanliness', '{ru: "Чистота номера", en: "Room cleanliness"}', '{ru: "Оценка уровня чистоты и порядка в номере", en: "Evaluation of the level of cleanliness and order in the room"}', TRUE),
    (room_id, 'equipment_serviceability', '{ru: "Исправность оборудования", en: "Equipment serviceability"}', '{ru: "Оценка исправности и функциональности оборудования в номере", en: "Evaluation of the functionality and condition of room facilities"}', TRUE),
    (room_id, 'comfortable_bed_linens', '{ru: "Удобство кровати и постельного белья", en: "Comfortable bed and linens"}', '{ru: "Оценка комфорта кровати и качества постельного белья", en: "Evaluation of the comfort of the bed and quality of linens"}', TRUE),
    (room_id, 'soundproofing', '{ru: "Шумоизоляция", en: "Soundproofing"}', '{ru: "Оценка уровня шумоизоляции в номере", en: "Evaluation of the level of soundproofing in the room"}', FALSE),
    (room_id, 'available_power_outlets_lighting', '{ru: "Доступность розеток и освещения", en: "Available power outlets and lighting"}', '{ru: "Оценка наличия и удобства розеток и освещения в номере", en: "Evaluation of the availability and convenience of power outlets and lighting in the room"}', FALSE),
    (room_id, 'minibar_toilet_supplies_refilled', '{ru: "Пополнение мини-бара/гигиенических принадлежностей", en: "Minibar/toilet supplies refilled"}', '{ru: "Оценка регулярности и качества пополнения мини-бара и гигиенических принадлежностей", en: "Evaluation of the regularity and quality of minibar and toilet supplies replenishment"}', FALSE),
    -- для категории: Обслуживание в номере
    (room_service_id, 'speed_room_cleaning', '{ru: "Скорость уборки номера", en: "Speed of room cleaning"}', '{ru: "Оценка времени, затраченного на уборку номера", en: "Evaluation of the time spent on room cleaning"}', TRUE),
    (room_service_id, 'quality_cleaning', '{ru: "Качество уборки", en: "Quality of cleaning"}', '{ru: "Оценка тщательности и качества уборки номера", en: "Evaluation of the thoroughness and quality of room cleaning"}', TRUE),
    (room_service_id, 'courtesy_maids', '{ru: "Вежливость горничных", en: "Courtesy of maids"}', '{ru: "Оценка уровня вежливости и профессионализма горничных", en: "Evaluation of the politeness and professionalism of maids"}', FALSE),
    (room_service_id, 'responsiveness_requests', '{ru: "Реакция на запросы", en: "Responsiveness to requests"}', '{ru: "Оценка скорости и качества выполнения запросов гостей", en: "Evaluation of the speed and quality of fulfilling guest requests"}', FALSE),
    -- для категории: Общественные зоны
    (public_areas_id, 'cleanliness_pool_gym_spa', '{ru: "Чистота бассейна, спортзала, спа", en: "Cleanliness of the pool, gym, and spa"}', '{ru: "Оценка чистоты и порядка в бассейне, спортзале и спа", en: "Evaluation of the cleanliness and order in the pool, gym, and spa"}', TRUE),
    (public_areas_id, 'availability_amenities', '{ru: "Доступность удобств", en: "Availability of amenities"}', '{ru: "Оценка наличия и доступности удобств в общественных зонах", en: "Evaluation of the availability and accessibility of amenities in public areas"}', TRUE),
    (public_areas_id, 'wifi_quality_public_areas', '{ru: "Качество Wi-Fi в общественных зонах", en: "Wi-Fi quality in public areas"}', '{ru: "Оценка скорости и стабильности Wi-Fi в общественных зонах", en: "Evaluation of the speed and stability of Wi-Fi in public areas"}', FALSE),
    (public_areas_id, 'atmosphere_bar_restaurant', '{ru: "Атмосфера в баре/ресторане", en: "Atmosphere in the bar/restaurant"}', '{ru: "Оценка уюта и атмосферы в баре или ресторане отеля", en: "Evaluation of the coziness and atmosphere in the hotel’s bar or restaurant"}', FALSE),
    -- для категории: Качество еды
    (food_quality_id, 'taste_dishes', '{ru: "Вкус блюд", en: "Taste of the dishes"}', '{ru: "Оценка вкусовых качеств блюд в ресторане отеля", en: "Evaluation of the taste qualities of dishes in the hotel restaurant"}', TRUE),
    (food_quality_id, 'menu_variety', '{ru: "Разнообразие меню", en: "Menu variety"}', '{ru: "Оценка разнообразия предлагаемых блюд в меню", en: "Evaluation of the variety of dishes offered on the menu"}', TRUE),
    (food_quality_id, 'freshness_products', '{ru: "Свежесть продуктов", en: "Freshness of the products"}', '{ru: "Оценка свежести и качества используемых продуктов", en: "Evaluation of the freshness and quality of the products used"}', TRUE),
    (food_quality_id, 'food_presentation', '{ru: "Презентация блюд", en: "Food presentation"}', '{ru: "Оценка внешнего вида и подачи блюд", en: "Evaluation of the appearance and presentation of dishes"}', FALSE),
    (food_quality_id, 'menu_dietary_compliance', '{ru: "Соответствие меню диетическим требованиям", en: "Menu compliance with dietary requirements"}', '{ru: "Оценка наличия и качества блюд, соответствующих диетическим требованиям", en: "Evaluation of the availability and quality of dishes meeting dietary requirements"}', FALSE),
    -- для категории: Обслуживание
    (service_id, 'politeness_waiters', '{ru: "Вежливость официантов", en: "Politeness of waiters"}', '{ru: "Оценка уровня вежливости и профессионализма официантов", en: "Evaluation of the politeness and professionalism of waiters"}', TRUE),
    (service_id, 'speed_serving_dishes', '{ru: "Скорость подачи блюд", en: "Speed of serving dishes"}', '{ru: "Оценка времени, затраченного на подачу блюд", en: "Evaluation of the time spent on serving dishes"}', TRUE),
    (service_id, 'cleanliness_tables_dishes', '{ru: "Чистота столов и посуды", en: "Cleanliness of tables and dishes"}', '{ru: "Оценка чистоты столов, посуды и столовых приборов", en: "Evaluation of the cleanliness of tables, dishes, and cutlery"}', FALSE),
    (service_id, 'response_complaints_requests', '{ru: "Реакция на жалобы/просьбы", en: "Response to complaints/requests"}', '{ru: "Оценка скорости и качества реакции на жалобы или просьбы гостей", en: "Evaluation of the speed and quality of response to guest complaints or requests"}', FALSE),
    -- для категории: Процесс выселения
    (eviction_process_id, 'speed_check_out', '{ru: "Скорость выселения", en: "Speed of check-out"}', '{ru: "Оценка времени, затраченного на процесс выселения", en: "Evaluation of the time spent on the check-out process"}', TRUE),
    (eviction_process_id, 'staff_courtesy', '{ru: "Вежливость персонала", en: "Staff courtesy"}', '{ru: "Оценка уровня вежливости персонала при выселении", en: "Evaluation of the politeness of staff during check-out"}', TRUE),
    (eviction_process_id, 'transparency_final_bill', '{ru: "Прозрачность финального счета", en: "Transparency of final bill"}', '{ru: "Оценка ясности и корректности финального счета", en: "Evaluation of the clarity and correctness of the final bill"}', TRUE),
    (eviction_process_id, 'offer_hotel_questionnaire', '{ru: "Предложение заполнить анкету отеля", en: "Offer to fill out a hotel questionnaire"}', '{ru: "Оценка наличия предложения заполнить анкету обратной связи", en: "Evaluation of the offer to fill out a hotel feedback questionnaire"}', FALSE),
    (eviction_process_id, 'assistance_luggage_transportation', '{ru: "Помощь с багажом/транспортом", en: "Assistance with luggage/transportation"}', '{ru: "Оценка помощи с багажом или организацией транспорта при выезде", en: "Evaluation of assistance with luggage or transportation arrangements during check-out"}', FALSE),
    -- для категории: Финальное впечатление
    (final_impression_id, 'overall_satisfaction_stay', '{ru: "Общее удовлетворение пребыванием", en: "Overall satisfaction with the stay"}', '{ru: "Оценка общего уровня удовлетворенности пребыванием в отеле", en: "Evaluation of the overall level of satisfaction with the hotel stay"}', TRUE),
    (final_impression_id, 'presence_farewell_gestures', '{ru: "Наличие прощальных жестов", en: "Presence of farewell gestures"}', '{ru: "Оценка наличия прощальных жестов, таких как сувениры или персонализированные пожелания", en: "Evaluation of the presence of farewell gestures, such as souvenirs or personalized wishes"}', FALSE);
END $$;

-- Заполняем таблицу отелей
DO $$
DECLARE
admin_id INTEGER (SELECT id FROM roles WHERE code = 'admin');
    moscow_id INTEGER (SELECT id FROM cities WHERE code = 'moscow');
    saint_petersburg_id INTEGER (SELECT id FROM cities WHERE code = 'saint_petersburg');
    novosibirsk_id INTEGER (SELECT id FROM cities WHERE code = 'novosibirsk');
    yekaterinburg_id INTEGER (SELECT id FROM cities WHERE code = 'yekaterinburg');
    kazan_id INTEGER (SELECT id FROM cities WHERE code = 'kazan');
BEGIN
    INSERT INTO hotels (city_id, address, code, name, description, stars, price_per_night, available_dates, photo_url) VALUES
    (moscow_id, '{ru: "ул. Тверская, д. 10", en: "Tverskaya St., Building 10"}', 'grand_moscow', '{ru: "Гранд Москва", en: "Grand Moscow"}', '{ru: "Роскошный отель в центре Москвы с видом на Красную площадь", en: "Luxury hotel in the heart of Moscow with a view of Red Square"}', 5, 15000, ARRAY['2025-10-01', '2025-10-02', '2025-10-03']::DATE[], 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'),
    (saint_petersburg_id, '{ru: "наб. Канала Грибоедова, д. 5", en: "emb. Kanala Griboyedova, 5"}', 'neva_palace', '{ru: "Нева Палас", en: "Neva Palace"}', '{ru: "Элегантный отель на берегу Невы с исторической атмосферой", en: "Elegant hotel on the Neva riverbank with a historic atmosphere"}', 4, 12000, ARRAY['2025-10-05', '2025-10-06', '2025-10-07']::DATE[], 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'),
    (novosibirsk_id, '{ru: "ул. Сибирская, д. 15", en: "st. Sibirskaya, 15"}', 'sibir_star', '{ru: "Сибирская Звезда", en: "Siberian Star"}', '{ru: "Современный отель в центре Новосибирска с отличным сервисом", en: "Modern hotel in the center of Novosibirsk with excellent service"}', 3, 8000, ARRAY['2025-10-10', '2025-10-11']::DATE[], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'),
    (yekaterinburg_id, '{ru: "ул. Уральская, д. 20", en: "st. Uralskaya, 20"}', 'ural_comfort', '{ru: "Урал Комфорт", en: "Ural Comfort"}', '{ru: "Уютный отель с удобным расположением в Екатеринбурге", en: "Cozy hotel with a convenient location in Yekaterinburg"}', 4, 10000, ARRAY['2025-10-15', '2025-10-16', '2025-10-17']::DATE[], 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80'),
    (kazan_id, '{ru: "ул. Кремлевская, д. 12", en: "st. Kremlevskaya, 12"}', 'kazan_riviera', '{ru: "Казань Ривьера", en: "Kazan Riviera"}', '{ru: "Отель с панорамным видом на Казанский Кремль", en: "Hotel with a panoramic view of the Kazan Kremlin"}', 5, 18000, ARRAY['2025-10-20', '2025-10-21', '2025-10-22']::DATE[], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
END $$;