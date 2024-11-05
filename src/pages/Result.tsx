import { useOutletContext, useParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import ResultSection from '../components/UI/Result/ResultSection';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import emptyIcon from '@memegle/assets/images/png/ic_result_empty.png';

import { PageableDTO } from 'services/dto/Pageable';
import { get } from 'utils/API/fetcher';
import { getLastKeywordFromUrl } from 'utils/Event/saveUrl';

import {
    clearSearchHistory as clearLocalStorageSearchHistory,
    deleteSearchHistroy,
    getSearchHistory,
} from 'utils/Storage/localStorage';
import { ResultItemDTO, ResultSectionDTO } from 'services/dto/ResultDto';

type OutletContextType = { searchTerm: string; searchHistory: string[] };

export default function Result() {
    const params = useParams<{ category: string }>();

    const category = params.category;

    const { searchTerm, searchHistory: initialSearchHistory } =
        useOutletContext<OutletContextType>();

    const [searchHistory, setSearchHistory] =
        useState<string[]>(initialSearchHistory);
    const [content, setContent] = useState<ReactNode>(null);
    const [resultData, setResultData] = useState<ResultItemDTO[]>([]);
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
        const lastKeyword = getLastKeywordFromUrl() || 'MUDO';
        const pageData: PageableDTO = {
            page: 1,
            size: 10,
            criteria: 'CREATED_AT',
        };

        const fetchCategories = async () => {
            try {
                const queryParams = new URLSearchParams({
                    imageCategory: lastKeyword,
                    page: pageData.page.toString(),
                    size: pageData.size.toString(),
                    criteria: pageData.criteria,
                });

                const response = await get<ResultSectionDTO>(
                    `/images/category?${queryParams.toString()}`
                );
                console.log('Result:', response.data);
                setResultData(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Error fetching categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (loading) {
            setContent(<LoadingSpinner />);
        } else if (error) {
            setContent(<p>{error}</p>);
        } else if (resultData.length > 0) {
            const categoryData = resultData.filter(
                (item) => item.imageCategory === category
            );

            setContent(
                categoryData.length > 0 ? (
                    <ResultSection results={categoryData} />
                ) : (
                    <div className="c-result__emtpy">
                        <img src={emptyIcon} alt="empty" />
                    </div>
                )
            );
        } else {
            setContent(
                <div className="c-result__emtpy">
                    <img src={emptyIcon} alt="empty" />
                </div>
            );
        }
    }, [loading, error, resultData, category]);

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
