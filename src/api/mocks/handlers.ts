import { http, HttpResponse } from 'msw';
import type {
  AccessibilityItemForTravel,
  ApiServerResponse,
  Award,
  City,
  CreateHotelReportForm,
  CreateTripForm,
  Hotel,
  HotelReport,
  HotelReportCategory,
  HotelReportCategoryProgress,
  HotelReportCategoryResponse,
  HotelReportResponse,
  HotelReportStage,
  HotelReportStageProgress,
  HotelReportStageResponse,
  LoginForm,
  LoyaltyBase,
  RequestForm,
  Review,
  Trip,
  User,
} from '../../types.ts';
import { API } from '../../constants.ts';
import dayjs from 'dayjs';

function getData(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? '[]');
}

function getUsers(): User[] {
  return getData('users');
}

function getHotels(): Hotel[] {
  return getData('hotels');
}

function getTrips(): Trip[] {
  return getData('trips');
}

function getCities(): City[] {
  return getData('cities');
}

function getLoyalty(): LoyaltyBase[] {
  return getData('loyalty');
}

function getReports(): HotelReport[] {
  return getData('reports');
}

function getReviews(): Review[] {
  return getData('reviews');
}

function getAccessibilityListForTravel(): AccessibilityItemForTravel[] {
  return getData('accessibilityListForTravel');
}

function getAwards(): Award[] {
  return getData('awards');
}

function getStages(): HotelReportStage[] {
  return getData('stages');
}

function getStagesProgress(): HotelReportStageProgress[] {
  return getData('stagesProgress');
}

function getCategories(): HotelReportCategory[] {
  return getData('categories');
}

function getCategoriesProgress(): HotelReportCategoryProgress[] {
  return getData('categoriesProgress');
}

export const handlers = [
  /** GET запросы **/
  http.get(API.Health, () => {
    return HttpResponse.json<ApiServerResponse<Record<string, string>>>({
      success: true,
      statusCode: 200,
      message: '',
      data: { status: 'ok' },
    });
  }),

  http.get(API.Reviews, () => {
    return HttpResponse.json<ApiServerResponse<Review[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: getReviews(),
    });
  }),

  http.get(API.Cities, () => {
    return HttpResponse.json<ApiServerResponse<City[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: getCities(),
    });
  }),

  http.get(API.AccessibilityListForTravel, () => {
    return HttpResponse.json<ApiServerResponse<AccessibilityItemForTravel[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: getAccessibilityListForTravel(),
    });
  }),

  http.get(API.Hotels, () => {
    return HttpResponse.json<ApiServerResponse<Hotel[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: getHotels(),
    });
  }),

  http.get(API.Trips, ({ request }) => {
    const url = new URL(request.url);

    const userId = url.searchParams.get('userId');
    const trips = getTrips();

    return HttpResponse.json<ApiServerResponse<Trip[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: [...trips].filter(trip => trip.userId === Number(userId)),
    });
  }),

  http.get(API.Awards, () => {
    return HttpResponse.json<ApiServerResponse<Award[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: getAwards(),
    });
  }),

  http.get(API.Loyalty, () => {
    return HttpResponse.json<ApiServerResponse<LoyaltyBase[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: getLoyalty(),
    });
  }),

  http.get(API.HotelReports, ({ request }) => {
    const url = new URL(request.url);

    const userId = url.searchParams.get('userId');
    const reports = getReports();
    const filteredReports = [...reports].filter(report => report.userId === Number(userId));
    const trips = getTrips();

    return HttpResponse.json<ApiServerResponse<HotelReportResponse[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: filteredReports.map(report => ({
        id: report.id,
        userId: report.userId,
        trip: trips.find(trip => trip.id === report.tripId)!,
        totalScore: report.totalScore,
        comment: report.comment,
        createdDate: report.createdDate,
        progress: report.progress,
      })),
    });
  }),

  http.get(API.HotelReportById, ({ request }) => {
    const url = new URL(request.url);

    const reportId = url.searchParams.get('reportId');
    const report = getReports().find(report => report.id === Number(reportId));

    if (!report) {
      return HttpResponse.json<ApiServerResponse<HotelReportResponse | null>>({
        success: true,
        statusCode: 200,
        message: '',
        data: null,
      });
    }

    const trip = getTrips().find(trip => trip.id === report.tripId)!;

    return HttpResponse.json<ApiServerResponse<HotelReportResponse>>({
      success: true,
      statusCode: 200,
      message: '',
      data: {
        id: report.id,
        userId: report.userId,
        trip,
        totalScore: report.totalScore,
        comment: report.comment,
        createdDate: report.createdDate,
        progress: report.progress,
      },
    });
  }),

  http.get(API.HotelReportStagesByReportId, ({ request }) => {
    const url = new URL(request.url);

    const reportId = url.searchParams.get('reportId');
    const report = getReports().find(report => report.id === Number(reportId));

    if (!report) {
      return HttpResponse.json<ApiServerResponse<HotelReportStageResponse[]>>({
        success: true,
        statusCode: 200,
        message: '',
        data: [],
      });
    }

    const stages = getStages();
    const stagesProgress = getStagesProgress();

    return HttpResponse.json<ApiServerResponse<HotelReportStageResponse[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: stages.map(stage => ({
        ...stage,
        // сюда подмешиваем данные о прогрессе по данному этапу на основе данных из таблицы scores
        // необходимо подсчитывать сколько оценок критериев есть относящиеся к данному этапу
        progress: stagesProgress.find(progress => progress.stageId === stage.id)!,
      })),
    });
  }),

  http.get(API.HotelReportCategoriesByStageId, ({ request }) => {
    const url = new URL(request.url);

    const stageId = url.searchParams.get('stageId');
    const stage = getStages().find(stage => stage.id === Number(stageId));

    if (!stage) {
      return HttpResponse.json<ApiServerResponse<HotelReportCategoryResponse[]>>({
        success: true,
        statusCode: 200,
        message: '',
        data: [],
      });
    }

    const categories = getCategories();
    const categoriesProgress = getCategoriesProgress();

    return HttpResponse.json<ApiServerResponse<HotelReportCategoryResponse[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: categories
        .filter(category => category.stageId === Number(stageId))
        .map(category => ({
          ...category,
          // сюда подмешиваем данные о прогрессе по данному категории на основе данных из таблицы scores
          // необходимо подсчитывать сколько оценок критериев есть относящиеся к данной категории
          progress: categoriesProgress.find(progress => progress.categoryId === category.id)!,
        })),
    });
  }),
  /** GET запросы **/

  /** POST запросы **/
  http.post(API.SendRequestForm, async ({ request }) => {
    const body = (await request.json()) as RequestForm;
    const currentUsers = getUsers();
    const countCurrentUsers = currentUsers.length;
    const newUser: User = {
      id: countCurrentUsers + 1,
      role: 'user',
      username: body.user.username,
      password: body.user.password,
      firstName: body.user.firstName,
      lastName: body.user.lastName,
      avatar: '',
      email: body.user.email,
      phone: body.user.phone,
      age: body.user.age,
      city: body.user.city,
      programRequestStatus: 'pending',
      loyalty: {
        score: 0,
        code: 'bronze',
      },
    };
    localStorage.setItem('users', JSON.stringify([...currentUsers, newUser]));

    return HttpResponse.json<ApiServerResponse<User>>({
      success: true,
      statusCode: 200,
      message: 'Заявка оформлена',
      data: newUser,
    });
  }),

  http.post(API.Login, async ({ request }) => {
    const body = (await request.json()) as LoginForm;
    const currentUsers = getUsers();
    const user = currentUsers.find(item => item.username === body.username);

    if (!user) {
      return HttpResponse.json<ApiServerResponse<User | null>>({
        success: false,
        statusCode: 404,
        message: 'Такого пользователя не существует',
        data: null,
      });
    }

    if (user.password !== body.password) {
      return HttpResponse.json<ApiServerResponse<User | null>>({
        success: false,
        statusCode: 401,
        message: 'Неправильный пароль',
        data: null,
      });
    }

    return HttpResponse.json<ApiServerResponse<User>>({
      success: true,
      statusCode: 200,
      message: '',
      data: user,
    });
  }),

  http.post(API.HotelReportCreate, async ({ request }) => {
    const body = (await request.json()) as CreateHotelReportForm;
    const reports = getReports();
    const lastId = reports[reports.length - 1]!.id;
    const newReport = {
      id: lastId + 1,
      userId: body.userId,
      tripId: body.tripId,
      totalScore: 0,
      comment: '',
      createdDate: dayjs().format('YYYY-MM-DD'),
    };
    const trips = getTrips();
    const selectedTrip = trips.find(trip => trip.id === body.tripId)!;
    selectedTrip.hasReport = true;

    localStorage.setItem(
      'trips',
      JSON.stringify([...trips.filter(trip => trip.id !== body.tripId), selectedTrip]),
    );
    localStorage.setItem('reports', JSON.stringify([...reports, newReport]));

    return HttpResponse.json<ApiServerResponse<HotelReport>>({
      success: true,
      statusCode: 200,
      message: '',
      data: newReport,
    });
  }),

  http.post(API.TripCreate, async ({ request }) => {
    const body = (await request.json()) as CreateTripForm;
    const trips = getTrips();
    const lastId = trips.sort((a, b) => a.id - b.id)[trips.length - 1]!.id;
    debugger;
    const hotel = getHotels().find(hotel => hotel.id === body.hotelId)!;
    const newTrip: Trip = {
      id: lastId + 1,
      userId: body.userId,
      hotel: hotel,
      startDate: dayjs().add(10, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(15, 'day').format('YYYY-MM-DD'),
      hasReport: false,
      totalScore: 0,
    };

    localStorage.setItem('trips', JSON.stringify([...trips, newTrip]));

    return HttpResponse.json<ApiServerResponse<Trip>>({
      success: true,
      statusCode: 200,
      message: '',
      data: newTrip,
    });
  }),
  /** POST запросы **/
];
