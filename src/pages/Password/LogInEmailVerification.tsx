import { FormEvent, useCallback, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import ValidationMessages from '../../components/Validations/ValidationMessages';
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

export default function LogInEmailVerification() {
    const navigate = useCustomNavigate();

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [verification, setVerification] = useState(false);
    const [isVerificationSuccessful, setIsVerificationSuccessful] =
        useState(false);

    const [idError, setIdError] = useState(DEFAULT_ID);
    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [message, setMessage] = useState('');

    const idInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);

    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId),
        []
    );

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
                setMessage('인증코드를 먼저 보내주세요.');
                return;
            }
            if (idError) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (emailError) {
                errorInputCheck(emailInputRef.current);
                return;
            }
            if (id && email && code && isVerificationSuccessful) {
                setMessage('');
                const userData: LoginVerifyPasswordDTO = {
                    id,
                    email,
                    verificationType: '비밀번호 찾기',
                };
                try {
                    await loginVerifyPassword(userData);
                    navigate('/find/password/reset');
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [
            id,
            email,
            code,
            idError,
            emailError,
            isVerificationSuccessful,
            navigate,
        ]
    );

    const onChangeVerification = useCallback(async () => {
        if (idError) {
            errorInputCheck(idInputRef.current);
            return;
        }
        if (emailError) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (id && email) {
            setMessage('');
            startTimer();
            setHasTimerStarted(true);
            try {
                const userData: LoginVerifyIdEmailDTO = {
                    id,
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
    }, [startTimer, email, emailError, id]);

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{idError ? idError : DEFAULT_ID}</p>
                    <label htmlFor="id">아이디</label>
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
                                ? '인증코드 재전송'
                                : '인증코드 보내기'}
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
                                isActive ? '인증번호 입력' : '시간 초과'
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
                    <button
                        className="button__rounded button__orange"
                        type="submit"
                    >
                        비밀번호 찾기
                    </button>
                    <section className="c-login__button-section-bottom">
                        <p>
                            본인 인증을 하지 않았다면 비밀번호를 찾을 수 없어요
                        </p>
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/verification')}
                        >
                            본인인증 하러가기
                        </button>
                    </section>
                    {message && <p className="message">{message}</p>}
                </section>
            </form>
        </div>
    );
}
