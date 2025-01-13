import { useEffect, useState } from 'react';
import {
    SearchResultItemDTO,
} from 'services/dto/ResultDto';
import { getLastKeywordFromUrl } from 'utils/Event/saveUrl';
import { useLocation } from 'react-router-dom';
import { normalizeString } from 'utils/Format/normalize';
import { ResultPageForm } from 'components/UI/Result/ResultPageForm';
import searchByTag from 'services/TagService';


export function ResultTag() {
    const [tagData, setTagData] = useState<SearchResultItemDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const lastKeyword = getLastKeywordFromUrl<string>();
        const decodedKeyword = decodeURIComponent(lastKeyword || '');
        setLoading(false);
        if (typeof decodedKeyword === 'string') {
            const normalizedKeyword = normalizeString(decodedKeyword);
            console.log(normalizedKeyword);
            searchByTag(normalizedKeyword)
                .then((result: SearchResultItemDTO[]) => {
                    setTagData(result);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [location]);

    return <ResultPageForm results={tagData} loading={loading} error={error} />;
}
