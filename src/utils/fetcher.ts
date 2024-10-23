import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from 'process';

// 인스턴스 생성
const instance = axios.create({
    baseURL: env.BASE_URL,
    timeout: 10000,
});

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
