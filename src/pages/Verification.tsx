import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import { useNavigate } from 'react-router-dom';
import handleInputChange from 'utils/Event/handleInputChange';
import validateEmail from 'components/Validations/ValidateEmail';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { handleApiError } from 'utils/API/handleApiError';
import { post } from 'utils/API/fetcher';
import validateName from 'components/Validations/ValidateName';
import {
    VerificationEmailDTO,
    VerificationCodeDTO,
} from 'services/dto/VerificationDto';
import useTimer from 'hooks/useTimer';
import formatTime from 'utils/Event/formatTIme';

export default function Verification() {
    const navigate = useNavigate();

    const DEFAULT_NAME = ValidationMessages.DEFAULT_NAME;
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [nameError, setNameError] = useState(DEFAULT_NAME);
    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [message, setMessage] = useState('');
    const [verification, setVerification] = useState(false);

    const { timer, startTimer, resetTimer, isActive } = useTimer(300);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

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

    const onChangeVerification = useCallback(() => {
        if (nameError || emailError) {
            if (nameError) errorInputCheck(nameInputRef.current);
            else if (emailError) errorInputCheck(emailInputRef.current);
            console.log('nameError', nameError);
            console.log('emailError', emailError);
            return;
        }

        if (name && email) {
            const userData: VerificationEmailDTO = {
                userName: name,
                email: email,
            };
            setMessage('');
            setVerification(true);
            startTimer();
            setHasTimerStarted(true);
            post('/auth/email/send', userData)
                .then((response: AxiosResponse) => {
                    console.log('response :', response);
                    setMessage(response.data.message);
                })
                .catch((error: AxiosError) => {
                    console.log(error.response);
                    handleApiError(error as AxiosError, setMessage);
                });
        }
    }, [startTimer, name, email, nameError, emailError]);

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            if (nameError || emailError) {
                if (nameError) errorInputCheck(nameInputRef.current);
                else if (emailError) errorInputCheck(emailInputRef.current);
                return;
            }
            if (name && email) {
                const userData: VerificationCodeDTO = {
                    email: email,
                    authenticationCode: code,
                };
                setMessage('');
                post('/auth/email', userData)
                    .then((response: AxiosResponse) => {
                        console.log('response :', response);
                        setMessage(response.data.message);
                    })
                    .catch((error: AxiosError) => {
                        console.log(error.response);
                        handleApiError(error as AxiosError, setMessage);
                    });
            }
        },
        [name, email, nameError, emailError]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <section className="c-login__section">
                    <p>{nameError ? nameError : DEFAULT_NAME}</p>
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
                    />
                </section>
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
                        />
                        <p className="c-login__section-timer">
                            {formatTime(timer)}
                        </p>
                    </section>
                )}
                <section className="c-login__button-section">
                    <button className="button__rounded button__orange">
                        이메일 인증
                    </button>
                </section>
            </form>
        </div>
    );
}
