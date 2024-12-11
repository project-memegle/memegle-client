import axios, { AxiosError, AxiosResponse } from 'axios';
import { get, post, put } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import {
    NicknameChangeRequestDTO,
    NicknameCheckRequestDTO,
} from './dto/NicknameDto';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

export const CHECK_NICKNAME_URL = '/auth/nickname';
export const CHANGE_NICKNAME_URL = '/users/nickname';

export async function checkNickname(
    userData: NicknameCheckRequestDTO
): Promise<boolean> {
    try {
        await get(CHECK_NICKNAME_URL, {
            params: userData,
        });
        setSessionStorages({
            key: StorageKeyword.CHANGE_NICKNAME_SUCCESS,
            value: StorageKeyword.TRUE,
        });
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}

export async function changeNickname(
    userData: NicknameChangeRequestDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await put<
            void,
            NicknameChangeRequestDTO
        >(CHANGE_NICKNAME_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
