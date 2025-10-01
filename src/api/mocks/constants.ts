import type {
  City,
  Hotel,
  LoyaltyBase,
  HotelReportCategory,
  HotelReportCriterion,
  HotelReportStage,
  Trip,
  User,
  HotelReport,
  Review,
  AccessibilityItemForTravel,
  Award,
  HotelReportStageProgress,
  HotelReportCategoryProgress,
  HotelReportCriterionFormForServer,
} from '../../types.ts';

// пользователи
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

// отели
export const hotels: Hotel[] = [grand_moscow, neva_palace, sibir_star, ural_comfort, kazan_riviera];

// поездки
export const trips: Trip[] = [
  {
    // предстоящая поездка
    id: 1,
    userId: 3,
    hotel: grand_moscow,
    startDate: '2025-11-01',
    endDate: '2025-11-02',
    hasReport: false,
  },
  {
    // поездка была, ожидает отчета
    id: 2,
    userId: 3,
    hotel: neva_palace,
    startDate: '2025-01-01',
    endDate: '2025-01-02',
    hasReport: false,
  },
  {
    // поездка была, ожидает отчета
    id: 3,
    userId: 3,
    hotel: sibir_star,
    startDate: '2025-02-01',
    endDate: '2025-02-02',
    hasReport: false,
  },
  {
    // поездка была, ожидает отчета
    id: 4,
    userId: 3,
    hotel: ural_comfort,
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    hasReport: false,
  },
  {
    // поездка была, есть отчет
    id: 5,
    userId: 3,
    hotel: kazan_riviera,
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    hasReport: false,
  },
  {
    // предстоящая поездка
    id: 6,
    userId: 4,
    hotel: grand_moscow,
    startDate: '2025-11-01',
    endDate: '2025-11-02',
    hasReport: false,
  },
  {
    // поездка была, ожидает отчета
    id: 7,
    userId: 4,
    hotel: neva_palace,
    startDate: '2025-01-01',
    endDate: '2025-01-02',
    hasReport: false,
  },
  {
    // поездка была, ожидает отчета
    id: 8,
    userId: 4,
    hotel: sibir_star,
    startDate: '2025-02-01',
    endDate: '2025-02-02',
    hasReport: true,
  },
  {
    // поездка была, ожидает отчета
    id: 9,
    userId: 4,
    hotel: ural_comfort,
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    hasReport: false,
  },
  {
    // поездка была, есть отчет
    id: 10,
    userId: 4,
    hotel: kazan_riviera,
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    hasReport: true,
  },
];

// города
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

// статусы лояльности
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

// этапы оценки
export const stages: HotelReportStage[] = [
  {
    id: 1,
    code: 'reservation',
    name: {
      ru: 'Бронирование',
      en: 'Reservation',
    },
    description: {
      ru: 'Оценка процесса бронирования (онлайн или по телефону/почте). Этот этап важен, так как первое впечатление формируется еще до приезда',
      en: 'Evaluate the booking process (online or by phone/email). This step is important, as first impressions are formed even before arrival',
    },
  },
  {
    id: 2,
    code: 'checkin',
    name: {
      ru: 'Заселение',
      en: 'Check-in',
    },
    description: {
      ru: 'Оценка процесса регистрации и первого впечатления от отеля',
      en: 'Evaluation of the check-in process and first impression of the hotel',
    },
  },
  {
    id: 3,
    code: 'accommodation',
    name: {
      ru: 'Проживание',
      en: 'Accommodation',
    },
    description: {
      ru: 'Оценка качества номера, удобств и взаимодействия с персоналом во время пребывания',
      en: 'Rating of room quality, amenities and interaction with staff during the stay',
    },
  },
  {
    id: 4,
    code: 'nutrition',
    name: {
      ru: 'Питание',
      en: 'Nutrition',
    },
    description: {
      ru: 'Оценка качества еды и обслуживания в ресторанах/кафе отеля',
      en: 'Evaluation of the quality of food and service in the hotel restaurants/cafes',
    },
  },
  {
    id: 5,
    code: 'checkinout',
    name: {
      ru: 'Выезд',
      en: 'Check-out',
    },
    description: {
      ru: 'Оценка процесса выселения и финального впечатления',
      en: 'Evaluation of the eviction process and final impression',
    },
  },
];

// подкатегории этапов
export const categories: HotelReportCategory[] = [
  {
    id: 1,
    stageId: 1,
    code: 'online_booking',
    name: {
      ru: 'Онлайн-бронирование',
      en: 'Online booking',
    },
    description: {
      ru: 'Оценка удобства и прозрачности процесса бронирования через сайт или приложение',
      en: 'Evaluation of the convenience and transparency of the booking process via the website or application',
    },
  },
  {
    id: 2,
    stageId: 1,
    code: 'booking_by_phone',
    name: {
      ru: 'Бронирование по телефону/почте',
      en: 'Booking by phone/mail',
    },
    description: {
      ru: 'Оценка качества общения и скорости обработки запросов при бронировании по телефону или почте',
      en: 'Evaluation of the quality of communication and speed of request processing for phone or email bookings',
    },
  },
  {
    id: 3,
    stageId: 2,
    code: 'registration_process',
    name: {
      ru: 'Процесс регистрации',
      en: 'Registration process',
    },
    description: {
      ru: 'Оценка скорости, удобства и профессионализма процесса заселения',
      en: 'Evaluation of the speed, convenience, and professionalism of the check-in process',
    },
  },
  {
    id: 4,
    stageId: 2,
    code: 'first_impression',
    name: {
      ru: 'Первое впечатление',
      en: 'First impression',
    },
    description: {
      ru: 'Оценка общего впечатления от прибытия в отель, включая чистоту и атмосферу',
      en: 'Evaluation of the overall impression upon arrival at the hotel, including cleanliness and atmosphere',
    },
  },
  {
    id: 5,
    stageId: 3,
    code: 'room',
    name: {
      ru: 'Номер',
      en: 'Room',
    },
    description: {
      ru: 'Оценка состояния и удобств номера',
      en: 'Evaluation of the room’s condition and amenities',
    },
  },
  {
    id: 6,
    stageId: 3,
    code: 'room_service',
    name: {
      ru: 'Обслуживание в номере',
      en: 'Room service',
    },
    description: {
      ru: 'Оценка качества и скорости обслуживания в номере, включая уборку и выполнение запросов',
      en: 'Evaluation of the quality and speed of room service, including cleaning and request fulfillment',
    },
  },
  {
    id: 7,
    stageId: 3,
    code: 'public_areas',
    name: {
      ru: 'Общественные зоны',
      en: 'Public areas',
    },
    description: {
      ru: 'Оценка чистоты, доступности и атмосферы общественных зон отеля',
      en: 'Evaluation of the cleanliness, accessibility, and atmosphere of the hotel’s public areas',
    },
  },
  {
    id: 8,
    stageId: 4,
    code: 'food_quality',
    name: {
      ru: 'Качество еды',
      en: 'Food quality',
    },
    description: {
      ru: 'Оценка вкуса, свежести и презентации блюд',
      en: 'Evaluation of the taste, freshness, and presentation of dishes',
    },
  },
  {
    id: 9,
    stageId: 4,
    code: 'service',
    name: {
      ru: 'Обслуживание',
      en: 'Service',
    },
    description: {
      ru: 'Оценка профессионализма и скорости работы персонала ресторана',
      en: 'Evaluation of the professionalism and speed of restaurant staff',
    },
  },
  {
    id: 10,
    stageId: 5,
    code: 'eviction_process',
    name: {
      ru: 'Процесс выселения',
      en: 'The eviction process',
    },
    description: {
      ru: 'Оценка скорости и прозрачности процесса выселения',
      en: 'Evaluation of the speed and transparency of the check-out process',
    },
  },
  {
    id: 11,
    stageId: 5,
    code: 'final_impression',
    name: {
      ru: 'Финальное впечатление',
      en: 'Final impression',
    },
    description: {
      ru: 'Оценка общего впечатления от отеля при выезде, включая прощальные жесты',
      en: 'Evaluation of the overall impression of the hotel upon departure, including farewell gestures',
    },
  },
];

// критерии оценки
export const criteria: HotelReportCriterion[] = [
  {
    id: 1,
    categoryId: 1,
    code: 'interface_convenience',
    name: {
      ru: 'Удобство интерфейса сайта/приложения',
      en: 'Convenience of the website/application interface',
    },
    description: {
      ru: 'Оценка удобства и интуитивности интерфейса сайта или приложения для бронирования',
      en: 'Evaluation of the convenience and intuitiveness of the website or application interface for booking',
    },
    is_basic: true,
  },
  {
    id: 2,
    categoryId: 1,
    code: 'transparency_conditions',
    name: {
      ru: 'Прозрачность информации о ценах и условиях',
      en: 'Transparency of information on prices and conditions',
    },
    description: {
      ru: 'Оценка ясности и полноты информации о ценах, условиях и дополнительных сборах',
      en: 'Evaluation of the clarity and completeness of information on prices, conditions, and additional fees',
    },
    is_basic: true,
  },
  {
    id: 3,
    categoryId: 1,
    code: 'booking_processing_speed',
    name: {
      ru: 'Скорость обработки бронирования',
      en: 'Booking processing speed',
    },
    description: {
      ru: 'Оценка времени, необходимого для завершения процесса бронирования',
      en: 'Evaluation of the time required to complete the booking process',
    },
    is_basic: true,
  },
  {
    id: 4,
    categoryId: 1,
    code: 'additional_options',
    name: {
      ru: 'Наличие дополнительных опций',
      en: 'Availability of additional options',
    },
    description: {
      ru: 'Оценка возможности выбора дополнительных параметров, таких как тип номера или кровати',
      en: 'Evaluation of the availability of additional options, such as room or bed type selection',
    },
    is_basic: false,
  },
  {
    id: 5,
    categoryId: 1,
    code: 'booking_confirmation_quality',
    name: {
      ru: 'Качество подтверждения брони',
      en: 'Quality of booking confirmation',
    },
    description: {
      ru: 'Оценка четкости и информативности письма или уведомления о подтверждении брони',
      en: 'Evaluation of the clarity and informativeness of the booking confirmation letter or notification',
    },
    is_basic: false,
  },
  {
    id: 6,
    categoryId: 2,
    code: 'politeness_operator',
    name: {
      ru: 'Вежливость оператора',
      en: 'Politeness of the operator',
    },
    description: {
      ru: 'Оценка уровня вежливости и профессионализма оператора при бронировании',
      en: 'Evaluation of the operator’s politeness and professionalism during booking',
    },
    is_basic: true,
  },
  {
    id: 7,
    categoryId: 2,
    code: 'request_response_speed',
    name: {
      ru: 'Скорость ответа на запрос',
      en: 'Request response speed',
    },
    description: {
      ru: 'Оценка времени, необходимого для ответа на запрос по телефону или почте',
      en: 'Evaluation of the time required to respond to a phone or email request',
    },
    is_basic: true,
  },
  {
    id: 8,
    categoryId: 2,
    code: 'information_accuracy',
    name: {
      ru: 'Точность предоставленной информации',
      en: 'Accuracy of the information provided',
    },
    description: {
      ru: 'Оценка точности и полноты информации, предоставленной оператором',
      en: 'Evaluation of the accuracy and completeness of the information provided by the operator',
    },
    is_basic: false,
  },
  {
    id: 9,
    categoryId: 2,
    code: 'proactivity',
    name: {
      ru: 'Проактивность',
      en: 'Proactivity',
    },
    description: {
      ru: 'Оценка инициативности оператора в предложении альтернативных вариантов',
      en: 'Evaluation of the operator’s proactivity in offering alternative options',
    },
    is_basic: false,
  },
  {
    id: 10,
    categoryId: 3,
    code: 'check_in_speed',
    name: {
      ru: 'Скорость заселения',
      en: 'Check-in speed',
    },
    description: {
      ru: 'Оценка времени, затраченного на процесс заселения от прибытия до получения ключа',
      en: 'Evaluation of the time spent on the check-in process from arrival to receiving the key',
    },
    is_basic: true,
  },
  {
    id: 11,
    categoryId: 3,
    code: 'reception_staff',
    name: {
      ru: 'Вежливость персонала на ресепшен',
      en: 'Reception staff courtesy',
    },
    description: {
      ru: 'Оценка уровня вежливости и профессионализма персонала на ресепшен',
      en: 'Evaluation of the politeness and professionalism of the reception staff',
    },
    is_basic: true,
  },
  {
    id: 12,
    categoryId: 3,
    code: 'request_fulfillment',
    name: {
      ru: 'Точность выполнения запросов',
      en: 'Request fulfillment accuracy',
    },
    description: {
      ru: 'Оценка выполнения специальных запросов, таких как выбор этажа или вида из окна',
      en: 'Evaluation of fulfilling special requests, such as floor or window view selection',
    },
    is_basic: true,
  },
  {
    id: 13,
    categoryId: 3,
    code: 'provision_hotel_policies',
    name: {
      ru: 'Предоставление информации о правилах отеля',
      en: 'Provision of information about hotel policies',
    },
    description: {
      ru: 'Оценка полноты и ясности предоставленной информации о правилах отеля',
      en: 'Evaluation of the completeness and clarity of information provided about hotel policies',
    },
    is_basic: false,
  },
  {
    id: 14,
    categoryId: 3,
    code: 'additional_services',
    name: {
      ru: 'Предложение дополнительных услуг',
      en: 'Offering additional services',
    },
    description: {
      ru: 'Оценка предложения дополнительных услуг, таких как поздний выезд или трансфер',
      en: 'Evaluation of offering additional services, such as late check-out or transfer',
    },
    is_basic: false,
  },
  {
    id: 15,
    categoryId: 4,
    code: 'cleanliness_lobby',
    name: {
      ru: 'Чистота лобби и общественных зон',
      en: 'Cleanliness of the lobby and public areas',
    },
    description: {
      ru: 'Оценка чистоты и порядка в лобби и других общественных зонах',
      en: 'Evaluation of the cleanliness and order in the lobby and other public areas',
    },
    is_basic: true,
  },
  {
    id: 16,
    categoryId: 4,
    code: 'ambience',
    name: {
      ru: 'Атмосфера',
      en: 'Ambience',
    },
    description: {
      ru: 'Оценка общей атмосферы, включая освещение, музыку и запах в лобби',
      en: 'Evaluation of the overall atmosphere, including lighting, music, and scent in the lobby',
    },
    is_basic: true,
  },
  {
    id: 17,
    categoryId: 4,
    code: 'accessibility_of_signs',
    name: {
      ru: 'Доступность указателей',
      en: 'Accessibility of signs',
    },
    description: {
      ru: 'Оценка наличия и понятности указателей к ключевым зонам отеля',
      en: 'Evaluation of the presence and clarity of signs to key hotel areas',
    },
    is_basic: false,
  },
  {
    id: 18,
    categoryId: 5,
    code: 'room_cleanliness',
    name: {
      ru: 'Чистота номера',
      en: 'Room cleanliness',
    },
    description: {
      ru: 'Оценка уровня чистоты и порядка в номере',
      en: 'Evaluation of the level of cleanliness and order in the room',
    },
    is_basic: true,
  },
  {
    id: 19,
    categoryId: 5,
    code: 'equipment_serviceability',
    name: {
      ru: 'Исправность оборудования',
      en: 'Equipment serviceability',
    },
    description: {
      ru: 'Оценка исправности и функциональности оборудования в номере',
      en: 'Evaluation of the functionality and condition of room facilities',
    },
    is_basic: true,
  },
  {
    id: 20,
    categoryId: 5,
    code: 'comfortable_bed_linens',
    name: {
      ru: 'Удобство кровати и постельного белья',
      en: 'Comfortable bed and linens',
    },
    description: {
      ru: 'Оценка комфорта кровати и качества постельного белья',
      en: 'Evaluation of the comfort of the bed and quality of linens',
    },
    is_basic: true,
  },
  {
    id: 21,
    categoryId: 5,
    code: 'soundproofing',
    name: {
      ru: 'Шумоизоляция',
      en: 'Soundproofing',
    },
    description: {
      ru: 'Оценка уровня шумоизоляции в номере',
      en: 'Evaluation of the level of soundproofing in the room',
    },
    is_basic: false,
  },
  {
    id: 22,
    categoryId: 5,
    code: 'available_power_outlets_lighting',
    name: {
      ru: 'Доступность розеток и освещения',
      en: 'Available power outlets and lighting',
    },
    description: {
      ru: 'Оценка наличия и удобства розеток и освещения в номере',
      en: 'Evaluation of the availability and convenience of power outlets and lighting in the room',
    },
    is_basic: false,
  },
  {
    id: 23,
    categoryId: 5,
    code: 'minibar_toilet_supplies_refilled',
    name: {
      ru: 'Пополнение мини-бара/гигиенических принадлежностей',
      en: 'Minibar/toilet supplies refilled',
    },
    description: {
      ru: 'Оценка регулярности и качества пополнения мини-бара и гигиенических принадлежностей',
      en: 'Evaluation of the regularity and quality of minibar and toilet supplies replenishment',
    },
    is_basic: false,
  },
  {
    id: 24,
    categoryId: 6,
    code: 'speed_room_cleaning',
    name: {
      ru: 'Скорость уборки номера',
      en: 'Speed of room cleaning',
    },
    description: {
      ru: 'Оценка времени, затраченного на уборку номера',
      en: 'Evaluation of the time spent on room cleaning',
    },
    is_basic: true,
  },
  {
    id: 25,
    categoryId: 6,
    code: 'quality_cleaning',
    name: {
      ru: 'Качество уборки',
      en: 'Quality of cleaning',
    },
    description: {
      ru: 'Оценка тщательности и качества уборки номера',
      en: 'Evaluation of the thoroughness and quality of room cleaning',
    },
    is_basic: true,
  },
  {
    id: 26,
    categoryId: 6,
    code: 'courtesy_maids',
    name: {
      ru: 'Вежливость горничных',
      en: 'Courtesy of maids',
    },
    description: {
      ru: 'Оценка уровня вежливости и профессионализма горничных',
      en: 'Evaluation of the politeness and professionalism of maids',
    },
    is_basic: false,
  },
  {
    id: 27,
    categoryId: 6,
    code: 'responsiveness_requests',
    name: {
      ru: 'Реакция на запросы',
      en: 'Responsiveness to requests',
    },
    description: {
      ru: 'Оценка скорости и качества выполнения запросов гостей',
      en: 'Evaluation of the speed and quality of fulfilling guest requests',
    },
    is_basic: false,
  },
  {
    id: 28,
    categoryId: 7,
    code: 'cleanliness_pool_gym_spa',
    name: {
      ru: 'Чистота бассейна, спортзала, спа',
      en: 'Cleanliness of the pool, gym, and spa',
    },
    description: {
      ru: 'Оценка чистоты и порядка в бассейне, спортзале и спа',
      en: 'Evaluation of the cleanliness and order in the pool, gym, and spa',
    },
    is_basic: true,
  },
  {
    id: 29,
    categoryId: 7,
    code: 'availability_amenities',
    name: {
      ru: 'Доступность удобств',
      en: 'Availability of amenities',
    },
    description: {
      ru: 'Оценка наличия и доступности удобств в общественных зонах',
      en: 'Evaluation of the availability and accessibility of amenities in public areas',
    },
    is_basic: true,
  },
  {
    id: 30,
    categoryId: 7,
    code: 'wifi_quality_public_areas',
    name: {
      ru: 'Качество Wi-Fi в общественных зонах',
      en: 'Wi-Fi quality in public areas',
    },
    description: {
      ru: 'Оценка скорости и стабильности Wi-Fi в общественных зонах',
      en: 'Evaluation of the speed and stability of Wi-Fi in public areas',
    },
    is_basic: false,
  },
  {
    id: 31,
    categoryId: 7,
    code: 'atmosphere_bar_restaurant',
    name: {
      ru: 'Атмосфера в баре/ресторане',
      en: 'Atmosphere in the bar/restaurant',
    },
    description: {
      ru: 'Оценка уюта и атмосферы в баре или ресторане отеля',
      en: 'Evaluation of the coziness and atmosphere in the hotel’s bar or restaurant',
    },
    is_basic: false,
  },
  {
    id: 32,
    categoryId: 8,
    code: 'taste_dishes',
    name: {
      ru: 'Вкус блюд',
      en: 'Taste of the dishes',
    },
    description: {
      ru: 'Оценка вкусовых качеств блюд в ресторане отеля',
      en: 'Evaluation of the taste qualities of dishes in the hotel restaurant',
    },
    is_basic: true,
  },
  {
    id: 33,
    categoryId: 8,
    code: 'menu_variety',
    name: {
      ru: 'Разнообразие меню',
      en: 'Menu variety',
    },
    description: {
      ru: 'Оценка разнообразия предлагаемых блюд в меню',
      en: 'Evaluation of the variety of dishes offered on the menu',
    },
    is_basic: true,
  },
  {
    id: 34,
    categoryId: 8,
    code: 'freshness_products',
    name: {
      ru: 'Свежесть продуктов',
      en: 'Freshness of the products',
    },
    description: {
      ru: 'Оценка свежести и качества используемых продуктов',
      en: 'Evaluation of the freshness and quality of the products used',
    },
    is_basic: true,
  },
  {
    id: 35,
    categoryId: 8,
    code: 'food_presentation',
    name: {
      ru: 'Презентация блюд',
      en: 'Food presentation',
    },
    description: {
      ru: 'Оценка внешнего вида и подачи блюд',
      en: 'Evaluation of the appearance and presentation of dishes',
    },
    is_basic: false,
  },
  {
    id: 36,
    categoryId: 8,
    code: 'menu_dietary_compliance',
    name: {
      ru: 'Соответствие меню диетическим требованиям',
      en: 'Menu compliance with dietary requirements',
    },
    description: {
      ru: 'Оценка наличия и качества блюд, соответствующих диетическим требованиям',
      en: 'Evaluation of the availability and quality of dishes meeting dietary requirements',
    },
    is_basic: false,
  },
  {
    id: 37,
    categoryId: 9,
    code: 'politeness_waiters',
    name: {
      ru: 'Вежливость официантов',
      en: 'Politeness of waiters',
    },
    description: {
      ru: 'Оценка уровня вежливости и профессионализма официантов',
      en: 'Evaluation of the politeness and professionalism of waiters',
    },
    is_basic: true,
  },
  {
    id: 38,
    categoryId: 9,
    code: 'speed_serving_dishes',
    name: {
      ru: 'Скорость подачи блюд',
      en: 'Speed of serving dishes',
    },
    description: {
      ru: 'Оценка времени, затраченного на подачу блюд',
      en: 'Evaluation of the time spent on serving dishes',
    },
    is_basic: true,
  },
  {
    id: 39,
    categoryId: 9,
    code: 'cleanliness_tables_dishes',
    name: {
      ru: 'Чистота столов и посуды',
      en: 'Cleanliness of tables and dishes',
    },
    description: {
      ru: 'Оценка чистоты столов, посуды и столовых приборов',
      en: 'Evaluation of the cleanliness of tables, dishes, and cutlery',
    },
    is_basic: false,
  },
  {
    id: 40,
    categoryId: 9,
    code: 'response_complaints_requests',
    name: {
      ru: 'Реакция на жалобы/просьбы',
      en: 'Response to complaints/requests',
    },
    description: {
      ru: 'Оценка скорости и качества реакции на жалобы или просьбы гостей',
      en: 'Evaluation of the speed and quality of response to guest complaints or requests',
    },
    is_basic: false,
  },
  {
    id: 41,
    categoryId: 10,
    code: 'speed_check_out',
    name: {
      ru: 'Скорость выселения',
      en: 'Speed of check-out',
    },
    description: {
      ru: 'Оценка времени, затраченного на процесс выселения',
      en: 'Evaluation of the time spent on the check-out process',
    },
    is_basic: true,
  },
  {
    id: 42,
    categoryId: 10,
    code: 'staff_courtesy',
    name: {
      ru: 'Вежливость персонала',
      en: 'Staff courtesy',
    },
    description: {
      ru: 'Оценка уровня вежливости персонала при выселении',
      en: 'Evaluation of the politeness of staff during check-out',
    },
    is_basic: true,
  },
  {
    id: 43,
    categoryId: 10,
    code: 'transparency_final_bill',
    name: {
      ru: 'Прозрачность финального счета',
      en: 'Transparency of final bill',
    },
    description: {
      ru: 'Оценка ясности и корректности финального счета',
      en: 'Evaluation of the clarity and correctness of the final bill',
    },
    is_basic: true,
  },
  {
    id: 44,
    categoryId: 10,
    code: 'offer_hotel_questionnaire',
    name: {
      ru: 'Предложение заполнить анкету отеля',
      en: 'Offer to fill out a hotel questionnaire',
    },
    description: {
      ru: 'Оценка наличия предложения заполнить анкету обратной связи',
      en: 'Evaluation of the offer to fill out a hotel feedback questionnaire',
    },
    is_basic: false,
  },
  {
    id: 45,
    categoryId: 10,
    code: 'assistance_luggage_transportation',
    name: {
      ru: 'Помощь с багажом/транспортом',
      en: 'Assistance with luggage/transportation',
    },
    description: {
      ru: 'Оценка помощи с багажом или организацией транспорта при выезде',
      en: 'Evaluation of assistance with luggage or transportation arrangements during check-out',
    },
    is_basic: false,
  },
  {
    id: 46,
    categoryId: 11,
    code: 'overall_satisfaction_stay',
    name: {
      ru: 'Общее удовлетворение пребыванием',
      en: 'Overall satisfaction with the stay',
    },
    description: {
      ru: 'Оценка общего уровня удовлетворенности пребыванием в отеле',
      en: 'Evaluation of the overall level of satisfaction with the hotel stay',
    },
    is_basic: true,
  },
  {
    id: 47,
    categoryId: 11,
    code: 'presence_farewell_gestures',
    name: {
      ru: 'Наличие прощальных жестов',
      en: 'Presence of farewell gestures',
    },
    description: {
      ru: 'Оценка наличия прощальных жестов, таких как сувениры или персонализированные пожелания',
      en: 'Evaluation of the presence of farewell gestures, such as souvenirs or personalized wishes',
    },
    is_basic: false,
  },
];

// отчеты пользователей
export const reports: HotelReport[] = [
  {
    id: 1,
    userId: 4,
    tripId: 10,
    totalScore: 5,
    comment: 'Супер отель, приеду еще!',
    createdDate: '2025-03-02',
    progress: 100,
  },
  {
    id: 2,
    userId: 4,
    tripId: 8,
    totalScore: 0,
    comment: '',
    createdDate: '2025-03-02',
    progress: 70,
  },
];

// отзывы
export const reviews: Review[] = [
  {
    id: 1,
    imageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
    name: { ru: 'Анна К.', en: 'Anna K.' },
    city: { ru: 'Москва', en: 'Moscow' },
    text: {
      ru: "Участие в программе 'Секретный гость' позволило мне посетить прекрасный отель в Сочи, который я бы не смогла себе позволить. Процесс оценки был простым и интуитивно понятным.",
      en: "Participating in the Secret Guest program allowed me to visit a wonderful hotel in Sochi that I otherwise wouldn't have been able to afford. The evaluation process was simple and intuitive.",
    },
  },
  {
    id: 2,
    imageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
    name: { ru: 'Дмитрий Л.', en: 'Dmitry L.' },
    city: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' },
    text: {
      ru: 'Благодаря программе я смог совместить приятное с полезным - отдохнуть в хорошем отеле и помочь другим путешественникам получить честную информацию о нем.',
      en: 'Thanks to the program, I was able to combine business with pleasure - relax in a good hotel and help other travelers get honest information about it.',
    },
  },
];

// возможности для поездок
export const accessibilityListForTravel: AccessibilityItemForTravel[] = [
  {
    id: 1,
    name: {
      ru: 'Только выходные',
      en: 'Weekends only',
    },
  },
  {
    id: 2,
    name: {
      ru: 'Только будни',
      en: 'Weekdays only',
    },
  },
  {
    id: 3,
    name: {
      ru: 'В любое время',
      en: 'Anytime',
    },
  },
  {
    id: 4,
    name: {
      ru: 'Только праздники и отпуск',
      en: 'Holidays and vacations only',
    },
  },
];

// награды
export const awards: Award[] = [
  {
    id: 1,
    name: { ru: 'Скидка 10%', en: '10% off' },
    description: { ru: 'На любое бронирование на Островке', en: 'For any booking on Ostrovok' },
    price: 100,
    loyaltyCodes: ['bronze', 'silver', 'gold', 'diamond'],
  },
  {
    id: 2,
    name: { ru: 'Скидка 15%', en: '15% off' },
    description: { ru: 'На бронирование в отелях-партнерах', en: 'For bookings at partner hotels' },
    price: 250,
    loyaltyCodes: ['silver', 'gold', 'diamond'],
  },
  {
    id: 3,
    name: { ru: 'Скидка 25%', en: '25% off' },
    description: { ru: 'На бронирование в отелях-партнерах', en: 'For bookings at partner hotels' },
    price: 500,
    loyaltyCodes: ['gold', 'diamond'],
  },
  {
    id: 4,
    name: { ru: 'Бесплатная ночь', en: 'Free night' },
    description: { ru: 'В любом отеле до 4 звезд', en: 'Any hotel up to 4 stars' },
    price: 1000,
    loyaltyCodes: ['diamond'],
  },
];

export const stagesProgress: HotelReportStageProgress[] = [
  {
    stageId: 1, // прогресс для этапа бронирования
    current: 0,
    max: 2,
  },
  {
    stageId: 2, // прогресс для этапа заселение
    current: 1,
    max: 2,
  },
  {
    stageId: 3, // прогресс для этапа проживание
    current: 1,
    max: 3,
  },
  {
    stageId: 4, // прогресс для этапа питание
    current: 2,
    max: 2,
  },
  {
    stageId: 5, // прогресс для этапа выезд
    current: 0,
    max: 2,
  },
];

export const categoriesProgress: HotelReportCategoryProgress[] = [
  {
    categoryId: 1, // прогресс для категории Онлайн-бронирование
    current: 0,
    max: 5,
  },
  {
    categoryId: 2, // прогресс для категории Бронирование по телефону/почте
    current: 0,
    max: 4,
  },
  {
    categoryId: 3, // прогресс для категории Процесс регистрации
    current: 3,
    max: 5,
  },
  {
    categoryId: 4, // прогресс для категории Первое впечатление
    current: 3,
    max: 3,
  },
  {
    categoryId: 5, // прогресс для категории Номер
    current: 0,
    max: 3,
  },
  {
    categoryId: 6, // прогресс для категории Обслуживание в номере
    current: 1,
    max: 4,
  },
  {
    categoryId: 7, // прогресс для категории Общественные зоны
    current: 3,
    max: 4,
  },
  {
    categoryId: 8, // прогресс для категории Качество еды
    current: 2,
    max: 5,
  },
  {
    categoryId: 9, // прогресс для категории Обслуживание
    current: 4,
    max: 4,
  },
  {
    categoryId: 10, // прогресс для категории Процесс выселения
    current: 0,
    max: 5,
  },
  {
    categoryId: 11, // прогресс для категории Финальное впечатление
    current: 0,
    max: 2,
  },
];

export const scores: HotelReportCriterionFormForServer[] = [
  {
    userId: 4,
    reportId: 8,
    criterionId: 1,
    comment: 'супер',
    score: 5,
    media: [],
  }
];
