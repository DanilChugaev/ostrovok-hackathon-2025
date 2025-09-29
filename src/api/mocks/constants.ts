import type { Hotel, Trip, User } from '../../types.ts';

// начальный массив пользователей
export const users: User[] = [
  {
    id: 1,
    username: 'user',
    password: 'user',
    firstName: 'Имя',
    lastName: 'Фамилия',
    avatar: '',
    email: 'user@mail.ru',
    phone: '79999999999',
    age: 18,
    city: 'Москва',
    status: 'awaiting',
    loyalty: {
      score: 100,
      status: 'bronze',
    },
    role: 'user',
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin',
    firstName: 'FirstNameAdmin',
    lastName: 'LastNameAdmin',
    avatar: '',
    email: 'admin@mail.ru',
    phone: '79990000000',
    age: 19,
    city: 'Москва',
    role: 'admin',
  },
  {
    id: 3,
    username: 'hotel',
    password: 'hotel',
    firstName: 'FirstNameHotel',
    lastName: 'LastNameHotel',
    avatar: '',
    email: 'hotel@mail.ru',
    phone: '79991111111',
    age: 20,
    city: 'Москва',
    role: 'hotel',
  },
];

const hotelOne = {
  id: 1,
  name: 'Первый отель',
  photo:
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  city: 'Москва',
  address: 'address в Москве',
  description: 'lorem ipsum dolor sit amet',
  category: 5,
  pricePerNight: 2500,
  currency: '₽',
  availableDates: ['2025-11-01', '2025-11-02', '2025-11-03', '2025-11-04', '2025-11-05'],
};
const hotelTwo = {
  id: 2,
  name: 'Второй отель',
  photo:
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
  city: 'Новосибирск',
  address: 'address в Новосибирске',
  description: 'lorem ipsum dolor sit amet',
  category: 5,
  pricePerNight: 5000,
  currency: '₽',
  availableDates: ['2025-11-01', '2025-11-02', '2025-11-03', '2025-11-04', '2025-11-05'],
};
const hotelThree = {
  id: 3,
  name: 'Третий отель',
  photo:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  city: 'Казань',
  address: 'address в Казани',
  description: 'lorem ipsum dolor sit amet',
  category: 4,
  pricePerNight: 30000,
  currency: '₽',
  availableDates: ['2025-11-04', '2025-11-05', '2025-11-06', '2025-11-07', '2025-11-08'],
};
const hotelFour = {
  id: 4,
  name: 'Четвертый отель',
  photo:
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
  city: 'Екатеринбург',
  address: 'address в Екатеринбурге',
  description: 'lorem ipsum dolor sit amet',
  category: 3,
  pricePerNight: 300,
  currency: '₽',
  availableDates: ['2025-12-30', '2025-12-31'],
};
const hotelFive = {
  id: 5,
  name: 'Пятый отель',
  photo:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  city: 'Пермь',
  address: 'address в Перми',
  description: 'lorem ipsum dolor sit amet',
  category: 2,
  pricePerNight: 500,
  currency: '₽',
  availableDates: ['2025-12-01', '2025-12-02'],
};

// начальный массив отелей
export const hotels: Hotel[] = [hotelOne, hotelTwo, hotelThree, hotelFour, hotelFive];

// начальный массив поездок
export const trips: Trip[] = [
  {
    // предстоящая поездка
    id: 1,
    hotel: hotelOne,
    startDate: '2025-11-01',
    endDate: '2025-11-02',
    hasReport: false,
    totalScore: undefined,
  },
  {
    // поездка была, ожидает отчета
    id: 2,
    hotel: hotelTwo,
    startDate: '2025-01-01',
    endDate: '2025-01-02',
    hasReport: false,
    totalScore: undefined,
  },
  {
    // поездка была, есть отчет
    id: 3,
    hotel: hotelThree,
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    hasReport: true,
    totalScore: 5,
  },
];
