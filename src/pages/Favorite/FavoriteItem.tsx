import { CSSProperties, forwardRef, HTMLAttributes, useState } from 'react';
import ValidationMessages from 'components/Validations/ValidationMessages';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import handleCopyImage from 'utils/Event/handleCopyImage';

type FavoriteItemProps = {
    item: SearchResultItemDTO;
    isOpacityEnabled?: boolean;
    isDragging?: boolean;
    onDelete: (id: number) => void;
    onSave: () => void;
} & HTMLAttributes<HTMLDivElement>;

const FavoriteItem = forwardRef<HTMLDivElement, FavoriteItemProps>(
    (
        {
            item,
            isOpacityEnabled,
            isDragging,
            onDelete,
            onSave,
            style,
            ...props
        },
        ref
    ) => {
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
            onDelete(item.id);
            onSave();
        };

        async function handleCopy() {
            await handleCopyImage(item.imageUrl, setToastMessage, setToast);
        }

        return (
            <article
                className="c-favorite__item"
                onClick={handleCopy}
                ref={ref}
                style={styles}
                {...props}
            >
                <div className="result__item-copy">
                    <i className="c-icon">file_copy</i>
                </div>
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
