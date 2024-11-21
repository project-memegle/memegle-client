import { FormEvent, useCallback, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import validateEmail from 'components/Validations/ValidateEmail';
import ValidationMessages from 'components/Validations/ValidationMessages';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import useTimer from 'hooks/useTimer';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';
import formatTime from 'utils/Format/formatTime';
import { postIdSearchCode, verifyIdSearchCode } from 'services/IdService';
import { IdSearchRequestDTO, IdSearchResponseDTO } from 'services/dto/IdDto';

export default function IdEmailVerification() {
    const navigate = useCustomNavigate();
    const [verification, setVerification] = useState(false);

    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);

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

    const onChangeVerification = useCallback(async () => {
        if (emailError) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (email) {
            const userData: IdSearchRequestDTO = {
                email: email,
                authenticationCode: '이메일 인증',
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
    }, [startTimer, email, emailError]);

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
                const userData: IdSearchResponseDTO = {
                    email: email,
                    code: code,
                    authenticationCode: '이메일 인증',
                };
                setMessage('');
                try {
                    const response = await verifyIdSearchCode(userData);
                    navigate('/find/id', {
                        state: { userId: response.data.userId },
                    });
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [email, code, verification, emailError, navigate]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
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
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    아이디 찾기
                </button>
                <section className="c-login__button-section-bottom">
                    <p>본인 인증을 하지 않았다면 아이디를 찾을 수 없어요</p>
                    <button
                        className="button__light-font"
                        onClick={() => navigate('/verification')}
                    >
                        본인인증 하러가기
                    </button>
                </section>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}
