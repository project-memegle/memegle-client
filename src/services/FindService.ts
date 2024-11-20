import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError, AxiosResponse } from 'axios';
import { FindPasswordDTO } from './dto/FindDto';

export async function findPassword(userData: FindPasswordDTO): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<void, FindPasswordDTO>(
            '/users/find/password',
            userData
        );
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
