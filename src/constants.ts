import { localizationMessages } from './localization';

export const DARK_MODE_CLASS = 'dark-mode';
export const STORAGE_MODE_KEY = 'current-theme-mode';
export const STORAGE_LANGUAGE_KEY = 'app-language';
export const NOTIFICATION_LIFE = 5000;
export const MIN_COUNT_CHARS_IN_FIELD = 1;
export const MIN_COUNT_CHARS_IN_USERNAME = 3;
export const MAX_COUNT_CHARS_IN_FIELD = 255;
export const MAX_COUNT_CHARS_IN_TEXTAREA_FIELD = 1000;

export const LOCALES = Object.keys(localizationMessages);

export const PAGES = {
  Main: '/',
  Login: '/login',
  SubmitRequest: '/submit-request',
  Profile: '/profile', // todo: добавить /profile/:id для просмотра инфы о гостях
  Admin: '/admin',
  HotelAccount: '/hotel-account',
  Hotels: '/hotels',
  HotelReport: '/hotel-report',
  HotelReports: '/hotel-reports',
};

export const API = {
  Login: '/api/v1/login',
  Reviews: '/api/v1/reviews',
  Cities: '/api/v1/cities',
  AccessibilityListForTravel: '/api/v1/accessibility-list-for-travel',
  SendRequestForm: '/api/v1/send-request-form',
  Trips: '/api/v1/trips',
  Hotels: '/api/v1/hotels',
  Awards: '/api/v1/awards',
  Loyalty: '/api/v1/loyalty',
  HotelReports: '/api/v1/hotel-reports',
  HotelReport: '/api/v1/hotel-report',
  HotelReportCreate: '/api/v1/hotel-report/create',
};

export const SUBMIT_REQUEST_FORM_STAGES = {
  User: '1',
  Experience: '2',
  Preferences: '3',
};

export const PROFILE_TABS = {
  Trips: '1',
  Awards: '2',
};

export const LOYALTY_STATUS_MAP = {
  bronze: 'Бронзовый',
  silver: 'Серебрянный',
  gold: 'Золотой',
  diamond: 'Бриллиантовый',
};
