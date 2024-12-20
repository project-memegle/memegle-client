import { FormEvent, useCallback, useRef, useState } from 'react';
import validateId from '../../components/Validations/ValidateId';
import handleInputChange from 'utils/Event/handleInputChange';
import validateEmail from 'components/Validations/ValidateEmail';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { VerifyCodePassword, SendPasswordCode } from 'services/PasswordService';
import useTimer from 'hooks/useTimer';
import formatTime from 'utils/Format/formatTime';
import {
    VerifyCodePasswordDTO,
    SendPasswordCodeDTO,
} from 'services/dto/PasswordDto';
import getValidationMessages from '../../components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import StorageKeyword from 'Constant/StorageKeyword';
import validateName from 'components/Validations/ValidateName';
import { handleVerificationApiError } from 'utils/API/handleVerificationAPIError';
import { AxiosError } from 'axios';

export default function LogInEmailVerification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();

    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;
    const DEFAULT_NAME = ValidationMessages.DEFAULT_NAME;
    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;

    const [verification, setVerification] = useState(false);
    const [isVerificationSuccessful, setIsVerificationSuccessful] =
        useState(false);

    const [id, setId] = useState('');
    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [message, setMessage] = useState('');

    const idInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);

    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId, () => {
            setMessage('');
        }),
        []
    );

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

    const onSubmitSendCode = useCallback(async () => {
        if (nameError || !name) {
            errorInputCheck(nameInputRef.current);
            return;
        }

        if (emailError || !email) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (email) {
            setMessage('');
            startTimer();
            setHasTimerStarted(true);
            try {
                const userData: SendPasswordCodeDTO = {
                    userName: name,
                    email: email,
                    authenticationType:
                        StorageKeyword.VERIFICATION_CODE_PASSWORD,
                };
                await SendPasswordCode(userData);
                setVerification(true);
                setIsVerificationSuccessful(true);
            } catch (error) {
                setMessage(ValidationMessages.INVALID_USER);
                setIsVerificationSuccessful(false);
            }
        }
    }, [startTimer, email, emailError, name, nameError]);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!isVerificationSuccessful) {
                setMessage(t('REQUIRED_VERIFICATION_CODE'));
                return;
            }
            if (emailError || !email) {
                errorInputCheck(emailInputRef.current);
                return;
            }
            if (email && code && isVerificationSuccessful) {
                setMessage('');
                const userData: VerifyCodePasswordDTO = {
                    email: email,
                    authenticationCode: code,
                    authenticationType:
                        StorageKeyword.VERIFICATION_CODE_PASSWORD,
                };
                try {
                    await VerifyCodePassword(userData);
                    navigate('/find/password/reset', {
                        state: {
                            email: email,
                            authenticationCode: code,
                            authenticationType:
                                StorageKeyword.VERIFICATION_CODE_PASSWORD,
                            loginId: 'testloginid1',
                        },
                    });
                } catch (error) {
                    handleVerificationApiError(error as AxiosError, setMessage);
                }
            }
        },
        [email, code, emailError, isVerificationSuccessful, navigate]
    );
    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    {idError ? (
                        <p className="error-message">{idError}</p>
                    ) : (
                        <p>{DEFAULT_ID}</p>
                    )}
                    <label htmlFor="id">{DEFAULT_ID}</label>
                    <input
                        ref={idInputRef}
                        className="c-login__input"
                        name="id"
                        id="id"
                        type="text"
                        placeholder={ValidationMessages.REQUIRED_ID}
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
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
                            onClick={onSubmitSendCode}
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
                        <p>{t('REQUIRED_VERIFICATION_FOR_FIND_PASSWORD-1')}</p>
                        <p>{t('REQUIRED_VERIFICATION_FOR_FIND_PASSWORD-2')}</p>
                    </div>
                    <button
                        className="button__light-font"
                        onClick={() => navigate('/verification')}
                    >
                        <p>{t('GO_VERIFY_EMAIL')}</p>
                    </button>
                </section>
                <section className="c-login__button-section">
                    {message && <p className="message">{message}</p>}
                    <button
                        className="button__rounded button__orange"
                        type="submit"
                    >
                        {t('FIND_PASSWORD')}
                    </button>
                </section>
            </form>
        </div>
    );
}
