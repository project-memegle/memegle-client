import { SearchResultItemDTO } from 'services/dto/ResultDto';
import ResultItem from './ResultItem';
import { useEffect, useState } from 'react';

interface ResultSectionProps {
    results: SearchResultItemDTO[];
    onOpenModal: (imageUrl: string, tagList: string[]) => void;
    onAllImagesLoaded: () => void;
}

export default function ResultSection({
    results,
    onOpenModal,
    onAllImagesLoaded,
}: ResultSectionProps) {
    const [loadedImages, setLoadedImages] = useState(0);

    useEffect(() => {
        if (loadedImages === results.length) {
            onAllImagesLoaded();
        }
    }, [loadedImages, results.length, onAllImagesLoaded]);

    const handleImageLoad = () => {
        setLoadedImages((prev) => prev + 1);
    };
    return (
        <section className="result__section">
            {results.map((result) => (
                <ResultItem
                    key={result.id}
                    result={result}
                    onOpenModal={() =>
                        onOpenModal(result.imageUrl, result.tagList)
                    }
                    onImageLoad={handleImageLoad}
                />
            ))}
        </section>
    );
}
