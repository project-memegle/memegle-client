import {
    CSSProperties,
    forwardRef,
    HTMLAttributes,
    useEffect,
    useState,
} from 'react';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import ProgressiveImg from '../ProgressiveImg';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

type MyImageItemProps = {
    item: SearchResultItemDTO;
    onOpenModal: (selectedResult: SearchResultItemDTO) => void;
    onDelete: (params: {
        userId: string;
        category: string;
        itemId: string;
    }) => void;
} & HTMLAttributes<HTMLDivElement>;

const MyImageItem = forwardRef<HTMLDivElement, MyImageItemProps>(
    ({ item, onDelete, onOpenModal, ...props }, ref) => {
        const [toast, setToast] = useState(false);
        const [toastMessage, setToastMessage] = useState('');
        const [userId, setUserId] = useState<string | null>(null);
        useEffect(() => {
            const userUId = getSessionStorages(StorageKeyword.USER_UID);
            if (!userUId) {
                return;
            }
            setUserId(userUId);
        }, []);
        const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            if (userId) {
                onDelete({ userId, category: item.category, itemId: item.id });
            }
        };

        return (
            <article
                className="c-favorite__item"
                onClick={() => onOpenModal(item)}
                ref={ref}
                {...props}
            >
                <div className="result__item-copy">
                    <i className="c-icon">left_click</i>
                </div>
                <div
                    className="c-favorite__item-delete"
                    onClick={handleDeleteClick}
                >
                    <i className="c-icon">delete</i>
                </div>
                <ProgressiveImg
                    src={item.imageUrl}
                    alt={`img-${item.id}`}
                    className="c-favorite__item-img"
                    placeholderSrc="/assets/images/placeholder.svg"
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
export default MyImageItem;
