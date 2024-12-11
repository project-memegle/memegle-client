import { AxiosResponse } from 'axios';
import { post } from 'utils/API/fetcher';
import { VerificationRequestDTO } from './dto/VerificationDto';
import { SEND_EMAIL_CODE } from './IdService';

export const VERIFY_VERIFICATION_URL = '/user/verify/check';
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
    userData: VerificationRequestDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            VerificationRequestDTO
        >(VERIFY_VERIFICATION_URL, userData);
    } catch (error) {
        throw error;
    }
}
