import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import validateEmail from '../components/Validations/ValidateEmail';
import validateLogInPassword from '../components/Validations/ValidateLogInPassword';
import { LogInRequestDTO } from '../services/dto/LogInDto';
import handleInputChange from '../utils/Event/handleInputChange';
import { errorInputCheck } from '../utils/Event/errorInputCheck';
import { resetErrors } from 'utils/Event/resetError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useAuth } from 'components/auth/ProvideAuth';
import { logIn } from 'services/LogInService';
import { getUserInfo } from 'services/UserInfoService';
import StorageKeyword from 'Constant/StorageKeyword';
import {
    deleteSessionStorage,
    getSessionStorages,
} from 'utils/Storage/sessionStorage';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import { useTranslation } from 'react-i18next';
import getValidationMessages from '../components/Validations/ValidationMessages';

export default function LogIn() {
    const navigate = useCustomNavigate();
    const auth = useAuth();

    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);
    const ValidationMessages = getValidationMessages();
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [email, setEmail] = useState('hatrix1014@gmail.com');
    const [password, setPassword] = useState('qwerQ!1234');
    const [message, setMessage] = useState('');

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const onChangeEmail = useCallback(
        handleInputChange(setEmail, setEmailError, validateEmail, () => {
            setMessage('');
        }),
        []
    );

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

    useEffect(() => {
        if (email && password) {
            resetErrors(setEmailError, setPasswordError);
        }
    }, []);

    useEffect(() => {
        const sessionStoragePassword = getSessionStorages(
            StorageKeyword.CHANGE_PASSWORD_SUCCESS
        );
        const sessionStorageVerification = getSessionStorages(
            StorageKeyword.VERIFICATION_SUCCESS
        );

        if (
            sessionStoragePassword &&
            sessionStoragePassword === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.CHANGE_PASSWORD_SUCCESS);
            setToast(true);
            deleteSessionStorage(StorageKeyword.CHANGE_PASSWORD_SUCCESS);
        }
        if (
            sessionStorageVerification &&
            sessionStorageVerification === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.SUCCESS_VERIFICATION);
            setToast(true);
            deleteSessionStorage(StorageKeyword.VERIFICATION_SUCCESS);
        }
    }, []);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (emailError || !email) {
                errorInputCheck(emailInputRef.current);
                return;
            }

            if (passwordError || !password) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (email && password) {
                resetErrors(setEmailError, setPasswordError);
                const userData: LogInRequestDTO = {
                    email: email,
                    password: password,
                };

                try {
                    await logIn(userData);
                    auth.login(() => {
                        navigate('/');
                    });
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                        setMessage(error.message);
                    } else {
                        setMessage(ValidationMessages.UNKNOWN_ERROR);
                    }
                }
            }
        },
        [email, password, emailError, passwordError, auth, navigate]
    );
    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    {emailError ? (
                        <p className="error-message">{emailError}</p>
                    ) : (
                        <p>{DEFAULT_EMAIL}</p>
                    )}
                    <label htmlFor="email">{DEFAULT_EMAIL}</label>
                    <input
                        ref={emailInputRef}
                        className="c-login__input"
                        name="email"
                        id="email"
                        type="text"
                        placeholder={ValidationMessages.REQUIRED_EMAIL}
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
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
                        placeholder={ValidationMessages.REQUIRED_PASSWORD}
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                {message && (
                    <p className="c-login__message font-warning">{message}</p>
                )}
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__orange"
                        type="submit"
                    >
                        {t('DEFAULT_LOGIN')}
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="button__rounded button__light"
                        type="button"
                    >
                        {t('DEFAULT_SIGNUP')}
                    </button>
                    <section className="c-login__button-section-center">
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/email/verification')}
                        >
                            {t('FIND_EMAIL')}
                        </button>
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/find/password')}
                        >
                            {t('FIND_PASSWORD')}
                        </button>
                    </section>
                </section>
            </form>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </div>
    );
}
