import { useEffect, useState } from 'react';
import ToastMessage from '../../components/UI/ToastMessage/ToastMessage';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import handleCopyImage from 'utils/Event/handleCopyImage';
import {
    getArraySessionStorages,
    setArraySessionStorages,
} from 'utils/Storage/sessionStorage';
import { SESSION_STORAGE_KEY } from 'pages/Favorite/Favorite';
import getValidationMessages from 'components/Validations/ValidationMessages';
import DownloadLink from 'components/UI/Result/DownloadLink';

interface ResultItemProps {
    result: SearchResultItemDTO;
    onOpenModal: (imageUrl: string, tagList: string[]) => void;
}

export default function ResultItem({ result, onOpenModal }: ResultItemProps) {
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [favoriteList, setFavoriteList] = useState<
        { id: number; imageUrl: string; tagList: string[] }[]
    >([]);
    const ValidationMessages = getValidationMessages();

    useEffect(() => {
        const favorites = getArraySessionStorages(SESSION_STORAGE_KEY);
        setFavoriteList(favorites || []);
    }, []);

    async function handleCopy() {
        await handleCopyImage(result.imageUrl, setToastMessage, setToast, () =>
            onOpenModal(result.imageUrl, result.tagList)
        );
    }
    //todo : API 로 바꾸기
    function addToFavoriteApi({
        id,
        imageUrl,
        imageCategory,
        createdAt,
        modifiedAt,
        tagList,
    }: SearchResultItemDTO) {
        const favoriteList = getArraySessionStorages(SESSION_STORAGE_KEY) || [];
        const favoriteItem = {
            id,
            imageUrl,
            imageCategory,
            createdAt,
            modifiedAt,
            tagList,
        };
        favoriteList.push(favoriteItem);
        setArraySessionStorages({
            key: SESSION_STORAGE_KEY,
            value: favoriteList,
        });
    }

    async function addToFavorite(item: SearchResultItemDTO) {
        try {
            addToFavoriteApi(item);
            setFavoriteList((prev) => [...prev, item]);
            setToastMessage(ValidationMessages.SUCCESS_ADD_FAVORITE);
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    }

    async function removeFromFavorite(item: SearchResultItemDTO) {
        try {
            const updatedFavorites = favoriteList.filter(
                (favorite) => favorite.id !== item.id
            );
            setArraySessionStorages({
                key: SESSION_STORAGE_KEY,
                value: updatedFavorites,
            });
            setFavoriteList(updatedFavorites);
            setToastMessage(ValidationMessages.SUCCESS_DELETE_IMG);
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    }

    const isFavorite = favoriteList.some(
        (favorite) => favorite.id === result.id
    );

    function handleDownloadSuccess() {
        setToastMessage(ValidationMessages.SUCCESS_IMAGE_DOWNLOAD);
        setToast(true);
    }

    return (
        <article className="result__item" onClick={handleCopy}>
            <div className="result__item-copy">
                <i className="c-icon">file_copy</i>
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
            <DownloadLink
                url={result.imageUrl}
                filename={`${result.imageCategory}${result.id}`}
                onDownload={handleDownloadSuccess}
            />
            <img src={result.imageUrl} alt={`img-${result.id}`} />
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </article>
    );
}
