import { useEffect, useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { getCategorylist } from 'services/CategoryService';
import { CategoryResultSectionDTO } from 'services/dto/ResultDto';

export default function CategorySection() {
    const navigate = useCustomNavigate();
    const [categoryList, setCategoryList] =
        useState<CategoryResultSectionDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCategorylist({
            setLoading,
            setResultData: setCategoryList,
            setError,
        });
    }, []);

    return (
        <section className="c-category">
            <article
                className="c-category__item favorite"
                onClick={() => navigate('/favorite')}
            >
                <p className="c-category__item-title">즐겨찾기</p>
            </article>
            <CategoryItem category="MUDO" />
            <CategoryItem category="digiMon" />
            <CategoryItem category="gif" />
            <CategoryItem category="temp1" />
            <CategoryItem category="temp2" />
            <CategoryItem category="favorite" />
            <CategoryItem category="MUDO" />
            <CategoryItem category="digiMon" />
            <CategoryItem category="gif" />
        </section>
    );
}
