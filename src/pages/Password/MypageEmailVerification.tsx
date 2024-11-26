import { AxiosError } from 'axios';
import validateEmail from 'components/Validations/ValidateEmail';
import validateId from 'components/Validations/ValidateId';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import useTimer from 'hooks/useTimer';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import formatTime from 'utils/Format/formatTime';
import handleInputChange from 'utils/Event/handleInputChange';
import { getPreviousUrl } from 'utils/Event/saveUrl';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import { resetErrors } from 'utils/Event/resetError';
import { mypageVerifyPassword } from 'services/PasswordService';
import { MypageVerifyPasswordDTO } from 'services/dto/PasswordDto';
import { useTranslation } from 'react-i18next';
import getValidationMessages from 'components/Validations/ValidationMessages';

export default function MypageEmailVerification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [verification, setVerification] = useState(false);

    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const idInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive, setIsActive } =
        useTimer(300);

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;

    const [emailError, setEmailError] = useState('');
    const [idError, setIdError] = useState(DEFAULT_ID);
    const [id, setId] = useState('');

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

    const onChangeVerification = useCallback(() => {
        if (emailError || !email) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (email) {
            setMessage('');
            setVerification(true);
            startTimer();
            setHasTimerStarted(true);
        }
    }, [startTimer, email, emailError]);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
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

            if (email && code) {
                setMessage('');
                const userData: MypageVerifyPasswordDTO = {
                    id,
                    email,
                    verificationType: '비밀번호 변경',
                };
                await mypageVerifyPassword(userData);
                navigate('/password/change');
            }
        },
        [id, email, idError, emailError, code]
    );

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
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    {t('CHANGE_PASSWORD')}
                </button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}
