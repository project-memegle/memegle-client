import MyImageItem from 'components/UI/MyImages/MyImageItem';
import MyImageItemWrapper from 'components/UI/MyImages/MyImageItemWrapper';
import StorageKeyword from 'Constant/StorageKeyword';
import { useEffect, useState } from 'react';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import { getUploadedImages } from 'services/MyImagesService';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import ImageModal from 'components/UI/Result/ImageModal';

export default function MyImages() {
    const [items, setItems] = useState<SearchResultItemDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedResult, setSelectedResult] =
        useState<SearchResultItemDTO | null>(null);
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        const userId = getSessionStorages(StorageKeyword.USER_UID);
        if (!userId) return;
        const fetchData = async () => {
            try {
                const result = await getUploadedImages(userId);
                setItems(result);
            } catch (error) {
                setError('Error fetching images');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function onDelete(itemId: string) {
        const newItems = items.filter((item) => item.id !== itemId);
        setItems(newItems);
        setToastMessage('Image deleted successfully');
        setToast(true);
    }

    function onSave() {
        setToastMessage('Image saved successfully');
        setToast(true);
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
            {loading && <div>Loading...</div>}
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
