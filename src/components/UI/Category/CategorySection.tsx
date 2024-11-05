import { useEffect, useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import axios, { AxiosError } from 'axios';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { get } from 'utils/API/fetcher';

export default function CategorySection() {
    const [category, setCategory] = useState('');
    const navigate = useCustomNavigate();

    useEffect(() => {
        const queryParams = 'POPULARITY';
        const fetchCategories = async () => {
            try {
                const response = await get(
                    `/categories/${category}?${queryParams}`
                );
                console.log('Categories:', response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
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
