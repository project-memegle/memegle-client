import { useNavigate } from 'react-router-dom';

type CategoryType = 'favorite' | 'mudo' | 'digiMon' | 'gif' | 'temp1' | 'temp2';

interface CategoryBoxProps {
    category: CategoryType;
}

export default function CategoryBox({ category }: CategoryBoxProps) {
    const navigate = useNavigate();

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
        <article className={`category__box ${category}`} onClick={clickHandler}>
            <p className="category__box-title">{keyword}</p>
        </article>
    );
}
