import ResultItem, { ResultItemProp } from './ResultItem';

type ResultProps = ResultItemProp[];
export default function ResultSection(props: ResultProps) {
    console.log('==============props======================');
    console.log(props);
    console.log('===============props=====================');

    const data = Object.values(props);
    return (
        <section className="result__section">
            {data.map((item) => (
                <ResultItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                />
            ))}
        </section>
    );
}
