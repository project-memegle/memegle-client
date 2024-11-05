import { useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import axios, { AxiosError } from 'axios';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';

export default function CategorySection() {
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useCustomNavigate();

    useState(() => {
        axios
            .get('/images/category')
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.log(error);
                handleApiError(error as AxiosError, setMessage);
            });
    });
    function navigateToFavoriteItem() {
        navigate('/favorite');
    }
    return (
        <section className="c-category">
            <article
                className="c-category__item favorite"
                onClick={navigateToFavoriteItem}
            >
                <p className="c-category__item-title">즐겨찾기</p>
            </article>
            <CategoryItem category="mudo" />
            <CategoryItem category="digiMon" />
            <CategoryItem category="gif" />
            <CategoryItem category="temp1" />
            <CategoryItem category="temp2" />
            <CategoryItem category="favorite" />
            <CategoryItem category="mudo" />
            <CategoryItem category="digiMon" />
            <CategoryItem category="gif" />
        </section>
    );
}
