import { AxiosError, AxiosResponse } from 'axios';
import { get, post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import {
    NicknameChangeRequestDTO,
    NicknameCheckRequestDTO,
    NicknameCheckResponseDTO,
} from './dto/NicknameDto';

export const CHECK_NICKNAME_URL = '/users/check/nickname';
export const CHANGE_NICKNAME_URL = '/users/change/nickname';

export async function checkNickname(
    userData: NicknameCheckRequestDTO
): Promise<NicknameCheckResponseDTO | undefined> {
    try {
        const response: AxiosResponse<NicknameCheckResponseDTO> =
            await get<NicknameCheckResponseDTO>(
                CHECK_NICKNAME_URL,
                { params: userData } // Pass userData as query parameters
            );
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}

export async function changeNickname(
    userData: NicknameChangeRequestDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            NicknameChangeRequestDTO
        >(CHANGE_NICKNAME_URL, userData);
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
