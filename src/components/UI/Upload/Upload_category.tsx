import { MOCK_CATEGORY_LIST } from 'mockData/__CategoryList';
import { useEffect, useState } from 'react';
import { getCategorylist } from 'services/CategoryService';
import {
    CategoryResultItemDTO,
    CategoryResultSectionDTO,
} from 'services/dto/ResultDto';

interface CategoryInputProps {
    onCategoryChange: (category: string) => void;
}

export function CategoryInput({ onCategoryChange }: CategoryInputProps) {
    const [categoryList, setCategoryList] =
        useState<CategoryResultSectionDTO | null>(null);
    const [selectCategory, setSelectCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {}, [selectCategory, onCategoryChange]);

    //todo: 서버에서 카테고리 리스트를 가져오기
    // useEffect(() => {
    //     getCategorylist({ setLoading, setCategoryList, setError });
    // }, []);

    useEffect(() => {
        // MOCK 데이터로 상태 초기화
        setCategoryList(MOCK_CATEGORY_LIST);
        setLoading(false);
    }, [selectCategory]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectCategory(e.target.value);
    };

    return (
        <section className="c-dropdown file-tag">
            <label>카테고리 등록</label>
            <select
                className="c-dropdown__select"
                name="category"
                id="category"
                defaultValue=""
                onChange={handleCategoryChange}
            >
                <option value="" disabled hidden>
                    카테고리 등록
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
