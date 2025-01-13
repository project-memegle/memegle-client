import { PageableDTO } from 'services/dto/Pageable';
import { get } from 'utils/API/fetcher';
import {
    CategoryResultSectionDTO,
    SearchResultSectionDTO,
} from 'services/dto/ResultDto';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError } from 'axios';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface GetCategoryListParams<T> {
    setLoading: (loading: boolean) => void;
    setResultData: (data: T) => void;
    setError: (error: string | null) => void;
}

interface SearchByParams {
    searchText: string;
    setLoading: (loading: boolean) => void;
    setResultData: (data: SearchResultSectionDTO | null) => void;
    setError: (error: string | null) => void;
}

export const SEARCH_BY_CATEGORY_URL = '/images/category';

export async function searchByCategory({
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
            imageCategory: searchText,
            page: pageData.page.toString(),
            size: pageData.size.toString(),
            criteria: pageData.criteria,
        });
        const response = await get<SearchResultSectionDTO>(
            SEARCH_BY_CATEGORY_URL,
            { params: { queryParams } }
        );

        setResultData(response.data);
    } catch (error) {
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
        const response = await get<CategoryResultSectionDTO>(url);
        setResultData(response.data);
    } catch (error) {
        handleApiError(error as AxiosError, setError);
    } finally {
        setLoading(false);
    }
}

export async function getImagesByCategory(category: string) {
    try {
        const imagesCollectionRef = collection(
            db,
            'categories',
            category,
            'images'
        );

        const q = query(imagesCollectionRef);
        const querySnapshot = await getDocs(q);

        const images = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((data) => data && Object.keys(data).length > 0); // 빈 객체 제외

        if (images.length === 0) {
        }

        return images;
    } catch (error) {
        console.error('Error fetching images by category:', error);
        throw new Error('Failed to fetch images by category');
    }
}
