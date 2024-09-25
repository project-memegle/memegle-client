type favouriteType = 'favorite';
type mudoType = 'mudo';
type digiMonType = 'digiMon';
type gifType = 'gif';
type tempType = 'temp1';
type temp2Type = 'temp2';

type categoryType =
    | favouriteType
    | mudoType
    | digiMonType
    | gifType
    | tempType
    | temp2Type;

interface CategoryBoxProps {
    category: categoryType;
}

function clickHandler() {
    location.href = '/result';
}

export default function CategoryBox({ category }: CategoryBoxProps) {
    const keyword = function keywordHandler(category: categoryType) {
        switch (category) {
            case 'favorite':
                return '즐겨찾기';
            case 'mudo':
                return '무한도전';
            case 'digiMon':
                return '디지몬';
            case 'gif':
                return 'GIF';
            case 'temp1':
                return '임시1';
            case 'temp2':
                return '임시2';
            default:
                return '';
        }
    };

    return (
        <article className={`category__box ${category}`} onClick={clickHandler}>
            <p className="category__box-title">{keyword(category)}</p>
        </article>
    );
}
