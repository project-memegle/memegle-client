import { PageableDTO } from 'services/dto/Pageable';
import { get } from 'utils/API/fetcher';
import {
    CategoryResultSectionDTO,
    SearchResultSectionDTO,
} from 'services/dto/ResultDto';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError, AxiosResponse } from 'axios';

interface GetCategoryListParams<T> {
    setLoading: (loading: boolean) => void;
    setResultData: (data: T) => void;
    setError: (error: string | null) => void;
}

interface SearchByCategoryParams
    extends GetCategoryListParams<SearchResultSectionDTO> {
    keyword: string;
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

        setResultData(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        handleApiError(error as AxiosError, setError);
    } finally {
        setLoading(false);
    }
}

export async function getCategorylist({
    setLoading,
    setResultData,
    setError,
}: GetCategoryListParams<CategoryResultSectionDTO>) {
    setLoading(true);

    try {
        const queryParams = 'POPULARITY';
        const url = `/categories?criteria=${queryParams}`;

        // CategoryResultSectionDTO를 받아옵니다
        const response = await get<CategoryResultSectionDTO>(url);
        // 결과 배열만 추출하여 setResultData로 전달
        setResultData(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        handleApiError(error as AxiosError, setError);
    } finally {
        setLoading(false);
    }
}
