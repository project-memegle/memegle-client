import { TItem } from 'pages/Favorite/Favorite';
import { CSSProperties, forwardRef, HTMLAttributes, useState } from 'react';
import ValidationMessages from 'components/Validations/ValidationMessages';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';

type FavoriteItemProps = {
    item: TItem;
    isOpacityEnabled?: boolean;
    isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const FavoriteItem = forwardRef<HTMLDivElement, FavoriteItemProps>(
    ({ item, isOpacityEnabled, isDragging, style, ...props }, ref) => {
        const [toast, setToast] = useState(false);
        const [toastMessage, setToastMessage] = useState('');

        const styles: CSSProperties = {
            opacity: isOpacityEnabled ? '0.4' : '1',
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: isDragging ? 'scale(1.05)' : 'scale(1)',
            ...style,
        };
        const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            handleToast();
        };

        async function handleToast() {
            try {
                setToastMessage(ValidationMessages.SUCCESS_DELETE_IMG);
                setToast(true);
            } catch (error) {
                setToastMessage(ValidationMessages.FAILED_EVENT);
                setToast(true);
            }
        }

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
                {toast && (
                    <ToastMessage
                        message={toastMessage}
                        onClose={() => setToast(false)}
                    />
                )}
            </article>
        );
    }
);
export default FavoriteItem;
