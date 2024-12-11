import { FormEvent, useCallback, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import validateId from '../../components/Validations/ValidateId';
import handleInputChange from 'utils/Event/handleInputChange';
import validateEmail from 'components/Validations/ValidateEmail';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { loginVerifyPassword, verifyIdEmail } from 'services/PasswordService';
import useTimer from 'hooks/useTimer';
import formatTime from 'utils/Format/formatTime';
import {
    LoginVerifyIdEmailDTO,
    LoginVerifyPasswordDTO,
} from 'services/dto/PasswordDto';
import getValidationMessages from '../../components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import StorageKeyword from 'Constant/StorageKeyword';

export default function LogInEmailVerification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [verification, setVerification] = useState(false);
    const [isVerificationSuccessful, setIsVerificationSuccessful] =
        useState(false);

    const [emailError, setEmailError] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [message, setMessage] = useState('');

    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);

    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

    const onChangeEmail = useCallback(
        handleInputChange(setEmail, setEmailError, validateEmail),
        []
    );

    const onChangeCode = useCallback((e: FormEvent<HTMLInputElement>) => {
        setCode(e.currentTarget.value);
    }, []);

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
                const userData: LoginVerifyPasswordDTO = {
                    email,
                    authenticationType:
                        StorageKeyword.VERIFICATION_CODE_PASSWORD,
                };
                try {
                    await loginVerifyPassword(userData);
                    navigate('/find/password/reset');
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [email, code, emailError, isVerificationSuccessful, navigate]
    );

    const onChangeVerification = useCallback(async () => {
        if (emailError || !email) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (email) {
            setMessage('');
            startTimer();
            setHasTimerStarted(true);
            try {
                const userData: LoginVerifyIdEmailDTO = {
                    email,
                };
                await verifyIdEmail(userData);
                setVerification(true);
                setIsVerificationSuccessful(true);
            } catch (error) {
                setMessage(ValidationMessages.INVALID_USER);
                setIsVerificationSuccessful(false);
            }
        }
    }, [startTimer, email, emailError]);

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
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
                    <button
                        className="button__rounded button__orange"
                        type="submit"
                    >
                        {t('FIND_PASSWORD')}
                    </button>
                    {message && <p className="message">{message}</p>}
                </section>
            </form>
        </div>
    );
}
