import { ResultPageForm } from 'components/UI/Result/ResultPageForm';
import { mockDataMap } from 'mockData/__MockDataMap';
import { useEffect, useState } from 'react';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import { getLastKeywordFromUrl } from 'utils/Event/saveUrl';

export function ResultCategory() {
    const [categoryData, setCategoryData] = useState<SearchResultItemDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const lastKeyword = getLastKeywordFromUrl<string>();
        setLoading(false);
        if (typeof lastKeyword === 'string') {
            setSearchText(lastKeyword);
            for (const [key, value] of Object.entries(mockDataMap)) {
                if (lastKeyword.includes(key)) {
                    setCategoryData(value.results);
                    return;
                }
            }
        }
    }, []);

    return (
        <ResultPageForm
            results={categoryData}
            loading={loading}
            error={error}
        />
    );
}
