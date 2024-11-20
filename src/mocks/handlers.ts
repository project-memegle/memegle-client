import { http, HttpResponse } from 'msw';
import {
    CHANGE_NICKNAME_URL,
    CHECK_NICKNAME_URL,
} from 'services/NicknameService';
import {
    GET_NOTIFICATION_LIST_URL,
    GET_NOTIFICATION_STATE_URL,
} from 'services/NotificationService';
import { GET_USER_INFO_URL } from 'services/UserInfoService';

const baseURL = import.meta.env.VITE_BASE_URL;
console.log('baseURL', baseURL);
export const handlers = [
    http.get(`${baseURL}${GET_NOTIFICATION_STATE_URL}`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),
    http.get(`${baseURL}${GET_NOTIFICATION_LIST_URL}`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),
    http.get(`${baseURL}/tag`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),
    http.get(`${baseURL}/users/sign/in`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),
    http.get(`${baseURL}/users/sign/up`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),
    http.get(`${baseURL}/users/find/password`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),
    http.get(`${baseURL}${CHECK_NICKNAME_URL}`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),

    http.get(`${baseURL}${CHANGE_NICKNAME_URL}`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),

    http.get(`${baseURL}${GET_USER_INFO_URL}`, () => {
        return HttpResponse.json({
            userId: 'testloginid3',
            nickname: '홍길동',
            email: null,
        });
    }),

    http.post(`${baseURL}/images`, () => {
        return new HttpResponse(null, {
            status: 200,
            statusText: 'OK',
        });
    }),
];
