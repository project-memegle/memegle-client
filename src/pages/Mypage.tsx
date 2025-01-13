import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getNotificationState } from 'services/NotificationService';
import {
    deleteSessionStorage,
    getSessionStorages,
} from 'utils/Storage/sessionStorage';

export default function Mypage() {
    const navigate = useCustomNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);
    const [email, setEmail] = useState('') || null;
    const { t } = useTranslation();
    const ValidationMessages = getValidationMessages();

    useEffect(() => {
        getNotificationState();
        const sessionStorageNickname = getSessionStorages(
            StorageKeyword.CHANGE_NICKNAME_SUCCESS
        );
        const sessionStoragePassword = getSessionStorages(
            StorageKeyword.CHANGE_PASSWORD_SUCCESS
        );

        if (
            sessionStorageNickname &&
            sessionStorageNickname === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.CHANGE_NICKNAME_SUCCESS);
            setToast(true);
            deleteSessionStorage(StorageKeyword.CHANGE_NICKNAME_SUCCESS);
        }

        if (
            sessionStoragePassword &&
            sessionStoragePassword === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.CHANGE_PASSWORD_SUCCESS);
            setToast(true);
            deleteSessionStorage(StorageKeyword.CHANGE_PASSWORD_SUCCESS);
        }

        const email = getSessionStorages(StorageKeyword.USER_EMAIL);

        if (email) {
            setEmail(email);
        }
    }, []);

    return (
        <main className="home__main c-mypage">
            <section className="c-mypage__info">
                <h2>{t('MYPAGE_GREETING')}</h2>
                {email && <p>{email}</p>}
            </section>
            <section className="c-mypage__buttons">
                <button
                    type="button"
                    onClick={() => {
                        navigate('/myimages');
                    }}
                >
                    {t('VIEW_MY_IMAGE_HISTORY')}
                    <i className="c-icon">chevron_right</i>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate('/password/change');
                    }}
                >
                    {t('CHANGE_PASSWORD')}
                    <i className="c-icon">chevron_right</i>
                </button>
                <button type="button" onClick={() => navigate('/delete')}>
                    {t('DELETE_ACCOUNT')}
                </button>
            </section>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </main>
    );
}
