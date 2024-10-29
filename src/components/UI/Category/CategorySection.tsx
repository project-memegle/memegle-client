import { useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import axios, { AxiosError } from 'axios';
import { handleApiError } from 'utils/handleApiError';
import FavoriteSection from '../Favorite/FavoriteSection';
import { useNavigate } from 'react-router-dom';

export default function CategorySection() {
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

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
        <section className="category__section">
            <article
                className="category__item favorite"
                onClick={navigateToFavoriteItem}
            >
                <p className="category__item-title">즐겨찾기</p>
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
