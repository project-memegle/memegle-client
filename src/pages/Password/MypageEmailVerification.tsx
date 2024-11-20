import { AxiosError } from 'axios';
import validateEmail from 'components/Validations/ValidateEmail';
import validateId from 'components/Validations/ValidateId';
import ValidationMessages from 'components/Validations/ValidationMessages';
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

export default function MypageEmailVerification() {
    const navigate = useCustomNavigate();

    const [verification, setVerification] = useState(false);

    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const idInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;

    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);
    const [idError, setIdError] = useState(DEFAULT_ID);
    const [id, setId] = useState('');

    useEffect(() => {
        if (id && email) {
            resetErrors(setIdError, setEmailError);
        }
    }, [id, email]);

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
            if (emailError) {
                errorInputCheck(emailInputRef.current);
                return;
            }

            if (!code) {
                errorInputCheck(codeInputRef.current);
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
                    비밀번호 재설정
                </button>
            </form>
        </div>
    );
}
