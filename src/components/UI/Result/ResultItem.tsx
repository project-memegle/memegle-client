import { useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import {
    getArraySessionStorages,
    getSessionStorages,
    setArraySessionStorages,
} from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';
import {
    addFavoriteItem,
    deleteFavoriteItem,
    getFavoriteItems,
} from 'services/FavoriteService';
import getValidationMessages from 'components/Validations/ValidationMessages';

interface ResultItemProps {
    result: SearchResultItemDTO;
    onOpenModal: (selectedResult: SearchResultItemDTO) => void;
    onImageLoad: () => void;
}

export default function ResultItem({
    result,
    onOpenModal,
    onImageLoad,
}: ResultItemProps) {
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const ValidationMessages = getValidationMessages();

    useEffect(() => {
        const userId = getSessionStorages(StorageKeyword.USER_UID);
        if (!userId) return;
        getFavoriteItems(userId)
            .then((items) => {
                setIsFavorite(items.some((item) => item.id === result.id));
            })
            .catch((error) => console.error('Error fetching items:', error));
    }, [result.id]);

    useEffect(() => {
        const favoriteItems = getArraySessionStorages(
            StorageKeyword.FAVORITE_ITEMS
        );
        if (!favoriteItems) return;
    });

    async function addToFavorite(item: SearchResultItemDTO) {
        if (loading) return;
        setLoading(true);
        try {
            const userId = getSessionStorages(StorageKeyword.USER_UID);
            if (!userId) return;

            const favoriteItems =
                getArraySessionStorages(StorageKeyword.FAVORITE_ITEMS) || [];

            await addFavoriteItem({
                userId: userId,
                imageUrl: item.imageUrl,
                category: item.category,
                tagList: item.tagList,
                imageId: item.id.toString(),
                uploader: item.uploader,
                order: favoriteItems.length + 1,
            });

            const updatedFavorites = [...favoriteItems, item];

            setArraySessionStorages({
                key: StorageKeyword.FAVORITE_ITEMS,
                value: updatedFavorites,
            });

            setIsFavorite(true);
            setToastMessage(ValidationMessages.SUCCESS_ADD_FAVORITE);
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        } finally {
            setLoading(false);
        }
    }

    async function removeFromFavorite(item: SearchResultItemDTO) {
        if (loading) return;
        setLoading(true);
        try {
            const userId = getSessionStorages(StorageKeyword.USER_UID);
            if (!userId) return;

            await deleteFavoriteItem(userId, item.id.toString());

            setIsFavorite(false);
            setToastMessage(ValidationMessages.SUCCESS_DELETE_IMG);
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <article className="result__item" onClick={() => onOpenModal(result)}>
            <div className="result__item-copy">
                <i className="c-icon">left_click</i>
            </div>
            <div
                className="result__item-favorite"
                onClick={(e) => {
                    e.stopPropagation();
                    if (isFavorite) {
                        removeFromFavorite(result);
                    } else {
                        addToFavorite(result);
                    }
                }}
            >
                {isFavorite ? (
                    <i className="c-icon c-icon--fill-favorite">favorite</i>
                ) : (
                    <i className="c-icon c-icon-favorite">favorite_border</i>
                )}
            </div>
            <img
                src={result.imageUrl}
                alt={`img-${result.id}`}
                onLoad={onImageLoad}
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
