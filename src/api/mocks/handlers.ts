import { http, HttpResponse } from 'msw';
import type { ApiServerResponse, LoginForm, RequestForm, Review, User } from '../../types.ts';
import { API } from '../../constants.ts';

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem('users') ?? '[]');
}

export const handlers = [
  http.get(API.Reviews, () => {
    return HttpResponse.json<ApiServerResponse<Review[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: [
        {
          id: 1,
          imageUrl:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
          name: 'Анна К.',
          city: 'Москва',
          text: "Участие в программе 'Секретный гость' позволило мне посетить прекрасный отель в Сочи, который я бы не смогла себе позволить. Процесс оценки был простым и интуитивно понятным.",
        },
        {
          id: 2,
          imageUrl:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
          name: 'Дмитрий Л.',
          city: 'Санкт-Петербург',
          text: 'Благодаря программе я смог совместить приятное с полезным - отдохнуть в хорошем отеле и помочь другим путешественникам получить честную информацию о нем.',
        },
      ],
    });
  }),

  http.get(API.Cities, () => {
    return HttpResponse.json<ApiServerResponse<string[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: ['Новосибирск', 'Пермь', 'Екатеринбург', 'Санкт-Петербург', 'Москва'],
    });
  }),

  http.get(API.AccessibilityListForTravel, () => {
    return HttpResponse.json<ApiServerResponse<string[]>>({
      success: true,
      statusCode: 200,
      message: '',
      data: ['Только выходные', 'Только будни', 'В любое время', 'Только праздники и отпуск'],
    });
  }),

  http.post(API.SendRequestForm, async ({ request }) => {
    const body = (await request.json()) as RequestForm;
    const currentUsers = getUsers();
    const countCurrentUsers = currentUsers.length;
    const newUser: User = {
      id: countCurrentUsers + 1,
      username: body.user.username,
      password: body.user.password,
      firstName: body.user.firstName,
      lastName: body.user.lastName,
      avatar: '',
      email: body.user.email,
      phone: body.user.phone,
      age: body.user.age,
      city: body.user.city,
      status: 'Заявка находится на рассмотрении',
      loyalty: {
        score: 0,
        status: 'bronze',
      },
      role: 'user',
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
      return HttpResponse.json<ApiServerResponse<null>>({
        success: false,
        statusCode: 404,
        message: 'Такого пользователя не существует',
        data: null,
      });
    }

    if (user.password !== body.password) {
      return HttpResponse.json<ApiServerResponse<null>>({
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
];
