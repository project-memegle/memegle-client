import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import ValidationMessages from 'components/Validations/ValidationMessages';
import handleInputChange from 'utils/Event/handleInputChange';
import validateEmail from 'components/Validations/ValidateEmail';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { handleApiError } from 'utils/API/handleApiError';
import { post } from 'utils/API/fetcher';
import validateName from 'components/Validations/ValidateName';
import { VerificationRequestDTO } from 'services/dto/VerificationDto';
import useTimer from 'hooks/useTimer';
import formatTime from 'utils/Format/formatTime';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import {
    postVerificationCode,
    verifyVerificationCode,
} from 'services/VerificationService';
import StorageKeyword from 'Constant/StorageKeyword';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'components/auth/ProvideAuth';
import { LogInRequestDTO } from 'services/dto/LogInDto';
import { logIn } from 'services/LogInService';
import { useTranslation } from 'react-i18next';
import getValidationMessages from 'components/Validations/ValidationMessages';

export default function SignUpVerification() {
    const navigate = useCustomNavigate();
    const auth = useAuth();
    const { t } = useTranslation();
    const ValidationMessages = getValidationMessages();

    const location = useLocation();
    const logInUserData = location.state as LogInRequestDTO;
    const DEFAULT_NAME = ValidationMessages.DEFAULT_NAME;
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [nameError, setNameError] = useState(DEFAULT_NAME);
    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const [message, setMessage] = useState('');
    const [verification, setVerification] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    useEffect(() => {
        if (!logInUserData) {
            navigate('/signup');
        }
    }, [logInUserData, navigate]);

    const skipVerification = async () => {
        if (!logInUserData) {
            navigate('/signup');
        }
        try {
            const loginData: LogInRequestDTO = {
                loginId: logInUserData.loginId,
                password: logInUserData.password,
            };

            await logIn(loginData);

            setSessionStorages({
                key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                value: StorageKeyword.TRUE,
            });

            // 로그인 상태를 업데이트하고 홈 페이지로 리다이렉트
            auth.login(() => {
                navigate('/');
            });
        } catch (error) {
            handleApiError(error as AxiosError, setMessage);
        }
    };

    const onChangeName = useCallback(
        handleInputChange(setName, setNameError, validateName),
        []
    );

    const onChangeEmail = useCallback(
        handleInputChange(setEmail, setEmailError, validateEmail),
        []
    );

    const onChangeCode = useCallback((e: FormEvent<HTMLInputElement>) => {
        setCode(e.currentTarget.value);
    }, []);

    /**
     * Send verification code
     */
    const onChangeVerification = useCallback(async () => {
        if (nameError) {
            errorInputCheck(nameInputRef.current);
            return;
        }
        if (emailError) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (name && email) {
            const userData: VerificationRequestDTO = {
                userName: name,
                email: email,
                authenticationCode: StorageKeyword.VERIFICATION_CODE_SIGNUP,
            };

            setMessage('');
            startTimer();
            setHasTimerStarted(true);

            try {
                await postVerificationCode(userData);
                setVerification(true);
            } catch (error) {
                handleApiError(error as AxiosError, setMessage);
            }
        }
    }, [startTimer, name, email, nameError, emailError]);

    /**
     * Submit verification code
     */
    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (nameError) {
                errorInputCheck(nameInputRef.current);
                return;
            }

            if (emailError) {
                errorInputCheck(emailInputRef.current);
                return;
            }

            if (!code) {
                errorInputCheck(codeInputRef.current);
                return;
            }

            if (name && email && code) {
                const userData: VerificationRequestDTO = {
                    userName: name,
                    email: email,
                    authenticationCode: StorageKeyword.VERIFICATION_CODE_SIGNUP,
                };
                setMessage('');
                try {
                    await verifyVerificationCode(userData);
                    skipVerification();

                    const { loginId, password } = logInUserData;

                    const loginData: LogInRequestDTO = {
                        loginId,
                        password,
                    };
                    await logIn(loginData);

                    setSessionStorages({
                        key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });

                    auth.login(() => {
                        navigate('/');
                    });
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [name, email, code, nameError, emailError, logInUserData]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <section className="c-login__section">
                    <p>{nameError ? nameError : DEFAULT_NAME}</p>
                    <label htmlFor="name">이름</label>
                    <input
                        ref={nameInputRef}
                        className="c-login__input"
                        name="name"
                        id="name"
                        type="text"
                        placeholder={ValidationMessages.REQUIRED_NAME}
                        value={name}
                        onChange={onChangeName}
                        onInput={onChangeName}
                    />
                </section>
                <section className="c-login__section">
                    <p>{emailError ? emailError : DEFAULT_EMAIL}</p>
                    <section className="c-login__section-verification">
                        <div>
                            <label htmlFor="email">이메일</label>
                            <input
                                ref={emailInputRef}
                                className="c-login__input"
                                name="email"
                                id="email"
                                type="text"
                                placeholder={ValidationMessages.REQUIRED_EMAIL}
                                value={email}
                                onChange={onChangeEmail}
                                onInput={onChangeEmail}
                            />
                        </div>
                        <button
                            type="button"
                            className="button__rounded button__light"
                            onClick={onChangeVerification}
                            disabled={isActive}
                        >
                            {hasTimerStarted
                                ? t('VERIFICATION_RESEND_CODE')
                                : t('VERIFICATION_SEND_CODE')}
                        </button>
                    </section>
                </section>
                {verification && (
                    <section className="c-login__section">
                        <label htmlFor="verification">인증번호</label>
                        <input
                            ref={codeInputRef}
                            className="c-login__input"
                            name="verification"
                            id="verification"
                            type="text"
                            placeholder={
                                isActive
                                    ? t('VERIFICATION_ENTER_CODE')
                                    : t('VERIFICATION_TIMEOVER')
                            }
                            disabled={!isActive}
                            value={code}
                            onChange={onChangeCode}
                            onInput={onChangeCode}
                        />
                        <p className="c-login__section-timer">
                            {formatTime(timer)}
                        </p>
                    </section>
                )}
                <section className="c-login__button-section">
                    <button className="button__rounded button__orange">
                        {t('VERIFICATION_COMPLETE')}
                    </button>
                    <button
                        className="button__rounded button__light"
                        type="button"
                        onClick={skipVerification}
                    >
                        {t('BUTTON_LATER')}
                    </button>
                </section>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}
