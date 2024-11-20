import { useEffect, useState } from 'react';
import CategorySection from '../components/UI/Category/CategorySection';
import { getNotificationState } from 'services/NotificationService';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import {
    deleteSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';
import ValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';

export default function HomePage() {
    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);

    useEffect(() => {
        // getNotificationState();

        const sessionStorageImage = getSessionStorages(
            StorageKeyword.UPLOAD_SUCCESS
        );
        const sessionStorageDeleteAccount = getSessionStorages(
            StorageKeyword.DELETE_ACCOUNT_SUCCESS
        );
        if (
            sessionStorageImage &&
            sessionStorageImage === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.SUCCESS_IMAGE_UPLOAD);
            setToast(true);
            deleteSessionStorage(StorageKeyword.UPLOAD_SUCCESS);
        }
        if (
            sessionStorageDeleteAccount &&
            sessionStorageDeleteAccount === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.SUCCESS_DELETE_ACCOUNT);
            setToast(true);
            deleteSessionStorage(StorageKeyword.DELETE_ACCOUNT_SUCCESS);
        }
    }, []);
    return (
        <main className="home__main">
            <CategorySection />
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </main>
    );
}
