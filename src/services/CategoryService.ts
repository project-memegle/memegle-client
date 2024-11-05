import { PageableDTO } from 'services/dto/Pageable';
import { get } from 'utils/API/fetcher';
import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError } from 'axios';

interface SearchByCategoryParams {
    keyword: string;
    setLoading: (loading: boolean) => void;
    setResultData: (data: SearchResultSectionDTO) => void;
    setError: (error: string | null) => void;
}

export async function searchByCategory({
    keyword,
    setLoading,
    setResultData,
    setError,
}: SearchByCategoryParams) {
    setLoading(true);

    const pageData: PageableDTO = {
        page: 1,
        size: 10,
        criteria: 'CREATED_AT',
    };

    try {
        const queryParams = new URLSearchParams({
            imageCategory: keyword,
            page: pageData.page.toString(),
            size: pageData.size.toString(),
            criteria: pageData.criteria,
        });
        const url = `/images/category?${queryParams.toString()}`;
        const response = await get<SearchResultSectionDTO>(url);

        console.log('Result:', response.data);
        setResultData(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        handleApiError(error as AxiosError, setError);
    } finally {
        setLoading(false);
    }
}
