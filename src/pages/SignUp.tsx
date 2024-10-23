import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import validateId from '../components/Validations/ValidateId';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateNickname from '../components/Validations/ValidateNickname';
import validateSignUpPassword from '../components/Validations/ValidateSignUpPassword';
import { handleApiError } from '../utils/handleApiError';
import { SignUpDTO } from '../services/dto/SignUpDto';

export default function SignUp() {
    const [id, setId] = useState('');
    const [idError, setIdError] = useState(ValidationMessages.DEFAULT_ID);
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState(
        ValidationMessages.DEFAULT_NICKNAME
    );
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(
        ValidationMessages.DEFAULT_PASSWORD
    );
    const [signUpError, setSignUpError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const onChangeId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateId(value);
        setId(value);
        setIdError(error || ValidationMessages.DEFAULT_ID);
    }, []);

    const onChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateNickname(value);
        setNickname(value);
        setNicknameError(error || ValidationMessages.DEFAULT_NICKNAME);
    }, []);

    const onChangePassword = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateSignUpPassword(value, passwordCheck);
            setPassword(value);
            setPasswordError(error || ValidationMessages.DEFAULT_PASSWORD);
        },
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateSignUpPassword(password, value);
            setPasswordCheck(value);
            setPasswordError(error || ValidationMessages.DEFAULT_PASSWORD);
        },
        [password]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (idError || passwordError || nicknameError) {
                return;
            }

            if (nickname && id && password && passwordCheck) {
                setSignUpError('');

                const userData: SignUpDTO = {
                    loginId: id,
                    nickname: nickname,
                    password: password,
                };

                try {
                    const response = await axios.post('/signup', userData);
                    console.log(response);
                    setSignupSuccess(ValidationMessages.SIGNUP_SUCCESS);
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
        ]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{idError}</p>
                    <label htmlFor="id">아이디</label>
                    <input
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
                    <p>{nicknameError}</p>
                    <label htmlFor="nickname">닉네임</label>
                    <input
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
                    <p>{passwordError}</p>
                    <section className="c-login__section-password">
                        <div>
                            <label htmlFor="password">비밀번호</label>
                            <input
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
