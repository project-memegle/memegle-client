import { useEffect, useState } from 'react';
import CategorySection from '../components/UI/Category/CategorySection';
import { getNotificationState } from 'services/NotificationService';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import {
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';
import ValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';

export default function HomePage() {
    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);

    useEffect(() => {
        getNotificationState();

        const sessionStorage = getSessionStorages(
            StorageKeyword.UPLOAD_SUCCESS
        );
        if (sessionStorage === StorageKeyword.TRUE) {
            setToastMessage(ValidationMessages.SUCCESS_IMAGE_UPLOAD);
            setToast(true);
            setSessionStorages({
                key: StorageKeyword.UPLOAD_SUCCESS,
                value: StorageKeyword.FALSE,
            });
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
