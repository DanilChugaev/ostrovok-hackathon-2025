import type { City, Hotel, LoyaltyBase, Trip, User } from '../../types.ts';

// начальный массив пользователей
export const users: User[] = [
  {
    id: 1,
    role: 'admin',
    username: 'admin',
    password: 'admin',
    firstName: 'Алексей',
    lastName: 'Иванов',
    avatar: '',
    email: 'alexey.ivanov@example.com',
    phone: '+79990000000',
    age: 35,
    city: 'Москва',
  },
  {
    id: 2,
    role: 'hotel',
    username: 'hotel',
    password: 'hotel',
    firstName: 'Екатерина',
    lastName: 'Смирнова',
    avatar: '',
    email: 'ekaterina.smirnova@example.com',
    phone: '+79991111111',
    age: 28,
    city: 'Москва',
  },
  {
    id: 3,
    role: 'user',
    username: 'user',
    password: 'user',
    firstName: 'Михаил',
    lastName: 'Петров',
    avatar: '',
    email: 'mikhail.petrov@example.com',
    phone: '+79992222222',
    age: 22,
    city: 'Москва',
    programRequestStatus: 'pending',
    loyalty: {
      score: 100,
      code: 'bronze',
    },
  },
  {
    id: 4,
    role: 'secret_guest',
    username: 'secret_guest',
    password: 'secret_guest',
    firstName: 'Михаил',
    lastName: 'Петров',
    avatar: '',
    email: 'mikhail.petrov@example.com',
    phone: '+79992222222',
    age: 22,
    city: 'Москва',
    programRequestStatus: 'accepted',
    loyalty: {
      score: 600,
      code: 'silver',
    },
  },
];

const grand_moscow: Hotel = {
  id: 1,
  name: {
    ru: 'Гранд Москва',
    en: 'Grand Moscow',
  },
  photo:
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  city: {
    ru: 'Москва',
    en: 'Moscow',
  },
  address: {
    ru: 'ул. Тверская, д. 10',
    en: 'Tverskaya St., Building 10',
  },
  description: {
    ru: 'Роскошный отель в центре Москвы с видом на Красную площадь',
    en: 'Luxury hotel in the heart of Moscow with a view of Red Square',
  },
  stars: 5,
  pricePerNight: 15000,
  availableDates: ['2025-11-01', '2025-11-02', '2025-11-03', '2025-11-04', '2025-11-05'],
};
const neva_palace: Hotel = {
  id: 2,
  name: { ru: 'Нева Палас', en: 'Neva Palace' },
  photo:
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
  city: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' },
  address: { ru: 'наб. Канала Грибоедова, д. 5', en: 'emb. Kanala Griboyedova, 5' },
  description: {
    ru: 'Элегантный отель на берегу Невы с исторической атмосферой',
    en: 'Elegant hotel on the Neva riverbank with a historic atmosphere',
  },
  stars: 4,
  pricePerNight: 12000,
  availableDates: ['2025-11-01', '2025-11-02', '2025-11-03', '2025-11-04', '2025-11-05'],
};
const sibir_star: Hotel = {
  id: 3,
  name: { ru: 'Сибирская Звезда', en: 'Siberian Star' },
  photo:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  city: { ru: 'Новосибирск', en: 'Novosibirsk' },
  address: { ru: 'ул. Сибирская, д. 15', en: 'st. Sibirskaya, 15' },
  description: {
    ru: 'Современный отель в центре Новосибирска с отличным сервисом',
    en: 'Modern hotel in the center of Novosibirsk with excellent service',
  },
  stars: 3,
  pricePerNight: 8000,
  availableDates: ['2025-11-04', '2025-11-05', '2025-11-06', '2025-11-07', '2025-11-08'],
};
const ural_comfort: Hotel = {
  id: 4,
  name: { ru: 'Урал Комфорт', en: 'Ural Comfort' },
  photo:
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
  city: { ru: 'Екатеринбург', en: 'Yekaterinburg' },
  address: { ru: 'ул. Уральская, д. 20', en: 'st. Uralskaya, 20' },
  description: {
    ru: 'Уютный отель с удобным расположением в Екатеринбурге',
    en: 'Cozy hotel with a convenient location in Yekaterinburg',
  },
  stars: 4,
  pricePerNight: 10000,
  availableDates: ['2025-12-30', '2025-12-31'],
};
const kazan_riviera: Hotel = {
  id: 5,
  name: { ru: 'Казань Ривьера', en: 'Kazan Riviera' },
  photo:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  city: { ru: 'Казань', en: 'Kazan' },
  address: { ru: 'ул. Кремлевская, д. 12', en: 'st. Kremlevskaya, 12' },
  description: {
    ru: 'Отель с панорамным видом на Казанский Кремль',
    en: 'Hotel with a panoramic view of the Kazan Kremlin',
  },
  stars: 5,
  pricePerNight: 18000,
  availableDates: ['2025-12-01', '2025-12-02'],
};

// начальный массив отелей
export const hotels: Hotel[] = [grand_moscow, neva_palace, sibir_star, ural_comfort, kazan_riviera];

// начальный массив поездок
export const trips: Trip[] = [
  {
    // предстоящая поездка
    id: 1,
    hotel: grand_moscow,
    startDate: '2025-11-01',
    endDate: '2025-11-02',
    hasReport: false,
    totalScore: undefined,
  },
  {
    // поездка была, ожидает отчета
    id: 2,
    hotel: neva_palace,
    startDate: '2025-01-01',
    endDate: '2025-01-02',
    hasReport: false,
    totalScore: undefined,
  },
  {
    // поездка была, есть отчет
    id: 3,
    hotel: sibir_star,
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    hasReport: true,
    totalScore: 5,
  },
];

// начальный массив городов
export const cities: City[] = [
  {
    id: 1,
    code: 'moscow',
    name: { ru: 'Москва', en: 'Moscow' },
  },
  {
    id: 2,
    code: 'saint_petersburg',
    name: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' },
  },
  {
    id: 3,
    code: 'novosibirsk',
    name: { ru: 'Новосибирск', en: 'Novosibirsk' },
  },
  {
    id: 4,
    code: 'yekaterinburg',
    name: { ru: 'Екатеринбург', en: 'Yekaterinburg' },
  },
  {
    id: 5,
    code: 'kazan',
    name: { ru: 'Казань', en: 'Kazan' },
  },
];

export const loyalty: LoyaltyBase[] = [
  {
    id: 1,
    code: 'bronze',
    name: { ru: 'Бронзовый', en: 'Bronze' },
    minScore: 0,
    maxScore: 500,
  },
  {
    id: 2,
    code: 'silver',
    name: { ru: 'Серебряный', en: 'Silver' },
    minScore: 501,
    maxScore: 1000,
  },
  {
    id: 3,
    code: 'gold',
    name: { ru: 'Золотой', en: 'Gold' },
    minScore: 1001,
    maxScore: 4000,
  },
  {
    id: 4,
    code: 'diamond',
    name: { ru: 'Бриллиантовый', en: 'Diamond' },
    minScore: 4001,
    maxScore: Infinity,
  },
];
