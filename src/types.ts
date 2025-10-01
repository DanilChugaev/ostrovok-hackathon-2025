import { localizationMessages } from './localization';

export interface ApiServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export type LocalizationMessagesKeys = keyof typeof localizationMessages;
export type LocaleString = Record<LocalizationMessagesKeys, string>;

export interface HeaderNavigation {
  label: string;
  icon: string;
  route: string;
  permissions: UserRole[];
}

export interface Review {
  id: number;
  imageUrl: string;
  name: LocaleString;
  city: LocaleString;
  text: LocaleString;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RequestForm {
  user: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number | string;
    age: number | string;
    city: string;
  };
  experience: {
    travel: string; // опыт путешествий
    writingReviews: string; // опыт написания отзывов
    reason: string; // почему хотите стать секретным гостем
  };
  preferences: {
    travelAccessibility: string; // доступность для поездок типа выходные только, рабочие и тд
    preferredDirections: string; // предпочтительные направления
  };
  agreeWithRules: boolean; // согласен с условиями
}

export type ProgramRequestStatus = 'pending' | 'accepted' | 'rejected';
export type LoyaltyCode = 'bronze' | 'silver' | 'gold' | 'diamond';
export type UserRole = 'user' | 'secret_guest' | 'admin' | 'hotel';

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: number | string;
  age: number | string;
  city: string;
  programRequestStatus?: ProgramRequestStatus;
  loyalty?: {
    score: number;
    code: LoyaltyCode;
  };
  role: UserRole;
}

export interface Hotel {
  id: number;
  name: LocaleString;
  photo: string;
  city: LocaleString;
  address: LocaleString;
  description: LocaleString;
  stars: number;
  pricePerNight: number;
  availableDates: string[];
}

export interface HotelFiltersType {
  name: string;
  city: string;
  stars: number;
}

export interface Trip {
  id: number;
  userId: number;
  hotel: Hotel;
  startDate: string;
  endDate: string;
  hasReport: boolean;
  totalScore?: number;
}

export interface Summary {
  id: number | string;
  count: number;
  icon: string;
  text: string;
  className: string;
  to?: string;
}

export interface Award {
  id: number;
  name: LocaleString;
  description: LocaleString;
  price: number;
  loyaltyCodes: LoyaltyCode[];
}

export interface LoyaltyBase {
  id: number;
  code: string;
  name: LocaleString;
  minScore: number;
  maxScore: number;
}

export interface City {
  id: number;
  code: string;
  name: LocaleString;
}

export interface HotelReportStage {
  id: number;
  code: string;
  name: LocaleString;
  description: LocaleString;
}

export interface HotelReportStageProgress {
  stageId: number;
  current: number;
  max: number;
}

export interface HotelReportStageResponse {
  id: number;
  code: string;
  name: LocaleString;
  description: LocaleString;
  progress: HotelReportStageProgress;
}

export interface HotelReportCategory {
  id: number;
  stageId: number;
  code: string;
  name: LocaleString;
  description: LocaleString;
}

export interface HotelReportCriterion {
  id: number;
  categoryId: number;
  code: string;
  name: LocaleString;
  description: LocaleString;
  is_basic: boolean;
}

export interface HotelReport {
  id: number;
  userId: number;
  tripId: number;
  totalScore: number;
  comment: string;
  createdDate: string;
  progress?: number; // прогресс заполненности отчета, собирается по таблице scores
}

export interface HotelReportResponse {
  id: number;
  userId: number;
  trip: Trip;
  totalScore: number;
  comment: string;
  createdDate: string;
  progress?: number; // прогресс заполненности отчета, собирается по таблице scores
}

export interface CreateHotelReportForm {
  userId: number;
  tripId: number;
}

export interface CreateTripForm {
  userId: number;
  hotelId: number;
}

export interface AccessibilityItemForTravel {
  id: number;
  name: LocaleString;
}
