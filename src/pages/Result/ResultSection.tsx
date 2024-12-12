import { SearchResultItemDTO } from 'services/dto/ResultDto';
import ResultItem from './ResultItem';

interface ResultSectionProps {
    results: SearchResultItemDTO[];
    onOpenModal: (imageUrl: string, tagList: string[]) => void;
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
                    onOpenModal={() =>
                        onOpenModal(result.imageUrl, result.tagList)
                    }
                />
            ))}
        </section>
    );
}
