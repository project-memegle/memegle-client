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
                className="category__item"
                ref={ref}
                style={styles}
                {...props}
            >
                <img
                    src={item.imageUrl}
                    alt={`img-${item.id}`}
                    style={{
                        borderRadius: '8px',
                        boxShadow: isDragging
                            ? 'none'
                            : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
                        maxWidth: '100%',
                        objectFit: 'cover',
                    }}
                />
            </article>
        );
    }
);
export default FavoriteItem;
