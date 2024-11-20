import { AxiosResponse } from 'axios';
import { post } from 'utils/API/fetcher';
import { IdSearchRequestDTO, IdSearchResponseDTO } from './dto/IdDto';

export const POST_ID_SEARCH_URL = '/user/verify/apply/id';
export const VERIFY_ID_CODE_URL = '/user/verify/check/id';

export async function postIdSearchCode(
    userData: IdSearchRequestDTO
): Promise<void> {
    try {
        await post<void, IdSearchRequestDTO>(POST_ID_SEARCH_URL, userData);
    } catch (error) {
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
        throw error;
    }
}
