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
import { searchById } from 'services/IdService';
import { searchByTag } from 'services/TagService';

type OutletContextType = {
    searchTerm: string;
    searchHistory: string[];
    setSearchTerm: (term: string) => void;
};

export default function Result() {
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
            searchByCategory({
                keyword: lastKeyword,
                setLoading,
                setResultData,
                setError,
            });
        } else if (typeof lastKeyword === 'number') {
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
        </main>
    );
}
