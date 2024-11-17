import { AxiosError } from 'axios';
import validateEmail from '../../components/Validations/ValidateEmail';
import ValidationMessages from '../../components/Validations/ValidationMessages';
import useCustomNavigate from '../../hooks/useCustomNaviaget';
import useTimer from '../../hooks/useTimer';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { handleApiError } from '../../utils/API/handleApiError';
import { errorInputCheck } from '../../utils/Event/errorInputCheck';
import handleInputChange from '../../utils/Event/handleInputChange';
import passwordCheckHandler from '../../utils/SignUp/passwordCheckHandler';
import { getPreviousUrl } from 'utils/Event/saveUrl';

export default function ChangePassword() {
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
    const pastUrl = getPreviousUrl();

    function nextPage() {
        if (pastUrl?.includes('login')) {
            navigate('/login');
        } else if (pastUrl?.includes('mypage')) {
            navigate('/mypage');
        } else {
            navigate(pastUrl || '/');
        }
    }

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
                <div className="c-login__section">
                    <p>{passwordError ? passwordError : DEFAULT_PASSWORD}</p>
                    <section className="c-login__section-password">
                        <div>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                ref={passwordInputRef}
                                className="c-login__input"
                                name="password"
                                type="password"
                                id="password"
                                placeholder="새로운 비밀번호"
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-check">
                                비밀번호 확인
                            </label>
                            <input
                                ref={passwordCheckInputRef}
                                className="c-login__input"
                                name="password-check"
                                type="password"
                                id="password-check"
                                placeholder="새로운 비밀번호 확인"
                                value={passwordCheck}
                                onChange={onChangePasswordCheck}
                            />
                        </div>
                    </section>
                </div>
                <button
                    className="button__rounded button__orange"
                    onClick={nextPage}
                >
                    비밀번호 변경하기
                </button>
            </form>
        </div>
    );
}
