import {
    SearchResultItemDTO,
} from 'services/dto/ResultDto';
import ResultItem from './ResultItem';

interface ResultSectionProps {
    results: SearchResultItemDTO[];
}

export default function ResultSection({ results }: ResultSectionProps) {
    return (
        <section className="result__section">
            {results.map((result) => (
                <ResultItem key={result.id} {...result} />
            ))}
        </section>
    );
}
