import axios, { AxiosResponse } from 'axios';
import { get, post } from 'utils/API/fetcher';
import {
    checkIdRequestDTO,
    IdSearchRequestDTO,
    IdSearchResponseDTO,
} from './dto/IdDto';

export const CHECK_ID_URL = '/auth/login-id';
export const POST_ID_SEARCH_URL = '/user/verify/apply/id';
export const VERIFY_ID_CODE_URL = '/user/verify/check/id';

export async function checkId(userData: checkIdRequestDTO): Promise<boolean> {
    try {
        await get(CHECK_ID_URL, {
            params: userData,
        });
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function postIdSearchCode(
    userData: IdSearchRequestDTO
): Promise<void> {
    try {
        await post<void, IdSearchRequestDTO>(POST_ID_SEARCH_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}

export async function verifyIdSearchCode(
    userData: IdSearchResponseDTO
): Promise<AxiosResponse<{ userId: string }>> {
    try {
        const response: AxiosResponse<{ userId: string }> = await post<
            { userId: string },
            IdSearchResponseDTO
        >(VERIFY_ID_CODE_URL, userData);

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
