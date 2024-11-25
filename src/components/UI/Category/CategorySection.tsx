import { useEffect, useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { getCategorylist } from 'services/CategoryService';
import { CategoryResultSectionDTO } from 'services/dto/ResultDto';
import { useMockCategoryList } from 'mockData/__CategoryList';
import { t } from 'i18next';

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
    const mockCategoryList = useMockCategoryList();

    useEffect(() => {
        // MOCK 데이터로 상태 초기화
        setCategoryList(mockCategoryList);
        setLoading(false);
    }, [mockCategoryList]);

    return (
        <section className="c-category">
            <article
                className="c-category__item favorite"
                onClick={() => navigate('/favorite')}
            >
                <p className="c-category__item-title">
                    {t('CATEGORY-favorite')}
                </p>
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
