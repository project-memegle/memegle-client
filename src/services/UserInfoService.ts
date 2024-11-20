import { get } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError, AxiosResponse } from 'axios';
import { UserInfoResponseDTO } from './dto/UserInfoDto';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

export const GET_USER_INFO_URL = '/users/info';

export async function getUserInfo(): Promise<UserInfoResponseDTO | undefined> {
    try {
        const response: AxiosResponse<UserInfoResponseDTO> =
            await get<UserInfoResponseDTO>(GET_USER_INFO_URL);

        setSessionStorages({
            key: StorageKeyword.USER_ID,
            value: response.data.userId,
        });

        setSessionStorages({
            key: StorageKeyword.USER_NICKNAME,
            value: response.data.nickname,
        });

        // Handle the case where email can be null
        const email = response.data.email ?? '';
        setSessionStorages({
            key: StorageKeyword.USER_EMAIL,
            value: email,
        });

        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
