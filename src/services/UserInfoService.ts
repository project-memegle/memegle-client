import { get } from 'utils/API/fetcher';
import axios, { AxiosResponse } from 'axios';
import { UserInfoResponseDTO } from './dto/UserInfoDto';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

export const GET_USER_INFO_URL = '/users';

export async function getUserInfo(): Promise<UserInfoResponseDTO | undefined> {
    try {
        const response: AxiosResponse = await get<UserInfoResponseDTO>(
            GET_USER_INFO_URL
        );

        setSessionStorages({
            key: StorageKeyword.USER_ID,
            value: response.data.results.loginId,
        });

        setSessionStorages({
            key: StorageKeyword.USER_NICKNAME,
            value: response.data.results.nickname,
        });

        // Handle the case where email can be null
        const email = response.data.results.email ?? '';
        setSessionStorages({
            key: StorageKeyword.USER_EMAIL,
            value: email,
        });

        return response.data.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
