import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import ValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from 'utils/Auth/authAuth';
import { getCookie, setCookie } from 'utils/Storage/cookies';
import { getEnvVariableAsNumber } from 'utils/Storage/numberUntils';

const baseURL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = StorageKeyword.ACCESS_TOKEN;
const REFRESH_TOKEN = StorageKeyword.REFRESH_TOKEN;

const instance = axios.create({
    baseURL,
    timeout: 10000,
    // withCredentials: true,
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
const refreshAccessToken = async (
    originalRequest: AxiosRequestConfig,
    navigate: (path: string) => void
) => {
    const refreshToken = getCookie(REFRESH_TOKEN);

    // 리프레시 토큰이 없으면 로그인 페이지로 이동
    if (!refreshToken) {
        //todo: 401에러 날때만 로긍인 페이지로 이동하도록 수정
        // navigate('/login');
        return Promise.reject(new Error(ValidationMessages.INVALID_TOKEN));
    }

    try {
        // 리프레시 토큰으로 원래 요청을 재전송
        originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${refreshToken}`,
        };

        return await instance(originalRequest);
    } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        // navigate('/login');
        return Promise.reject(refreshError);
    }
};

// 응답 인터셉터 추가
export const setupInterceptors = (navigate: (path: string) => void) => {
    instance.interceptors.response.use(
        (response) => response, // 성공적인 응답은 그대로 반환
        async (error: AxiosError) => {
            const originalRequest = error.config;

            if (originalRequest) {
                // 무한 루프 방지 플래그
                const headers = new AxiosHeaders(originalRequest.headers);
                if (headers.has('x-retry')) {
                    return Promise.reject(error);
                }

                try {
                    headers.set('x-retry', 'true'); // 플래그 추가
                    originalRequest.headers = headers;

                    return await refreshAccessToken(originalRequest, navigate);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
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
