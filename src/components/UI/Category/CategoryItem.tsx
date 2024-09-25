import useNavigateHandler from '../../../hooks/useNavigateHandler';

type CategoryType = 'favorite' | 'mudo' | 'digiMon' | 'gif' | 'temp1' | 'temp2';

interface CategoryItemProps {
    category: CategoryType;
}

export default function CategoryItem({ category }: CategoryItemProps) {
    const navigate = useNavigateHandler(`/result/${category}`);

    function clickHandler() {
        navigate();
    }

    const keywordMap: Record<CategoryType, string> = {
        favorite: '즐겨찾기',
        mudo: '무한도전',
        digiMon: '디지몬',
        gif: 'GIF',
        temp1: '임시1',
        temp2: '임시2',
    };

    const keyword = keywordMap[category] || '';

    return (
        <article
            className={`category__item ${category}`}
            onClick={clickHandler}
        >
            <p className="category__item-title">{keyword}</p>
        </article>
    );
}
