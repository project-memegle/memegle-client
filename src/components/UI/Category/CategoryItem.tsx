import useCustomNavigate from 'hooks/useCustomNaviaget';

type CategoryType = 'favorite' | 'mudo' | 'digiMon' | 'gif' | 'temp1' | 'temp2';

interface CategoryItemProps {
    category: CategoryType;
}

export default function CategoryItem({ category }: CategoryItemProps) {
    const navigate = useCustomNavigate();

    function clickHandler() {
        navigate(`/result/${category}`);
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
            className={`c-category__item ${category}`}
            onClick={clickHandler}
        >
            <p className="c-category__item-title">{keyword}</p>
        </article>
    );
}
