export interface ApiServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface Review {
  id: number;
  imageUrl: string;
  name: string;
  city: string;
  text: string;
}

export interface RequestForm {
  user: {
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

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: number | string;
  age: number | string;
  city: string;
  status: string;
  loyalty: {
    score: number;
    status: string;
  };
}
