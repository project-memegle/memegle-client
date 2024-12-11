import { AxiosError, AxiosResponse } from 'axios';
import { DeleteAccountDTO } from './dto/DeleteAccountDto';
import { del } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';

export const DELETE_ACCOUNT_URL = '/users';
export async function postDeleteAccount(
    userData: DeleteAccountDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await del<void>(
            DELETE_ACCOUNT_URL
        );
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
