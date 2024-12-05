import { PageableDTO } from 'services/dto/Pageable';
import { get } from 'utils/API/fetcher';
import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError } from 'axios';

export const SEARC_BY_TAG_URL = '/images/tag';
export async function searchByTag<T extends string | number>(
    tag: T,
    setLoading: (loading: boolean) => void,
    setResultData: (data: SearchResultSectionDTO) => void,
    setError: (error: string | null) => void
) {
    setLoading(true);
    const pageData: PageableDTO = {
        page: 1,
        size: 10,
        criteria: 'CREATED_AT',
    };
    try {
        const queryParams = new URLSearchParams({
            imageTags: tag.toString(),
            page: pageData.page.toString(),
            size: pageData.size.toString(),
            criteria: pageData.criteria,
        });
        const response = await get<SearchResultSectionDTO>(SEARC_BY_TAG_URL, {
            params: { queryParams },
        });
        setResultData(response.data);
        setLoading(false);
    } catch (error) {
        handleApiError(error as AxiosError, setError);
    }
}
