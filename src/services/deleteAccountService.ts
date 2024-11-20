import { AxiosError, AxiosResponse } from 'axios';
import { DeleteAccountDTO } from './dto/DeleteAccountDto';
import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';

const DELETE_ACCOUNT_URL = '/user/delete/account';
export async function postDeleteAccount(
    userData: DeleteAccountDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            DeleteAccountDTO
        >(DELETE_ACCOUNT_URL, userData);
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
