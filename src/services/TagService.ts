import { PageableDTO } from 'services/dto/Pageable';
import { get } from 'utils/API/fetcher';
import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError } from 'axios';

interface SearchByParams {
    searchText: string;
    setLoading: (loading: boolean) => void;
    setResultData: (data: SearchResultSectionDTO | null) => void;
    setError: (error: string | null) => void;
}

export const SEARC_BY_TAG_URL = '/images/tag';

export async function searchByTag({
    searchText,
    setLoading,
    setResultData,
    setError,
}: SearchByParams) {
    setLoading(true);
    const pageData: PageableDTO = {
        page: 1,
        size: 10,
        criteria: 'CREATED_AT',
    };
    try {
        const queryParams = new URLSearchParams({
            tagName: searchText,
            page: pageData.page.toString(),
            size: pageData.size.toString(),
            criteria: pageData.criteria,
        });
        const response = await get<SearchResultSectionDTO>(SEARC_BY_TAG_URL, {
            params: { queryParams },
        });
        setResultData(response.data);
    } catch (error) {
        handleApiError(error as AxiosError, setError);
    } finally {
        setLoading(false);
    }
}
