import { useEffect, useState, ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';
import ResultSection from './ResultSection';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import emptyIcon from '@memegle/assets/images/png/img_result_empty.png';
import { getLastKeywordFromUrl } from 'utils/Event/saveUrl';
import {
    clearSearchHistory as clearLocalStorageSearchHistory,
    deleteSearchHistroy,
    getSearchHistory,
} from 'utils/Storage/localStorage';
import {
    SearchResultItemDTO,
    SearchResultSectionDTO,
} from 'services/dto/ResultDto';
import Result from 'components/UI/Result/Result';

import MOCK_CATEGORY_RESULT_MUDO from 'mockData/__CategorySearchMudo';
import MOCK_CATEGORY_RESULT_BIRTHDAY from 'mockData/__CategorySearchBrithday';
import MOCK_CATEGORY_RESULT_TIREDNESS from 'mockData/__CategorySearchTired';
import MOCK_CATEGORY_RESULT_WHAT from 'mockData/__CategorySearchWhat';
import MOCK_CATEGORY_RESULT_FLEX from 'mockData/__CategorySearchflex';
import MOCK_CATEGORY_RESULT_SAD from 'mockData/__CategorySearchSad';
import MOCK_CATEGORY_RESULT_ANGER from 'mockData/__CategorySearchAnger';
import MOCK_CATEGORY_RESULT_HUNGRY from 'mockData/__CategorySearchHungry';
import MOCK_CATEGORY_RESULT_HAPINESS from 'mockData/__CategorySearchHappiness';

type OutletContextType = {
    searchTerm: string;
    searchHistory: string[];
    setSearchTerm: (term: string) => void;
};

interface SearchByParams {
    searchText: string;
    setLoading: (loading: boolean) => void;
    setResultData: (data: SearchResultSectionDTO | null) => void;
    setError: (error: string | null) => void;
}

interface ResultCommonProps {
    searchBy: (params: SearchByParams) => void;
    results?: SearchResultItemDTO[];
}

const mockDataMap: { [key: string]: any } = {
    mudo: MOCK_CATEGORY_RESULT_MUDO,
    birthday: MOCK_CATEGORY_RESULT_BIRTHDAY,
    tiredness: MOCK_CATEGORY_RESULT_TIREDNESS,
    what: MOCK_CATEGORY_RESULT_WHAT,
    flex: MOCK_CATEGORY_RESULT_FLEX,
    sad: MOCK_CATEGORY_RESULT_SAD,
    anger: MOCK_CATEGORY_RESULT_ANGER,
    hunger: MOCK_CATEGORY_RESULT_HUNGRY,
    happiness: MOCK_CATEGORY_RESULT_HAPINESS,
};

export function ResultCommon({ searchBy, results }: ResultCommonProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const {
        searchTerm,
        searchHistory: initialSearchHistory,
        setSearchTerm,
    } = useOutletContext<OutletContextType>();

    const [searchHistory, setSearchHistory] =
        useState<string[]>(initialSearchHistory);
    const [content, setContent] = useState<ReactNode>(null);
    const [resultData, setResultData] = useState<SearchResultSectionDTO | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalTagList, setModalTagList] = useState<string[]>([]);

    const handleOpenModal = (imageUrl: string, tagList: string[]) => {
        setModalImageUrl(imageUrl);
        setModalTagList(tagList);
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
        setModalImageUrl('');
        setModalTagList([]);
    };

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm]);

    function handleTagRemove(index: number) {
        const newSearchHistory = searchHistory.filter((_, i) => i !== index);
        deleteSearchHistroy(index);
        setSearchHistory(newSearchHistory);
    }

    function clearSearchHistory() {
        clearLocalStorageSearchHistory();
        setSearchHistory([]);
    }

    useEffect(() => {
        const lastKeyword = getLastKeywordFromUrl<number | string>();
        setLoading(false);
        if (typeof lastKeyword === 'string') {
            for (const [key, value] of Object.entries(mockDataMap)) {
                if (lastKeyword.includes(key)) {
                    setResultData(value);
                    break;
                }
            }
        }
    }, []);

    useEffect(() => {
        if (loading) {
            setContent(<LoadingSpinner />);
            return;
        }

        if (error) {
            setContent(<p>{error}</p>);
            return;
        }

        if (results && results.length > 0) {
            setContent(
                <ResultSection
                    results={results}
                    onOpenModal={handleOpenModal}
                />
            );
            return;
        }
        if (resultData && resultData.results.length > 0) {
            setContent(
                <ResultSection
                    results={resultData.results}
                    onOpenModal={handleOpenModal}
                />
            );
            return;
        }

        setContent(
            <div className="c-result__emtpy">
                <img src={emptyIcon} alt="empty" />
            </div>
        );
    }, [loading, error, resultData, results]);

    function searchWithHistory(searchText: string) {
        setSearchTerm(searchText);
        searchBy({ searchText, setLoading, setResultData, setError });
    }

    return (
        <Result
            searchHistory={searchHistory}
            searchWithHistory={searchWithHistory}
            handleTagRemove={handleTagRemove}
            clearSearchHistory={clearSearchHistory}
            content={content}
            modalVisible={modalVisible}
            modalImageUrl={modalImageUrl}
            handleCloseModal={handleCloseModal}
            tagList={modalTagList}
        />
    );
}
