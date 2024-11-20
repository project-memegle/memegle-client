import { AxiosResponse } from 'axios';
import { post } from 'utils/API/fetcher';
import {
    VerificationRequestDTO,
    VerificationResponseDTO,
} from './dto/VerificationDto';

export const POST_VERIFICATION_URL = '/user/verify/apply';
export const VERIFY_VERIFICATION_URL = '/user/verify/check';
export async function postVerificationCode(
    userData: VerificationRequestDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            VerificationRequestDTO
        >(POST_VERIFICATION_URL, userData);
    } catch (error) {
        throw error;
    }
}
export async function verifyVerificationCode(
    userData: VerificationResponseDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            VerificationResponseDTO
        >(VERIFY_VERIFICATION_URL, userData);
    } catch (error) {
        throw error;
    }
}
