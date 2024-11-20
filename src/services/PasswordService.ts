import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError, AxiosResponse } from 'axios';
import {
    ChangePasswordDTO,
    FindPasswordDTO,
    PasswordEmailVerificationDTO,
} from './dto/PasswordDto';

export const FIND_PASSWORD_URL = '/users/find/password';
export const CHANGE_PASSWORD_URL = '/users/change/password';
export const VERIFY_PASSWORD_URL = '/users/verify/password';

export async function findPassword(userData: FindPasswordDTO): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<void, FindPasswordDTO>(
            FIND_PASSWORD_URL,
            userData
        );
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}

export async function verifyEmailPassword(
    userData: PasswordEmailVerificationDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            PasswordEmailVerificationDTO
        >(VERIFY_PASSWORD_URL, userData);
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
export async function postChangePassword(
    userData: ChangePasswordDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            ChangePasswordDTO
        >(CHANGE_PASSWORD_URL, userData);
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
