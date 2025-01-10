import { useAuth } from 'components/auth/ProvideAuth';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import validateLogInPassword from 'components/Validations/ValidateLogInPassword';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteAccount } from 'services/deleteAccountService';
import handleInputChange from 'utils/Event/handleInputChange';
import addDeleteReason from 'utils/firebase/addDeleteReason';
import {
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';

export default function DeleteAccount() {
    const navigate = useCustomNavigate();
    const auth = useAuth();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [reason, setReason] = useState<string>('');
    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);
    const [password, setPassword] = useState('qwerQ!1234');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const onChangePassword = useCallback(
        handleInputChange(
            setPassword,
            setPasswordError,
            validateLogInPassword,
            () => {
                setMessage('');
            }
        ),
        []
    );
    function onChangeReason(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setReason(event.target.value);
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!reason) {
            setToastMessage(ValidationMessages.REQUIRED_REASON);
            setToast(true);
            return;
        }

        try {
            const email = getSessionStorages(StorageKeyword.USER_EMAIL);
            if (!email) {
                setToastMessage(ValidationMessages.REQUIRED_LOGIN);
                setToast(true);
                return;
            }
            await addDeleteReason(reason);
            const userData = {
                email: email,
                password: password,
            };
            await deleteAccount(userData);
            auth.logout(() => {
                navigate('/');
            });

            setSessionStorages({
                key: StorageKeyword.DELETE_ACCOUNT_SUCCESS,
                value: StorageKeyword.TRUE,
            });
        } catch (error) {
            setToastMessage(ValidationMessages.REQUIRED_REASON);
            setToast(true);
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
        onChangeReason(event);
    };

    return (
        <main className="home__main">
            <form action="" className="c-deleteAccount" onSubmit={onSubmit}>
                <h2>{t('DELETE_GREETING')}😭</h2>
                <p>
                    {t('DELETE_GREETING-1')} <br /> {t('DELETE_GREETING-2')}
                </p>
                <section className="c-deleteAccount__checkbox">
                    <div>
                        <input
                            id="resource"
                            type="radio"
                            name="delete"
                            value="자료가 충분하지 않다"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="resource">{t('DELETE_REASON-1')}</label>
                    </div>
                    <div>
                        <input
                            id="privacy"
                            type="radio"
                            name="delete"
                            value="개인정보 문제"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="privacy">{t('DELETE_REASON-2')}</label>
                    </div>
                    <div>
                        <input
                            id="notuseful"
                            type="radio"
                            name="delete"
                            value="서비스가 유용하지 않다"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="notuseful">
                            {t('DELETE_REASON-3')}
                        </label>
                    </div>
                    <div>
                        <input
                            id="difficult"
                            type="radio"
                            name="delete"
                            value="이용이 어렵다"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="difficult">
                            {t('DELETE_REASON-4')}
                        </label>
                    </div>
                    <section className="c-deleteAccount__checkbox-textarea">
                        <div>
                            <input
                                id="other"
                                type="radio"
                                name="delete"
                                value="기타"
                                onChange={onChangeReason}
                            />
                            <label htmlFor="other">
                                {t('DELETE_REASON-5')}
                            </label>
                        </div>
                        <textarea
                            id="feedback"
                            placeholder={t('DELETE_REASON-6')}
                            onInput={handleInput}
                            onChange={onChangeReason}
                        />
                    </section>
                    <section className=" c-login ">
                        <div className="c-login__section">
                            {passwordError ? (
                                <p className="error-message">{passwordError}</p>
                            ) : (
                                <p>{DEFAULT_PASSWORD}</p>
                            )}
                            <label htmlFor="password">{DEFAULT_PASSWORD}</label>
                            <input
                                autoComplete="on"
                                ref={passwordInputRef}
                                className="c-login__input"
                                name="password"
                                type="password"
                                id="password"
                                placeholder={
                                    ValidationMessages.REQUIRED_PASSWORD
                                }
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                    </section>
                </section>
                {message && (
                    <p className="c-login__message font-warning">{message}</p>
                )}
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    {t('DELETE_ACCOUNT_CONFIRM')}
                </button>
            </form>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </main>
    );
}
