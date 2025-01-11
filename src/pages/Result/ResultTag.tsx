import { searchByTag } from 'services/TagService';
import { useEffect, useState } from 'react';
import {
    SearchResultSectionDTO,
    SearchResultItemDTO,
} from 'services/dto/ResultDto';
import MOCK_CATEGORY_RESULT_MUDO from 'mockData/__CategorySearchMudo';
import MOCK_CATEGORY_RESULT_BIRTHDAY from 'mockData/__CategorySearchBrithday';
import MOCK_CATEGORY_RESULT_TIREDNESS from 'mockData/__CategorySearchTired';
import MOCK_CATEGORY_RESULT_WHAT from 'mockData/__CategorySearchWhat';
import MOCK_CATEGORY_RESULT_SAD from 'mockData/__CategorySearchSad';
import MOCK_CATEGORY_RESULT_FLEX from 'mockData/__CategorySearchflex';
import MOCK_CATEGORY_RESULT_ANGER from 'mockData/__CategorySearchAnger';
import MOCK_CATEGORY_RESULT_HUNGRY from 'mockData/__CategorySearchOther';
import MOCK_CATEGORY_RESULT_HAPINESS from 'mockData/__CategorySearchHappiness';
import { getLastKeywordFromUrl } from 'utils/Event/saveUrl';
import { useLocation } from 'react-router-dom';
import { normalizeString } from 'utils/Format/normalize';
import { ResultPageForm } from 'components/UI/Result/ResultPageForm';

const mockDataMap: { [key: string]: SearchResultSectionDTO } = {
    mudo: MOCK_CATEGORY_RESULT_MUDO,
    birthday: MOCK_CATEGORY_RESULT_BIRTHDAY,
    tiredness: MOCK_CATEGORY_RESULT_TIREDNESS,
    what: MOCK_CATEGORY_RESULT_WHAT,
    flex: MOCK_CATEGORY_RESULT_FLEX,
    sad: MOCK_CATEGORY_RESULT_SAD,
    anger: MOCK_CATEGORY_RESULT_ANGER,
    other: MOCK_CATEGORY_RESULT_HUNGRY,
    happiness: MOCK_CATEGORY_RESULT_HAPINESS,
};

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
            const filteredResults: SearchResultItemDTO[] = [];
            for (const value of Object.values(mockDataMap)) {
                const matchingItems = value.results.filter((item) => {
                    const matches = item.tagList.some((tag) => {
                        const normalizedTag = normalizeString(tag);
                        return normalizedTag.includes(normalizedKeyword);
                    });
                    return matches;
                });
                filteredResults.push(...matchingItems);
            }
            setTagData(filteredResults);
        }
    }, [location]);

    return <ResultPageForm results={tagData} loading={loading} error={error} />;
}
