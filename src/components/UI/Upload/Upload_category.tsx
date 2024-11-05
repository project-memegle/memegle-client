import { useEffect, useState } from 'react';
import { getCategorylist } from 'services/CategoryService';
import {
    CategoryResultItemDTO,
    CategoryResultSectionDTO,
} from 'services/dto/ResultDto';

export function CategoryInput() {
    const [resultData, setResultData] =
        useState<CategoryResultSectionDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        getCategorylist(setLoading, setResultData, setError);
    }, []);

    return (
        <section className="c-dropdown file-tag">
            <label>카테고리 등록</label>
            <select
                className="c-dropdown__select"
                name="category"
                id="category"
                defaultValue=""
            >
                <option value="" disabled hidden>
                    카테고리 등록
                </option>
                <option value="mudo">무한도전</option>
                {resultData &&
                    resultData.results.map(
                        (category: CategoryResultItemDTO) => (
                            <option
                                key={category.id}
                                value={category.categoryName}
                            >
                                {category.categoryName}
                            </option>
                        )
                    )}
            </select>
        </section>
    );
}
