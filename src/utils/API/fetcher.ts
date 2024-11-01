import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from 'utils/Auth/authAuth';
import { getCookie, setCookie } from 'utils/Storage/cookies';

const baseURL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const instance = axios.create({
    baseURL,
    timeout: 10000,
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            // 헤더가 정의되어 있지 않으면 빈 객체로 초기화
            const headers = config.headers
                ? new AxiosHeaders(config.headers)
                : new AxiosHeaders();
            headers.set('Authorization', `Bearer ${token}`);
            config.headers = headers;
        }
        return config; // 수정된 config 반환
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 새로운 액세스 토큰을 요청하는 함수
const refreshAccessToken = async (originalRequest: AxiosRequestConfig) => {
    const refreshToken = getCookie(REFRESH_TOKEN); // 쿠키에서 refresh_token 가져오기
    const ACCESS_TOKEN_STORE = import.meta.env.ACCESS_TOKEN_STORE;
    if (!refreshToken) {
        return Promise.reject(new Error('Refresh token is not available.'));
    }

    try {
        const response = await axios.post(`${baseURL}/refresh`, {
            token: refreshToken,
        });
        const newAccessToken = response.data.access_token;

        // 새로운 액세스 토큰을 쿠키에 저장
        setCookie(ACCESS_TOKEN, newAccessToken, ACCESS_TOKEN_STORE);

        // 원래 요청에 새로운 액세스 토큰 추가
        originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
        };

        // 원래 요청 재전송
        return instance(originalRequest);
    } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        return Promise.reject(refreshError);
    }
};

// 응답 인터셉터 추가
instance.interceptors.response.use(
    (response) => response, // 성공적인 응답은 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            // 401 Unauthorized 에러인 경우 리프레시 토큰 요청
            return refreshAccessToken(originalRequest);
        }

        return Promise.reject(error);
    }
);

// GET 요청 함수
const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url, config);
};

// POST 요청 함수
const post = async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.post<T>(url, data, config);
};

// PUT 요청 함수
const put = async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.put<T>(url, data, config);
};

// DELETE 요청 함수
const del = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url, config);
};

export { get, post, put, del };
