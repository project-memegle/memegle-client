import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { UPLOAD_URL } from 'pages/Upload';
import { useNavigate } from 'react-router-dom';
import { GET_USER_INFO_URL } from 'services/UserInfoService';
import { getAccessToken } from 'utils/Auth/authAuth';
import { getCookie, setCookie } from 'utils/Storage/cookies';
import { getEnvVariableAsNumber } from 'utils/Storage/numberUntils';
const ValidationMessages = getValidationMessages();

const baseURL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = StorageKeyword.ACCESS_TOKEN;
const REFRESH_TOKEN = StorageKeyword.REFRESH_TOKEN;

const instance = axios.create({
    baseURL,
    timeout: 10000,
    // withCredentials: true,
});

const AUTH_REQUIRED_URLS = [GET_USER_INFO_URL, UPLOAD_URL];

// 요청 인터셉터 추가
instance.interceptors.request.use(
    (config) => {
        if (AUTH_REQUIRED_URLS.length > 1) {
            const isAuthRequired = AUTH_REQUIRED_URLS.some((url) =>
                config.url?.includes(url)
            );
            if (isAuthRequired) {
                const token = getAccessToken();
                if (token) {
                    const headers = config.headers
                        ? new AxiosHeaders(config.headers)
                        : new AxiosHeaders();
                    headers.set('Authorization', `Bearer ${token}`);
                    config.headers = headers;
                }
            }
        }
        return config; // 수정된 config 반환
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 새로운 액세스 토큰을 요청하는 함수
const refreshAccessToken = async (
    originalRequest: AxiosRequestConfig,
    navigate: (path: string) => void
) => {
    const refreshToken = getCookie(REFRESH_TOKEN);

    if (!refreshToken) {
        navigate('/login'); // 리프레시 토큰 없음 → 로그인 페이지로 이동
        return Promise.reject(new Error(ValidationMessages.INVALID_TOKEN));
    }

    try {
        originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${refreshToken}`,
        };

        return await instance(originalRequest);
    } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        navigate('/login'); // 리프레시 토큰 만료 → 로그인 페이지로 이동
        return Promise.reject(refreshError);
    }
};

// 응답 인터셉터 추가
export const setupInterceptors = (navigate: (path: string) => void) => {
    instance.interceptors.response.use(
        (response) => response, // 성공적인 응답은 그대로 반환
        async (error: AxiosError) => {
            const originalRequest = error.config;
            if (originalRequest && AUTH_REQUIRED_URLS.length > 1) {
                const isAuthRequired = AUTH_REQUIRED_URLS.some((url) =>
                    originalRequest.url?.startsWith(url)
                );

                if (!isAuthRequired) {
                    // 인증이 필요 없는 요청은 에러만 반환
                    return Promise.reject(error as AxiosError);
                }

                // 무한 루프 방지 플래그
                const headers = new AxiosHeaders(originalRequest.headers);
                if (headers.has('x-retry')) {
                    return Promise.reject(error);
                }

                if (error.response?.status === 401) {
                    try {
                        headers.set('x-retry', 'true'); // 플래그 추가
                        originalRequest.headers = headers;
                        return await refreshAccessToken(
                            originalRequest,
                            navigate
                        );
                    } catch (refreshError) {
                        navigate('/login'); // 리프레시 토큰 만료 또는 실패 → 로그인 이동
                        return Promise.reject(refreshError);
                    }
                }
            }
            return Promise.reject(error);
        }
    );
};

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
