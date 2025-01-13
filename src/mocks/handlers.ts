import { http, HttpResponse, passthrough } from 'msw';
import { SEARCH_BY_CATEGORY_URL } from 'services/CategoryService';
import {
    CHECK_ID_URL,
    FIND_USER_ID_URL,
    SEND_EMAIL_CODE,
    VERIFY_AUTH_CODE_URL,
} from 'services/IdService';
import {
    CHANGE_NICKNAME_URL,
    CHECK_NICKNAME_URL,
} from 'services/NicknameService';
import {
    GET_NOTIFICATION_LIST_URL,
    GET_NOTIFICATION_STATE_URL,
} from 'services/NotificationService';
import { RESET_PASSWORD_URL } from 'services/PasswordService';
import { GET_USER_INFO_URL } from 'services/UserInfoService';

const baseURL = import.meta.env.VITE_BASE_URL;

export const handlers = [
    http.post(`${baseURL}${SEND_EMAIL_CODE}`, () => {
        return passthrough();
    }),

    http.post(`${baseURL}${FIND_USER_ID_URL}`, () => {
        return passthrough();
    }),

    http.post(`${baseURL}${VERIFY_AUTH_CODE_URL}`, () => {
        return passthrough();
    }),

    http.get(`${baseURL}${CHANGE_NICKNAME_URL}`, () => {
        return passthrough();
    }),
    http.get(`${baseURL}${CHECK_NICKNAME_URL}`, () => {
        return new HttpResponse(null, {
            status: 200,
            statusText: 'OK',
        });
    }),

    http.get(`${baseURL}${CHECK_ID_URL}`, () => {
        return new HttpResponse(null, {
            status: 200,
            statusText: 'OK',
        });
    }),

    http.get(`${baseURL}${GET_USER_INFO_URL}`, () => {
        return passthrough();
    }),

    http.post(`${baseURL}${RESET_PASSWORD_URL}`, () => {
        return passthrough();
    }),

    http.get(`${baseURL}${SEARCH_BY_CATEGORY_URL}`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),

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
];
