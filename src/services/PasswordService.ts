import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError, AxiosResponse } from 'axios';
import {
    LogInResetPassworddDTO,
    LoginVerifyIdEmailDTO,
    LoginVerifyPasswordDTO,
    MypageResetPassworddDTO,
    MypageVerifyPasswordDTO,
} from './dto/PasswordDto';

export const VERIFY_EMAIL_ID_URL = '/users/check/email';
export const LOGIN_VERIFY_PASSWORD_URL = '/users/login/find/email';
export const LOGIN_RESET_PASSWORD_URL = '/users/login/reset/password';
export const MYPAGE_VERIFY_PASSWORD_URL = '/users/mypage/find/email';
export const MYPAGE_RESET_PASSWORD_URL = '/users/mypage/reset/email';

export async function verifyIdEmail(
    userData: LoginVerifyIdEmailDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            LoginVerifyIdEmailDTO
        >(VERIFY_EMAIL_ID_URL, userData);
        return response.data;
    } catch (error) {
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
        >(LOGIN_VERIFY_PASSWORD_URL, userData);
    } catch (error) {
        throw error;
    }
}
export async function loginResetPassword(
    userData: LogInResetPassworddDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            LogInResetPassworddDTO
        >(LOGIN_RESET_PASSWORD_URL, userData);
    } catch (error) {
        handleApiError(error as AxiosError);
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
        handleApiError(error as AxiosError);
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
        handleApiError(error as AxiosError);
    }
}
