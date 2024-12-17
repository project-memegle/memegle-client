import { useEffect, useState, ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import emptyIcon from '@memegle/assets/images/png/img_result_empty.webp';
import {
    clearSearchHistory as clearLocalStorageSearchHistory,
    deleteSearchHistroy,
    getSearchHistory,
} from 'utils/Storage/localStorage';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import ImageModal from './ImageModal';
import { useTranslation } from 'react-i18next';
import ResultItem from './ResultItem';

type OutletContextType = {
    searchTerm: string;
    searchHistory: string[];
    setSearchTerm: (term: string) => void;
};

interface ResultCommonProps {
    loading: boolean;
    results?: SearchResultItemDTO[];
    error: string | null;
}

export function ResultPageForm({ loading, results, error }: ResultCommonProps) {
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const {
        searchTerm,
        searchHistory: initialSearchHistory,
        setSearchTerm,
    } = useOutletContext<OutletContextType>();

    const [searchHistory, setSearchHistory] =
        useState<string[]>(initialSearchHistory);
    const [content, setContent] = useState<ReactNode>(null);
    const [selectedResult, setSelectedResult] =
        useState<SearchResultItemDTO | null>(null);
    const navigate = useCustomNavigate();

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedResult(null);
    };
    const handleOpenModal = (selectedResult: SearchResultItemDTO) => {
        setSelectedResult(selectedResult);
        setModalVisible(true);
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
                <section className="result__section">
                    {results.map((result) => (
                        <ResultItem
                            key={result.id}
                            result={result}
                            onOpenModal={handleOpenModal}
                            onImageLoad={() => {}}
                        />
                    ))}
                </section>
            );
            return;
        }

        setContent(
            <div className="c-result__emtpy">
                <img src={emptyIcon} alt="empty" />
            </div>
        );
    }, [loading, error, results]);

    function searchWithHistory(searchText: string) {
        setSearchTerm(searchText);
        navigate(`/tag/${searchText}`);
    }

    return (
        <main className="home__main c-result">
            <section className="c-result__searchHistory">
                <ul className="tag-list">
                    {searchHistory.map((searchItem, index) => (
                        <li
                            className="tag-list__item"
                            key={index}
                            onClick={() =>
                                searchWithHistory &&
                                searchWithHistory(searchItem)
                            }
                        >
                            {searchItem}
                            <span
                                className="cross"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTagRemove(index);
                                }}
                            ></span>
                        </li>
                    ))}
                    {searchHistory.length > 0 && (
                        <li className="tag-list__clear">
                            <button onClick={clearSearchHistory}>
                                {t('DELETE_ALL')}
                            </button>
                        </li>
                    )}
                </ul>
            </section>
            {content}
            {modalVisible && selectedResult && (
                <ImageModal
                    onClose={handleCloseModal}
                    result={selectedResult}
                    onImageLoad={() => {}}
                    handleDownloadSuccess={() => {}}
                    onOpenModal={handleOpenModal}
                />
            )}
        </main>
    );
}
