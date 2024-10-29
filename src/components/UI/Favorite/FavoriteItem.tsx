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
            lineHeight: '0.5',
            transform: isDragging ? 'scale(1.05)' : 'scale(1)',
            ...style,
        };

        return (
            <article
                className="c-favorite__item"
                ref={ref}
                style={styles}
                {...props}
            >
                <img
                    className="c-favorite-item__img"
                    src={item.imageUrl}
                    alt={`img-${item.id}`}
                />
            </article>
        );
    }
);
export default FavoriteItem;
