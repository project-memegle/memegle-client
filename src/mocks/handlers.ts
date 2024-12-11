import { http, HttpResponse, passthrough } from 'msw';
import { UPLOAD_URL } from 'pages/Upload';
import { SEARCH_BY_CATEGORY_URL } from 'services/CategoryService';
import { POST_CHAT_URL } from 'services/ChatService';
import {
    CHECK_ID_URL,
    SEND_EMAIL_CODE,
    VERIFY_AUTH_CODE_URL,
} from 'services/IdService';
import { SIGN_IN_URL } from 'services/LogInService';
import {
    CHANGE_NICKNAME_URL,
    CHECK_NICKNAME_URL,
} from 'services/NicknameService';
import {
    GET_NOTIFICATION_LIST_URL,
    GET_NOTIFICATION_STATE_URL,
} from 'services/NotificationService';
import { RESET_PASSWORD_URL } from 'services/PasswordService';
import { SIGN_UP_URL } from 'services/SignupService';
import { SEARCH_BY_TAG_URL } from 'services/TagService';
import { GET_USER_INFO_URL } from 'services/UserInfoService';
import { VERIFY_VERIFICATION_URL } from 'services/VerificationService';

const baseURL = import.meta.env.VITE_BASE_URL;

export const handlers = [
    http.post(`${baseURL}${SIGN_IN_URL}`, () => {
        return passthrough();
    }),

    http.post(`${baseURL}${SEND_EMAIL_CODE}`, () => {
        return passthrough();
    }),

    http.post(`${baseURL}${VERIFY_AUTH_CODE_URL}`, () => {
        return passthrough();
    }),

    http.get(`${baseURL}${CHANGE_NICKNAME_URL}`, () => {
        return passthrough();
    }),
    http.get(`${baseURL}${CHECK_NICKNAME_URL}`, () => {
        return passthrough();
    }),

    http.get(`${baseURL}${CHECK_ID_URL}`, () => {
        return passthrough();
    }),

    http.get(`${baseURL}${GET_USER_INFO_URL}`, () => {
        return passthrough();
    }),

    http.post(`${baseURL}${SIGN_UP_URL}`, () => {
        return passthrough();
    }),

    http.post(`${baseURL}${RESET_PASSWORD_URL}`, () => {
        return new HttpResponse(null, {
            status: 200,
            statusText: 'OK',
        });
        return passthrough();
    }),

    http.post(`${baseURL}${UPLOAD_URL}`, () => {
        return new HttpResponse(null, {
            status: 200,
            statusText: 'OK',
        });
        return passthrough();
    }),

    http.get(`${baseURL}${SEARCH_BY_CATEGORY_URL}`, () => {
        return new HttpResponse(null, {
            status: 204,
            statusText: 'OK',
        });
    }),
    http.get(`${baseURL}${SEARCH_BY_TAG_URL}`, () => {
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

    http.post(`${baseURL}${VERIFY_VERIFICATION_URL}`, () => {
        return new HttpResponse(null, {
            status: 200,
            statusText: 'OK',
        });
    }),

    http.post(`${baseURL}${POST_CHAT_URL}`, () => {
        return new HttpResponse(null, {
            status: 200,
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
