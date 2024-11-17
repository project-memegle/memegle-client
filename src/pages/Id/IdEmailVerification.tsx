import { FormEvent, useCallback, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import validateEmail from '../../components/Validations/ValidateEmail';
import ValidationMessages from '../../components/Validations/ValidationMessages';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import useTimer from '../../hooks/useTimer';
import { handleApiError } from '../../utils/API/handleApiError';
import { errorInputCheck } from '../../utils/Event/errorInputCheck';
import formatTime from '../../utils/Event/formatTIme';
import handleInputChange from '../../utils/Event/handleInputChange';
import passwordCheckHandler from '../../utils/SignUp/passwordCheckHandler';

export default function IdEmailVerification() {
    const navigate = useCustomNavigate();

    const [verification, setVerification] = useState(false);
    const [verified, setVerified] = useState(false);

    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(DEFAULT_PASSWORD);

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

    const onChangeEmail = useCallback(
        handleInputChange(setEmail, setEmailError, validateEmail),
        []
    );

    const onChangePassword = useCallback(
        passwordCheckHandler(setPassword, passwordCheck, setPasswordError, () =>
            setMessage('')
        ),
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        passwordCheckHandler(setPasswordCheck, password, setPasswordError, () =>
            setMessage('')
        ),
        [password]
    );

    const onChangeCode = useCallback((e: FormEvent<HTMLInputElement>) => {
        setCode(e.currentTarget.value);
    }, []);

    const onChangeVerification = useCallback(() => {
        if (emailError) {
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

    const onSubmitVerification = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setVerified(true);
        },
        []
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (passwordError) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (password && passwordCheck) {
                setMessage('');
                try {
                    // await signUp(userData);
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [password, passwordCheck, passwordError]
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
                    onClick={() => {
                        navigate('/findid');
                    }}
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
            </form>
        </div>
    );
}
