import { useEffect, useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { CategoryResultSectionDTO } from 'services/dto/ResultDto';
import { t } from 'i18next';
import { useCategoryList } from './CategoryList';

/**
 *
 * @returns Category list in the main page
 */
export default function CategorySection() {
    const navigate = useCustomNavigate();
    const [categoryList, setCategoryList] =
        useState<CategoryResultSectionDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const mockCategoryList = useCategoryList();

    useEffect(() => {
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
