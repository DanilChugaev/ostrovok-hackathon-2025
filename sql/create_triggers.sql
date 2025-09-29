-- Функция для обновления поля updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Таблица preferred_travel_days
CREATE TRIGGER trigger_update_preferred_travel_days_updated_at
BEFORE UPDATE ON preferred_travel_days
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица roles
CREATE TRIGGER trigger_update_roles_updated_at
BEFORE UPDATE ON roles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица loyalty
CREATE TRIGGER trigger_update_loyalty_updated_at
BEFORE UPDATE ON loyalty
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица cities
CREATE TRIGGER trigger_update_cities_updated_at
BEFORE UPDATE ON cities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица users
CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица loyalty_users
CREATE TRIGGER trigger_update_loyalty_users_updated_at
BEFORE UPDATE ON loyalty_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица requests
CREATE TRIGGER trigger_update_requests_updated_at
BEFORE UPDATE ON requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица stages
CREATE TRIGGER trigger_update_stages_updated_at
BEFORE UPDATE ON stages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица categories
CREATE TRIGGER trigger_update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица criteria
CREATE TRIGGER trigger_update_criteria_updated_at
BEFORE UPDATE ON criteria
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица hotels
CREATE TRIGGER trigger_update_hotels_updated_at
BEFORE UPDATE ON hotels
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица scores
CREATE TRIGGER trigger_update_scores_updated_at
BEFORE UPDATE ON scores
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица trips
CREATE TRIGGER trigger_update_trips_updated_at
BEFORE UPDATE ON trips
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица user_reports
CREATE TRIGGER trigger_update_user_reports_updated_at
BEFORE UPDATE ON user_reports
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();