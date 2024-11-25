import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    deleteSessionStorage,
    getSessionStorages,
} from 'utils/Storage/sessionStorage';

export default function Mypage() {
    const navigate = useCustomNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('') || null;
    const { t } = useTranslation();
    const ValidationMessages = getValidationMessages();

    useEffect(() => {
        // getNotificationState();

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

        const userId = getSessionStorages(StorageKeyword.USER_ID);
        const email = getSessionStorages(StorageKeyword.USER_EMAIL);
        const nickname = getSessionStorages(StorageKeyword.USER_NICKNAME);

        if (userId) {
            setUserId(userId);
        }
        if (email) {
            setEmail(email);
        }
        if (nickname) {
            setNickname(nickname);
        }
    }, []);

    return (
        <main className="home__main c-mypage">
            <section className="c-mypage__info">
                <h2>
                    {t('MYPAGE_GREETING_ENGLISH')}
                    {nickname}
                    {t('MYPAGE_GREETING_KOREAN')}
                </h2>
                {email && <p>{email}</p>}
            </section>
            <section className="c-mypage__buttons">
                <button
                    type="button"
                    onClick={() => {
                        navigate('/changenickname');
                    }}
                >
                    {t('CHANGE_NICKNAME')}
                    <i className="c-icon">chevron_right</i>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate('/password/verification');
                    }}
                >
                    {t('CHANGE_PASSWORD')}
                    <i className="c-icon">chevron_right</i>
                </button>
                {/* <button
                    type="button"
                    onClick={() => {
                        navigate('/myimages');
                    }}
                >
                    내가 업로드한 이미지 목록 보기
                    <i className="c-icon">chevron_right</i>
                </button> */}
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
