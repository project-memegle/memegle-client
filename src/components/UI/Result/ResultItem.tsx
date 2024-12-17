import { useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import {
    getArraySessionStorages,
    setArraySessionStorages,
} from 'utils/Storage/sessionStorage';
import { SESSION_STORAGE_KEY } from 'pages/Favorite';
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
    const [favoriteList, setFavoriteList] = useState<
        { id: number; imageUrl: string; tagList: string[] }[]
    >([]);
    const ValidationMessages = getValidationMessages();

    useEffect(() => {
        const favorites = getArraySessionStorages(SESSION_STORAGE_KEY) || [];
        setFavoriteList(favorites);
        setIsFavorite(favorites.some((item) => item.id === result.id));
    }, [result.id]);

    function addToFavorite(item: SearchResultItemDTO) {
        try {
            const favorites =
                getArraySessionStorages(SESSION_STORAGE_KEY) || [];
            if (!favorites.some((favorite) => favorite.id === item.id)) {
                const updatedFavorites = [...favorites, item];
                setArraySessionStorages({
                    key: SESSION_STORAGE_KEY,
                    value: updatedFavorites,
                });
                setFavoriteList(updatedFavorites);
                setIsFavorite(true);
                setToastMessage(ValidationMessages.SUCCESS_ADD_FAVORITE);
            } else {
                setToastMessage(ValidationMessages.ALREADY_ADDED);
            }
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    }

    function removeFromFavorite(item: SearchResultItemDTO) {
        try {
            const favorites =
                getArraySessionStorages(SESSION_STORAGE_KEY) || [];
            const updatedFavorites = favorites.filter(
                (favorite) => favorite.id !== item.id
            );
            setArraySessionStorages({
                key: SESSION_STORAGE_KEY,
                value: updatedFavorites,
            });
            setFavoriteList(updatedFavorites);
            setIsFavorite(false);
            setToastMessage(ValidationMessages.SUCCESS_DELETE_IMG);
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
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
                    <i className="c-icon c-icon--fill-warning">favorite</i>
                ) : (
                    <i className="c-icon">favorite_border</i>
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
