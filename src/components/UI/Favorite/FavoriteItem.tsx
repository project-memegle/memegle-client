import { TItem } from 'pages/Favorite';
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';

type FavoriteItemProps = {
    item: TItem;
    isOpacityEnabled?: boolean;
    isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;
const FavoriteItem = forwardRef<HTMLDivElement, FavoriteItemProps>(
    ({ item, isOpacityEnabled, isDragging, style, ...props }, ref) => {
        const styles: CSSProperties = {
            opacity: isOpacityEnabled ? '0.4' : '1',
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: isDragging ? 'scale(1.05)' : 'scale(1)',
            ...style,
        };
        const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            alert('이미지 삭제');
        };

        return (
            <article
                className="c-favorite__item"
                ref={ref}
                style={styles}
                {...props}
            >
                <div
                    className="c-favorite__item-delete"
                    onClick={handleDeleteClick}
                >
                    <i className="c-icon">delete</i>
                </div>
                <img
                    className="c-favorite__item-img"
                    src={item.imageUrl}
                    alt={`img-${item.id}`}
                />
            </article>
        );
    }
);
export default FavoriteItem;
