import { post, put } from 'utils/API/fetcher';
import axios, { AxiosResponse } from 'axios';
import {
    VerifyCodePasswordDTO,
    ResetPasswordDTO,
    SendPasswordCodeDTO,
} from './dto/PasswordDto';
import { SEND_EMAIL_CODE, VERIFY_AUTH_CODE_URL } from './IdService';

export const RESET_PASSWORD_URL = '/users/password';

export async function SendPasswordCode(
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
export async function VerifyCodePassword(
    userData: VerifyCodePasswordDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            VerifyCodePasswordDTO
        >(VERIFY_AUTH_CODE_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function ResetPassword(userData: ResetPasswordDTO): Promise<void> {
    try {
        const response: AxiosResponse<void> = await put<
            void,
            ResetPasswordDTO
        >(RESET_PASSWORD_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
