import { useState } from 'react';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import ResultItem from './ResultItem';
import ImageModal from 'components/UI/Result/ImageModal';

interface ResultSectionProps {
    results: SearchResultItemDTO[];
    onOpenModal: (imageUrl: string) => void;
}

export default function ResultSection({
    results,
    onOpenModal,
}: ResultSectionProps) {
    return (
        <section className="result__section">
            {results.map((result) => (
                <ResultItem
                    key={result.id}
                    result={result}
                    onOpenModal={onOpenModal}
                />
            ))}
        </section>
    );
}
