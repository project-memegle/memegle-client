import useCustomNavigate from 'hooks/useCustomNaviaget';

type CategoryType = string;

interface CategoryItemProps {
    category: CategoryType;
    titleImageUrl: string;
    keyword: string;
}
export default function CategoryItem({
    category,
    titleImageUrl,
    keyword,
}: CategoryItemProps) {
    const navigate = useCustomNavigate();

    function clickHandler() {
        navigate(`/result/${keyword}`);
    }

    return (
        <article
            onClick={clickHandler}
            className={`c-category__item ${keyword}`}
            style={{ backgroundImage: `url(${titleImageUrl})` }}
        >
            <p className="c-category__item-title">{category}</p>
        </article>
    );
}
