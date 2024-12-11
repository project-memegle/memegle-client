import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import { UPLOAD_URL } from 'pages/Upload';
import { CHANGE_NICKNAME_URL } from 'services/NicknameService';
import { GET_USER_INFO_URL } from 'services/UserInfoService';
import { getAccessToken } from 'utils/Auth/authAuth';
import { getCookie } from 'utils/Storage/cookies';

const ValidationMessages = getValidationMessages();

const baseURL = import.meta.env.VITE_BASE_URL;
const REFRESH_TOKEN = StorageKeyword.REFRESH_TOKEN;

const instance = axios.create({
    baseURL,
    timeout: 10000,
    // withCredentials: true,
});

const AUTH_REQUIRED_URLS = [GET_USER_INFO_URL, UPLOAD_URL, CHANGE_NICKNAME_URL];

instance.interceptors.request.use(
    (config) => {
        if (AUTH_REQUIRED_URLS.length > 1) {
            const isAuthRequired = AUTH_REQUIRED_URLS.some((url) =>
                config.url?.includes(url)
            );
            if (isAuthRequired) {
                const token = getAccessToken();
                console.log('token', token);
                console.log('isAuthRequired', isAuthRequired);
                console.log('AUTH_REQUIRED_URLS', AUTH_REQUIRED_URLS);
                if (token) {
                    const headers = config.headers
                        ? new AxiosHeaders(config.headers)
                        : new AxiosHeaders();
                    headers.set('Authorization', `Bearer ${token}`);
                    config.headers = headers;
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const refreshAccessToken = async (
    originalRequest: AxiosRequestConfig,
    navigate: (path: string) => void
) => {
    const refreshToken = getCookie(REFRESH_TOKEN);
    if (!refreshToken) {
        navigate('/login');
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
        navigate('/login');
        return Promise.reject(refreshError);
    }
};

export const setupInterceptors = (navigate: (path: string) => void) => {
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config;
            if (originalRequest && AUTH_REQUIRED_URLS.length > 1) {
                const isAuthRequired = AUTH_REQUIRED_URLS.some((url) =>
                    originalRequest.url?.startsWith(url)
                );
                if (!isAuthRequired) {
                    return Promise.reject(error as AxiosError);
                }
                const headers = new AxiosHeaders(originalRequest.headers);
                if (headers.has('x-retry')) {
                    return Promise.reject(error);
                }
                if (error.response?.status === 401) {
                    try {
                        headers.set('x-retry', 'true');
                        originalRequest.headers = headers;
                        return await refreshAccessToken(
                            originalRequest,
                            navigate
                        );
                    } catch (refreshError) {
                        navigate('/login');
                        return Promise.reject(refreshError);
                    }
                }
            }
            return Promise.reject(error);
        }
    );
};

const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url, config);
};

const post = async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.post<T>(url, data, config);
};

const put = async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.put<T>(url, data, config);
};

const del = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url, config);
};

export { get, post, put, del };
