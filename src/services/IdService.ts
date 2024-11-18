import { get } from 'utils/API/fetcher';
import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import { handleApiError } from 'utils/API/handleApiError';
import { AxiosError } from 'axios';

export async function searchById(
    id: number,
    setLoading: (loading: boolean) => void,
    setResultData: (data: SearchResultSectionDTO) => void,
    setError: (error: string | null) => void
) {
    setLoading(true);

    const url = '/images/' + id;
    return get<SearchResultSectionDTO>(url)
        .then((response) => {
            setResultData(response);
        })
        .catch((error) => {
            console.error('Error fetching categories:', error);
            handleApiError(error as AxiosError, setError);
        })
        .finally(() => {
            setLoading(false);
        });
}
