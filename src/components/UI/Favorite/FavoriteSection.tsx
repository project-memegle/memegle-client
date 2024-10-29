import { useNavigate } from 'react-router-dom';

export default function FavoriteSection() {
    const navigate = useNavigate();

    function navigateToFavoriteItem() {
        navigate('/favorite');
    }

    return (
        <article
            className="category__item favorite"
            onClick={navigateToFavoriteItem}
        >
            <p className="category__item-title">즐겨찾기</p>
        </article>
    );
}
