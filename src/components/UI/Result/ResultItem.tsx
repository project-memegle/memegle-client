export type ResultItemProp = {
    id: number;
    imageUrl: string;
};

export default function ResultItem({ id, imageUrl }: ResultItemProp) {
    return (
        <article className="result__item">
            <img src={imageUrl} alt={`img-${id}`} />
        </article>
    );
}
