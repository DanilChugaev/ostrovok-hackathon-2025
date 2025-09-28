export interface ApiServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface HeaderNavigation {
  label: string;
  icon: string;
  route: string;
  permissions: UserRole[];
}

export interface Review {
  id: number;
  imageUrl: string;
  name: string;
  city: string;
  text: string;
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

export type ReportStatus = 'awaiting' | 'accepted' | 'rejected';
export type LoyaltyStatus = 'bronze' | 'silver' | 'gold' | 'diamond';
export type UserRole = 'user' | 'admin' | 'hotel';

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
  status?: ReportStatus;
  loyalty?: {
    score: number;
    status: LoyaltyStatus;
  };
  role: UserRole;
}

export interface Hotel {
  id: number;
  name: string;
  photo: string;
  city: string;
  address: string;
  description: string;
  category: number;
  pricePerNight: number;
  currency: string;
  availableDates: string[];
}

export type HotelFiltersType = Pick<Hotel, 'name' | 'city' | 'category'>;

export interface Trip {
  id: number;
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
}

export interface Award {
  id: number;
  name: string;
  description: string;
  price: number;
  loyaltyStatuses: LoyaltyStatus[];
}

export interface LoyaltyBase {
  id: number;
  minScore: number;
  maxScore: number;
  status: LoyaltyStatus;
}
