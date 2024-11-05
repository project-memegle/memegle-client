import { useOutletContext} from 'react-router-dom';
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

import {
    SearchResultSectionDTO,
} from 'services/dto/ResultDto';

import { searchByCategory } from 'services/CategoryService';
import { searchById } from 'services/IdService';

type OutletContextType = {
    searchTerm: string;
    searchHistory: string[];
};

export default function Result() {
    const { searchTerm, searchHistory: initialSearchHistory } =
        useOutletContext<OutletContextType>();

    const [searchHistory, setSearchHistory] =
        useState<string[]>(initialSearchHistory);

    const [content, setContent] = useState<ReactNode>(null);
    const [resultData, setResultData] = useState<SearchResultSectionDTO | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        if (typeof lastKeyword === 'string') {
            console.log('카테고리 검색 간다');
            searchByCategory({
                keyword: lastKeyword,
                setLoading,
                setResultData,
                setError,
            });
        } else if (typeof lastKeyword === 'number') {
            console.log('아이디 검색 간다');
            searchById(lastKeyword, setLoading, setResultData, setError);
        }
    }, []);

    useEffect(() => {
        if (loading) {
            setContent(<LoadingSpinner />);
        } else if (error) {
            setContent(<p>{error}</p>);
        } else if (resultData && resultData.results.length > 0) {
            setContent(<ResultSection results={resultData.results} />);
        } else {
            setContent(
                <div className="c-result__emtpy">
                    <img src={emptyIcon} alt="empty" />
                </div>
            );
        }
    }, [loading, error, resultData]);

    return (
        <main className="home__main c-result">
            <section className="c-result__searchHistory">
                <ul className="tag-list">
                    {searchHistory.map((tag, index) => (
                        <li className="tag-list__item" key={index}>
                            {tag}
                            <span
                                className="cross"
                                onClick={() => handleTagRemove(index)}
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
        </main>
    );
}
