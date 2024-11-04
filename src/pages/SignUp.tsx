import { FormEvent, useCallback, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import validateId from '../components/Validations/ValidateId';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateNickname from '../components/Validations/ValidateNickname';
import { SignUpDTO } from '../services/dto/SignUpDto';
import { errorInputCheck } from '../utils/Event/errorInputCheck';
import handleInputChange from '../utils/Event/handleInputChange';
import passwordCheckHandler from '../utils/SignUp/passwordCheckHandler';
import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';

export default function SignUp() {
    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFALUT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const [idError, setIdError] = useState(DEFAULT_ID);
    const [nicknameError, setNicknameError] = useState(DEFALUT_NICKNAME);
    const [passwordError, setPasswordError] = useState(DEFAULT_PASSWORD);

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const idInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId, () =>
            setSignupSuccess('')
        ),
        []
    );

    const onChangeNickname = useCallback(
        handleInputChange(setNickname, setNicknameError, validateNickname, () =>
            setSignupSuccess('')
        ),
        []
    );

    const onChangePassword = useCallback(
        passwordCheckHandler(setPassword, passwordCheck, setPasswordError, () =>
            setSignupSuccess('')
        ),
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        passwordCheckHandler(setPasswordCheck, password, setPasswordError, () =>
            setSignupSuccess('')
        ),
        [password]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (idError || nicknameError || passwordError) {
                if (idError) errorInputCheck(idInputRef.current);
                else if (nicknameError)
                    errorInputCheck(nicknameInputRef.current);
                else if (passwordError)
                    errorInputCheck(passwordInputRef.current);
                signUpError && setSignUpError(ValidationMessages.SIGNUP_ERROR);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                setSignUpError('');
                const userData: SignUpDTO = { loginId: id, nickname, password };
                setSignupSuccess(ValidationMessages.SIGNUP_SUCCESS);
                try {
                    const response = post('/users/sign/up', userData);
                    console.log(response);
                    console.log('회원 가입 성공');
                } catch (error) {
                    handleApiError(error as AxiosError, setSignUpError);
                }
            }
        },
        [
            id,
            nickname,
            password,
            passwordCheck,
            idError,
            passwordError,
            nicknameError,
            signUpError,
        ]
    );

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
                        placeholder="아이디"
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
                <div className="c-login__section">
                    <p>{nicknameError ? nicknameError : DEFALUT_NICKNAME}</p>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        ref={nicknameInputRef}
                        className="c-login__input"
                        name="nickname"
                        id="nickname"
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={onChangeNickname}
                    />
                </div>
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
                                placeholder="비밀번호"
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
                                placeholder="비밀번호 확인"
                                value={passwordCheck}
                                onChange={onChangePasswordCheck}
                            />
                        </div>
                    </section>
                </div>
                {signUpError && <p>{signUpError}</p>}
                {signupSuccess && <p>{signupSuccess}</p>}
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__light"
                        type="submit"
                    >
                        회원가입
                    </button>
                </section>
            </form>
        </div>
    );
}
