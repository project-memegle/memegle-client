import { AxiosResponse } from 'axios';
import { post } from 'utils/API/fetcher';
import { VerificationRequestDTO } from './dto/VerificationDto';
import { SEND_EMAIL_CODE, VERIFY_AUTH_CODE_URL } from './IdService';
import { VerifyCodePasswordDTO } from './dto/PasswordDto';

export async function postVerificationCode(
    userData: VerificationRequestDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            VerificationRequestDTO
        >(SEND_EMAIL_CODE, userData);
    } catch (error) {
        throw error;
    }
}
export async function verifyVerificationCode(
    userData: VerifyCodePasswordDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            VerifyCodePasswordDTO
        >(VERIFY_AUTH_CODE_URL, userData);
    } catch (error) {
        throw error;
    }
}
