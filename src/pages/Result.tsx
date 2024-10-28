import { useOutletContext, useParams } from 'react-router-dom';
import useFetchHandler from '../hooks/useFetchHandler';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import mockData from '../data/mockData.json';
import { ReactNode, useEffect, useState } from 'react';
import ResultSection from '../components/UI/Result/ResultSection';
import { deleteSearchHistroy, getSearchHistory } from 'utils/localStorage';
import emptyIcon from '@memegle/assets/images/ic_result_empty.png';
interface MockDataItem {
    id: number;
    imageUrl: string;
    imageCategory: string;
    createdAt: string;
    modifiedAt: string;
}

interface MockData {
    success: boolean;
    status: string;
    code: number;
    message: string;
    results: MockDataItem[];
}

type OutletContextType = { searchTerm: string; searchHistory: string[] };

export default function Result() {
    const params = useParams<{ category: string }>();
    const category = params.category;
    const { searchTerm, searchHistory: initialSearchHistory } =
        useOutletContext<OutletContextType>();
    const { data, loading, error } = useFetchHandler<MockData | null>(mockData);
    const [searchHistory, setSearchHistory] =
        useState<string[]>(initialSearchHistory);
    const [content, setContent] = useState<ReactNode>(null);

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm]);

    function handleTagRemove(index: number) {
        const newSearchHistory = searchHistory.filter((_, i) => i !== index);
        deleteSearchHistroy(index);
        setSearchHistory(newSearchHistory);
    }

    useEffect(() => {
        if (loading) {
            setContent(<LoadingSpinner />);
        } else if (error) {
            setContent(<div>Error: {error}</div>);
        } else if (data && data.results.length > 0) {
            const categoryData = data.results.filter(
                (item) => item.imageCategory === category
            );

            setContent(
                categoryData.length > 0 ? (
                    <ResultSection {...categoryData} />
                ) : (
                    <div className="c-result__emtpy">
                        <h4>검색 결과가 없습니다</h4>
                        <img src={emptyIcon} alt="empty" />
                    </div>
                )
            );
        }
    }, [loading, error, data, category]);

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
                </ul>
            </section>
            {content}
        </main>
    );
}
