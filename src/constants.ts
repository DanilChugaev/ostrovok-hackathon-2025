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
  HotelReports: '/hotel-reports',
  HotelReport: '/hotel-report',
  HotelReportStages: '/hotel-report/stages',
  HotelReportCategories: '/hotel-report/stages/categories',
  HotelReportCriteria: '/hotel-report/stages/categories/criteria',
};

export const API = {
  Login: '/api/v1/login',
  Reviews: '/api/v1/reviews',
  Cities: '/api/v1/cities',
  AccessibilityListForTravel: '/api/v1/accessibility-list-for-travel',
  SendRequestForm: '/api/v1/send-request-form',
  Trips: '/api/v1/trips',
  TripCreate: '/api/v1/trip/create',
  Hotels: '/api/v1/hotels',
  Awards: '/api/v1/awards',
  Loyalty: '/api/v1/loyalty',
  HotelReports: '/api/v1/hotel-reports',
  HotelReportById: '/api/v1/hotel-report',
  HotelReportStagesByReportId: '/api/v1/hotel-report/stages',
  HotelReportCategoriesByStageId: '/api/v1/hotel-report/categories',
  HotelReportCriteriaByCategoryId: '/api/v1/hotel-report/criteria',
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

export const HOTEL_REPORT_CODE_ICON_MAP: Record<string, string> = {
  reservation: 'pi pi-ticket',
  checkin: 'pi pi-sign-in',
  accommodation: 'pi pi-home',
  nutrition: 'pi pi-wallet',
  checkinout: 'pi pi-arrows-h',
  online_booking: 'pi pi-globe',
  booking_by_phone: 'pi pi-phone',
  registration_process: 'pi pi-file-edit',
  first_impression: 'pi pi-eye',
  room: 'pi pi-building',
  room_service: 'pi pi-bell',
  public_areas: 'pi pi-map',
  food_quality: 'pi pi-star',
  service: 'pi pi-users',
  eviction_process: 'pi pi-sign-out',
  final_impression: 'pi pi-heart',
  interface_convenience: 'pi pi-th-large',
  transparency_conditions: 'pi pi-info-circle',
  booking_processing_speed: 'pi pi-clock',
  additional_options: 'pi pi-plus-circle',
  booking_confirmation_quality: 'pi pi-check-circle',
  politeness_operator: 'pi pi-smile',
  request_response_speed: 'pi pi-bolt',
  information_accuracy: 'pi pi-check-square',
  proactivity: 'pi pi-lightbulb',
  check_in_speed: 'pi pi-clock',
  reception_staff: 'pi pi-user',
  request_fulfillment: 'pi pi-check',
  provision_hotel_policies: 'pi pi-book',
  additional_services: 'pi pi-plus',
  cleanliness_lobby: 'pi pi-shield',
  ambience: 'pi pi-sun',
  accessibility_of_signs: 'pi pi-map-marker',
  room_cleanliness: 'pi pi-shield',
  equipment_serviceability: 'pi pi-wrench',
  comfortable_bed_linens: 'pi pi-bed',
  soundproofing: 'pi pi-volume-off',
  available_power_outlets_lighting: 'pi pi-plug',
  minibar_toilet_supplies_refilled: 'pi pi-glass',
  speed_room_cleaning: 'pi pi-clock',
  quality_cleaning: 'pi pi-star',
  courtesy_maids: 'pi pi-smile',
  responsiveness_requests: 'pi pi-comment',
  cleanliness_pool_gym_spa: 'pi pi-shield',
  availability_amenities: 'pi pi-th-large',
  wifi_quality_public_areas: 'pi pi-wifi',
  atmosphere_bar_restaurant: 'pi pi-glass-cheers',
  taste_dishes: 'pi pi-utensils',
  menu_variety: 'pi pi-list',
  freshness_products: 'pi pi-leaf',
  food_presentation: 'pi pi-image',
  menu_dietary_compliance: 'pi pi-heart',
  politeness_waiters: 'pi pi-smile',
  speed_serving_dishes: 'pi pi-clock',
  cleanliness_tables_dishes: 'pi pi-shield',
  response_complaints_requests: 'pi pi-comment',
  speed_check_out: 'pi pi-clock',
  staff_courtesy: 'pi pi-smile',
  transparency_final_bill: 'pi pi-file',
  offer_hotel_questionnaire: 'pi pi-question-circle',
  assistance_luggage_transportation: 'pi pi-briefcase',
  overall_satisfaction_stay: 'pi pi-star-fill',
  presence_farewell_gestures: 'pi pi-handshake',
};
