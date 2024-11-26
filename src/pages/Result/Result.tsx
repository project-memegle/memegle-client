import { useOutletContext } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import ResultSection from './ResultSection';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import emptyIcon from '@memegle/assets/images/png/img_result_empty.png';

import { getLastKeywordFromUrl } from 'utils/Event/saveUrl';

import {
    clearSearchHistory as clearLocalStorageSearchHistory,
    deleteSearchHistroy,
    getSearchHistory,
} from 'utils/Storage/localStorage';

import { SearchResultSectionDTO } from 'services/dto/ResultDto';

import { searchByCategory } from 'services/CategoryService';
import { searchById } from 'services/SearchService';
import { searchByTag } from 'services/TagService';

import MOCK_CATEGORY_RESULT_MUDO from 'mockData/__CategorySearchMudo';
import MOCK_CATEGORY_RESULT_BIRTHDAY from 'mockData/__CategorySearchBrithday';
import MOCK_CATEGORY_RESULT_TIREDNESS from 'mockData/__CategorySearchTired';
import MOCK_CATEGORY_RESULT_WHAT from 'mockData/__CategorySearchWhat';
import MOCK_CATEGORY_RESULT_FLEX from 'mockData/__CategorySearchflex';
import MOCK_CATEGORY_RESULT_SAD from 'mockData/__CategorySearchSad';
import MOCK_CATEGORY_RESULT_ANGER from 'mockData/__CategorySearchAnger';
import MOCK_CATEGORY_RESULT_HUNGRY from 'mockData/__CategorySearchHungry';
import MOCK_CATEGORY_RESULT_HAPINESS from 'mockData/__CategorySearchHappiness';
import ImageModal from 'components/UI/Result/ImageModal';

type OutletContextType = {
    searchTerm: string;
    searchHistory: string[];
    setSearchTerm: (term: string) => void;
};

export default function Result() {
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
    const handleOpenModal = (imageUrl: string) => {
        setModalImageUrl(imageUrl);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setModalImageUrl('');
    };
    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm) {
            searchByTag(searchTerm, setLoading, setResultData, setError);
        }
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

    //todo 서버에서 카테고리 검색 결과 가져오기
    // useEffect(() => {
    //     const lastKeyword = getLastKeywordFromUrl<number | string>();
    //     if (typeof lastKeyword === 'string') {
    //         // searchByCategory({
    //         //     keyword: lastKeyword,
    //         //     setLoading,
    //         //     setResultData,
    //         //     setError,
    //         // });
    //     } else if (typeof lastKeyword === 'number') {
    //         searchById(lastKeyword, setLoading, setResultData, setError);
    //     }
    // }, []);

    useEffect(() => {
        const lastKeyword = getLastKeywordFromUrl<number | string>();
        setLoading(false);
        if (typeof lastKeyword === 'string' && lastKeyword.includes('mudo')) {
            setResultData(MOCK_CATEGORY_RESULT_MUDO);
        }

        if (
            typeof lastKeyword === 'string' &&
            lastKeyword.includes('birthday')
        ) {
            setResultData(MOCK_CATEGORY_RESULT_BIRTHDAY);
        }

        if (
            typeof lastKeyword === 'string' &&
            lastKeyword.includes('tiredness')
        ) {
            setResultData(MOCK_CATEGORY_RESULT_TIREDNESS);
        }

        if (typeof lastKeyword === 'string' && lastKeyword.includes('what')) {
            setResultData(MOCK_CATEGORY_RESULT_WHAT);
        }

        if (typeof lastKeyword === 'string' && lastKeyword.includes('flex')) {
            setResultData(MOCK_CATEGORY_RESULT_FLEX);
        }

        if (typeof lastKeyword === 'string' && lastKeyword.includes('mudo')) {
            setResultData(MOCK_CATEGORY_RESULT_MUDO);
        }

        if (typeof lastKeyword === 'string' && lastKeyword.includes('sad')) {
            setResultData(MOCK_CATEGORY_RESULT_SAD);
        }

        if (typeof lastKeyword === 'string' && lastKeyword.includes('anger')) {
            setResultData(MOCK_CATEGORY_RESULT_ANGER);
        }

        if (typeof lastKeyword === 'string' && lastKeyword.includes('hunger')) {
            setResultData(MOCK_CATEGORY_RESULT_HUNGRY);
        }

        if (
            typeof lastKeyword === 'string' &&
            lastKeyword.includes('happiness')
        ) {
            setResultData(MOCK_CATEGORY_RESULT_HAPINESS);
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
    }, [loading, error, resultData]);

    function searchWithHistory(searchText: string) {
        setSearchTerm(searchText);
        searchByTag(searchText, setLoading, setResultData, setError);
    }
    return (
        <main className="home__main c-result">
            <section className="c-result__searchHistory">
                <ul className="tag-list">
                    {searchHistory.map((tag, index) => (
                        <li
                            className="tag-list__item"
                            key={index}
                            onClick={() => searchWithHistory(tag)}
                        >
                            {tag}
                            <span
                                className="cross"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering searchWithHistory
                                    handleTagRemove(index);
                                }}
                            ></span>
                        </li>
                    ))}
                    {searchHistory.length > 0 && (
                        <li className="tag-list__clear">
                            <button onClick={clearSearchHistory}>
                                전체삭제
                            </button>
                        </li>
                    )}
                </ul>
            </section>
            {content}
            {modalVisible && (
                <ImageModal
                    imageUrl={modalImageUrl}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}
