import MyImageItem from 'components/UI/MyImages/MyImageItem';
import StorageKeyword from 'Constant/StorageKeyword';
import { useEffect, useState } from 'react';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import {
    deleteUploadedImages,
    getUploadedImages,
} from 'services/MyImagesService';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import ImageModal from 'components/UI/Result/ImageModal';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import getValidationMessages from 'components/Validations/ValidationMessages';

export default function MyImages() {
    const [items, setItems] = useState<SearchResultItemDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedResult, setSelectedResult] =
        useState<SearchResultItemDTO | null>(null);
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const validationMessage = getValidationMessages();
    const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        const userUId = getSessionStorages(StorageKeyword.USER_UID);
        if (!userUId) {
            setError(validationMessage.USER_ID_MISSING);
            setLoading(false);
            return;
        }
        setUserId(userUId);
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const result = await getUploadedImages(userId);
                setItems(result);
            } catch (error) {
                setError(validationMessage.SERVER_ERROR);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    async function onDelete({
        category,
        itemId,
        userId,
    }: {
        category: string;
        itemId: string;
        userId: string;
    }) {
        if (!userId) {
            setToastMessage(validationMessage.USER_ID_MISSING);
            setToast(true);
            return;
        }

        try {
            await deleteUploadedImages({
                userId: userId,
                category: category,
                uniqueFileName: itemId,
            });
            const newItems = items.filter((item) => item.id !== itemId);
            setItems(newItems);
            setToastMessage(validationMessage.SUCCESS_DELETE_IMG);
        } catch (error) {
            console.error('Delete failed:', error);
            setToastMessage(validationMessage.SERVER_ERROR);
        } finally {
            setToast(true);
        }
    }

    const handleOpenModal = (selectedResult: SearchResultItemDTO) => {
        setSelectedResult(selectedResult);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedResult(null);
    };

    return (
        <main className="home__main c-favorite">
            {loading && <LoadingSpinner />}
            {error && <div>{error}</div>}
            <div className="c-favorite__grid">
                {items.map((item) => (
                    <MyImageItem
                        key={item.id}
                        item={item}
                        onDelete={onDelete}
                        onOpenModal={handleOpenModal}
                    />
                ))}
            </div>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
            {modalVisible && selectedResult && (
                <ImageModal
                    onClose={handleCloseModal}
                    result={selectedResult}
                    onImageLoad={() => {}}
                    handleDownloadSuccess={() => {}}
                    onOpenModal={handleOpenModal}
                />
            )}
        </main>
    );
}
