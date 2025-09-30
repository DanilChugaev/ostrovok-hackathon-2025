import { main } from './modules/main.ts';
import { submitRequest } from './modules/submitRequest.ts';
import { login } from './modules/login.ts';
import { hotels } from './modules/hotels.ts';
import { profile } from './modules/profile.ts';
import { reportHotel } from './modules/reportHotel.ts';

export const localizationMessages = {
  ru: {
    ...main.ru,
    ...submitRequest.ru,
    ...login.ru,
    ...hotels.ru,
    ...profile.ru,
    ...reportHotel.ru,

    secretGuest: 'Секретный гость',
    home: 'Главная',
    submitRequest: 'Подать заявку',
    changeTheme: 'Сменить тему',
    login: 'Войти',
    logout: 'Выйти',
    profile: 'Профиль',
    personalAccount: 'Личный кабинет',
    adminPanel: 'Админ панель',
    hotels: 'Отели',
    selectAHotel: 'Выбрать отель',
    links: 'Ссылки',
    hotelPhoto: 'Фото отеля',
    availableDates: 'Доступные даты:',
    night: 'ночь',
  },
  en: {
    ...main.en,
    ...submitRequest.en,
    ...login.en,
    ...hotels.en,
    ...profile.en,
    ...reportHotel.en,

    secretGuest: 'Secret guest',
    home: 'Home',
    submitRequest: 'Submit request',
    changeTheme: 'Change theme',
    login: 'Login',
    logout: 'Logout',
    profile: 'Profile',
    personalAccount: 'Personal Account',
    adminPanel: 'Admin Panel',
    hotels: 'Hotels',
    selectAHotel: 'Select a hotel',
    links: 'Links',
    hotelPhoto: 'Фото отеля',
    availableDates: 'Available dates:',
    night: 'Night',
  },
};
