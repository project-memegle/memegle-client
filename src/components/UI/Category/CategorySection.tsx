import { useEffect, useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { getCategorylist } from 'services/CategoryService';
import { CategoryResultSectionDTO } from 'services/dto/ResultDto';
import { MOCK_CATEGORY_LIST } from 'mockData/__CategoryList';

export default function CategorySection() {
    const navigate = useCustomNavigate();
    const [categoryList, setCategoryList] =
        useState<CategoryResultSectionDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //todo: 서버에서 카테고리 리스트를 가져오기
    // useEffect(() => {
    //     getCategorylist({
    //         setLoading,
    //         setResultData: setCategoryList,
    //         setError,
    //     });
    // }, []);

    useEffect(() => {
        // MOCK 데이터로 상태 초기화
        setCategoryList(MOCK_CATEGORY_LIST);
        setLoading(false);
    }, []);

    return (
        <section className="c-category">
            <article
                className="c-category__item favorite"
                onClick={() => navigate('/favorite')}
            >
                <p className="c-category__item-title">즐겨찾기</p>
            </article>
            {categoryList &&
                categoryList.results.map((category) => (
                    <CategoryItem
                        key={category.id}
                        category={category.categoryName}
                        keyword={category.imageCategory}
                        titleImageUrl={category.titleImageUrl}
                    />
                ))}
        </section>
    );
}
