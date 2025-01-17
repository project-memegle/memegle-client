import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CategoryResultItemDTO,
    CategoryResultSectionDTO,
} from 'services/dto/ResultDto';
import { useCategoryList } from '../Category/CategoryList';

interface CategoryInputProps {
    onCategoryChange: (category: string) => void;
    setErrorMessage: (message: string) => void; // 추가된 prop
}

export function CategoryInput({
    onCategoryChange,
    setErrorMessage,
}: CategoryInputProps) {
    const [categoryList, setCategoryList] =
        useState<CategoryResultSectionDTO | null>(null);
    const [selectCategory, setSelectCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { t } = useTranslation();
    const mockCategoryList = useCategoryList();

    useEffect(() => {
        if (selectCategory) {
            onCategoryChange(selectCategory);
            setErrorMessage('');
        }
    }, [selectCategory, onCategoryChange, setErrorMessage]);

    useEffect(() => {
        setCategoryList(mockCategoryList);
        setLoading(false);
    }, [mockCategoryList]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectCategory(e.target.value);
    };

    return (
        <section className="c-dropdown file-tag">
            <label>{t('REGISTER_CATEGORY')}</label>
            <select
                className="c-dropdown__select"
                name="category"
                id="category"
                defaultValue=""
                onChange={handleCategoryChange}
            >
                <option value="" disabled hidden>
                    {t('REGISTER_CATEGORY')}
                </option>
                {categoryList &&
                    categoryList.results.map(
                        (category: CategoryResultItemDTO) => (
                            <option
                                key={category.id}
                                value={category.imageCategory}
                            >
                                {category.categoryName}
                            </option>
                        )
                    )}
            </select>
        </section>
    );
}
