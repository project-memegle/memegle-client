import { PageableDTO } from 'services/dto/Pageable';
import { get } from 'utils/API/fetcher';
import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError } from 'axios';

export async function searchByTag<T extends string | number>(
    tag: T,
    setLoading: (loading: boolean) => void,
    setResultData: (data: SearchResultSectionDTO) => void,
    setError: (error: string | null) => void
) {
    setLoading(true);
    const url = `/tag`;
    try {
        const response = await get<SearchResultSectionDTO>(url);
        setResultData(response);
        setLoading(false);
    } catch (error) {
        handleApiError(error as AxiosError, setError);
    }
}
