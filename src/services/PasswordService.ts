import { post } from 'utils/API/fetcher';
import axios, { AxiosResponse } from 'axios';
import {
    SendPasswordCodeDTO,
    LoginVerifyPasswordDTO,
    MypageResetPassworddDTO,
    MypageVerifyPasswordDTO,
    LogInResetPasswordDTO,
} from './dto/PasswordDto';
import { SEND_EMAIL_CODE, VERIFY_AUTH_CODE_URL } from './IdService';

export const LOGIN_RESET_PASSWORD_URL = '/users/password';
export const MYPAGE_VERIFY_PASSWORD_URL = '/users/mypage/find/email';
export const MYPAGE_RESET_PASSWORD_URL = '/users/mypage/reset/email';

export async function sendPasswordCode(
    userData: SendPasswordCodeDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            SendPasswordCodeDTO
        >(SEND_EMAIL_CODE, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function loginVerifyPassword(
    userData: LoginVerifyPasswordDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            LoginVerifyPasswordDTO
        >(VERIFY_AUTH_CODE_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function loginResetPassword(
    userData: LogInResetPasswordDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            LogInResetPasswordDTO
        >(LOGIN_RESET_PASSWORD_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function mypageVerifyPassword(
    userData: MypageVerifyPasswordDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            MypageVerifyPasswordDTO
        >(MYPAGE_VERIFY_PASSWORD_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function mypageResetPassword(
    userData: MypageResetPassworddDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            MypageResetPassworddDTO
        >(MYPAGE_RESET_PASSWORD_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
