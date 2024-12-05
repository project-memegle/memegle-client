import { ReactNode } from 'react';
import ImageModal from './ImageModal';
import { useTranslation } from 'react-i18next';

type ResultProps = {
    searchHistory: string[];
    searchWithHistory?: (tag: string) => void | undefined;
    handleTagRemove: (index: number) => void;
    clearSearchHistory: () => void;
    modalVisible: boolean;
    modalImageUrl: string;
    handleCloseModal: () => void;
    content: ReactNode;
};

export default function Result({
    searchHistory,
    searchWithHistory,
    handleTagRemove,
    clearSearchHistory,
    content,
    modalVisible,
    modalImageUrl,
    handleCloseModal,
}: ResultProps) {
    const { t } = useTranslation();
    return (
        <main className="home__main c-result">
            <section className="c-result__searchHistory">
                <ul className="tag-list">
                    {searchHistory.map((tag, index) => (
                        <li
                            className="tag-list__item"
                            key={index}
                            onClick={() =>
                                searchWithHistory && searchWithHistory(tag)
                            }
                        >
                            {tag}
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
            {modalVisible && (
                <ImageModal
                    imageUrl={modalImageUrl}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}
