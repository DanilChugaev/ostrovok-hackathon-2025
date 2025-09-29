export const DARK_MODE_CLASS = 'dark-mode';
export const STORAGE_MODE_KEY = 'current-theme-mode';
export const NOTIFICATION_LIFE = 5000;
export const MIN_COUNT_CHARS_IN_FIELD = 1;
export const MIN_COUNT_CHARS_IN_USERNAME = 3;
export const MAX_COUNT_CHARS_IN_FIELD = 255;
export const MAX_COUNT_CHARS_IN_TEXTAREA_FIELD = 1000;

export const PAGES = {
  Main: '/',
  Login: '/login',
  SubmitRequest: '/submit-request',
  Profile: '/profile', // todo: добавить /profile/:id для просмотра инфы о гостях
  Admin: '/admin',
  HotelAccount: '/hotel-account',
  Hotels: '/hotels',
  ReportHotel: '/report-hotel',
};

export const API = {
  Login: '/api/login',
  Reviews: '/api/reviews',
  Cities: '/api/cities',
  AccessibilityListForTravel: '/api/accessibility-list-for-travel',
  SendRequestForm: '/api/send-request-form',
  Trips: '/api/trips',
  Hotels: '/api/hotels',
  Awards: '/api/awards',
  Loyalty: '/api/loyalty',
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
