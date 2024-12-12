import { FormEvent, useCallback, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import validateEmail from 'components/Validations/ValidateEmail';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import useTimer from 'hooks/useTimer';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';
import formatTime from 'utils/Format/formatTime';
import { postIdSearchCode, verifyIdSearchCode } from 'services/IdService';
import { IdSearchRequestDTO } from 'services/dto/IdDto';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import validateName from 'components/Validations/ValidateName';
import StorageKeyword from 'Constant/StorageKeyword';
import { VerifyCodePasswordDTO } from 'services/dto/PasswordDto';
import { VerificationRequestDTO } from 'services/dto/VerificationDto';

export default function IdEmailVerification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [verification, setVerification] = useState(false);

    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;
    const DEFAULT_NAME = ValidationMessages.DEFAULT_NAME;

    const [message, setMessage] = useState('');
    const [nameError, setNameError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [emailError, setEmailError] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

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

    const onSubmitVerification = useCallback(async () => {
        if (nameError || !name) {
            errorInputCheck(nameInputRef.current);
            return;
        }

        if (emailError || !email) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (email && name) {
            const userData: VerificationRequestDTO = {
                userName: name,
                email: email,
                authenticationType: StorageKeyword.VERIFICATION_CODE_ID,
            };
            setMessage('');
            startTimer();
            setHasTimerStarted(true);

            try {
                await postIdSearchCode(userData);
                setVerification(true);
            } catch (error) {
                handleApiError(error as AxiosError, setMessage);
            }
        }
    }, [startTimer, email, emailError, name, nameError]);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (emailError) {
                errorInputCheck(emailInputRef.current);
                return;
            }

            if (!code) {
                errorInputCheck(codeInputRef.current);
                return;
            }

            if (email && code && verification) {
                const userData: VerifyCodePasswordDTO = {
                    email: email,
                    authenticationCode: code,
                    authenticationType: StorageKeyword.VERIFICATION_CODE_ID,
                };
                setMessage('');
                try {
                    const response = await verifyIdSearchCode(userData);
                    navigate('/find/id', {
                        state: { loginId: response.data.loginId },
                    });
                } catch (error) {
                    if (error === 40105) {
                        setMessage(ValidationMessages.FAILED_VERIFICATION_CODE);
                        return;
                    }
                    if (error === 40001) {
                        setMessage(ValidationMessages.INVALID_CODE_TYPE);
                        return;
                    }
                    if (error === 5000) {
                        setMessage(ValidationMessages.SERVER_ERROR);
                        return;
                    }
                    setMessage(ValidationMessages.UNKNOWN_ERROR);
                }
            }
        },
        [email, code, verification, emailError, navigate]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <section className="c-login__section">
                    {nameError ? (
                        <p className="error-message">{nameError}</p>
                    ) : (
                        <p>{DEFAULT_NAME}</p>
                    )}
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
                    {emailError ? (
                        <p className="error-message">{emailError}</p>
                    ) : (
                        <p>{DEFAULT_EMAIL}</p>
                    )}
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
                            onClick={onSubmitVerification}
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
                <section className="c-login__button-section-bottom">
                    <div className="c-login__button-section-bottom-text">
                        <p>{t('REQUIRED_VERIFICATION_FOR_FIND_ID-1')}</p>
                        <p>{t('REQUIRED_VERIFICATION_FOR_FIND_ID-2')}</p>
                    </div>
                    <button
                        className="button__light-font"
                        onClick={() => navigate('/verification')}
                    >
                        <p>{t('GO_VERIFY_EMAIL')}</p>
                    </button>
                </section>
                {message && <p className="message">{message}</p>}
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    {t('FIND_ID')}
                </button>
            </form>
        </div>
    );
}
