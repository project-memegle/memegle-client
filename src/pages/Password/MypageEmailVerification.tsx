import validateEmail from 'components/Validations/ValidateEmail';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import useTimer from 'hooks/useTimer';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import formatTime from 'utils/Format/formatTime';
import handleInputChange from 'utils/Event/handleInputChange';
import { resetErrors } from 'utils/Event/resetError';
import {
    VerifyCodePassword,
    SendPasswordCode,
} from 'services/PasswordService';
import {
    SendPasswordCodeDTO,
    VerifyCodePasswordDTO,
} from 'services/dto/PasswordDto';
import { useTranslation } from 'react-i18next';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import validateName from 'components/Validations/ValidateName';

export default function MypageEmailVerification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [verification, setVerification] = useState(false);

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const DEFAULT_NAME = ValidationMessages.DEFAULT_NAME;
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;
    const loginId = getSessionStorages(StorageKeyword.USER_ID);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive, setIsActive } =
        useTimer(300);
    const [isVerificationSuccessful, setIsVerificationSuccessful] =
        useState(false);

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [idError, setIdError] = useState(DEFAULT_ID);
    useEffect(() => {
        if (id && email) {
            resetErrors(setIdError, setEmailError);
        }
    }, [id, email]);

    useEffect(() => {
        if (email) {
            setIsActive(false);
        }
    }, [email, setIsActive]);

    const onChangeName = useCallback(
        handleInputChange(setName, setNameError, validateName),
        []
    );

    const onChangeEmail = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage('');
            setVerification(false);
            setHasTimerStarted(false);
            handleInputChange(setEmail, setEmailError, validateEmail)(event);
        },
        []
    );
    const onChangeCode = useCallback((e: FormEvent<HTMLInputElement>) => {
        setCode(e.currentTarget.value);
        setMessage('');
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
    }, [startTimer, email, emailError]);

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

            if (!code) {
                errorInputCheck(codeInputRef.current);
                return;
            }
            if (!verification) {
                setMessage(t('VERIFICATION_ERROR'));
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
                    navigate('/password/change', {
                        state: {
                            email: email,
                            authenticationCode: code,
                            authenticationType:
                                StorageKeyword.VERIFICATION_CODE_PASSWORD,
                            loginId: loginId,
                        },
                    });
                } catch (error) {
                    if (error === 40105) {
                        setMessage(ValidationMessages.FAILED_VERIFICATION_CODE);
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
        [id, email, idError, emailError, code, isVerificationSuccessful]
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
                {message && <p className="message">{message}</p>}
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    {t('CHANGE_PASSWORD')}
                </button>
            </form>
        </div>
    );
}
