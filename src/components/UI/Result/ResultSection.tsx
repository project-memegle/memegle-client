import { ResultSectionDTO } from 'services/dto/ResultDto';
import ResultItem from './ResultItem';

export default function ResultSection({ results }: ResultSectionDTO) {
    return (
        <section className="result__section">
            {results.map((result) => (
                <ResultItem key={result.id} {...result} />
            ))}
        </section>
    );
}
