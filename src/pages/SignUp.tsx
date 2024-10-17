import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import validateId from '../components/Validations/ValidateId';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateNickname from '../components/Validations/ValidateNickname';
import validateSignUpPassword from '../components/Validations/ValidateSignUpPassword';

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

    const onChangeId = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateId(value);
            setId(value);
            setIdError(error || ValidationMessages.DEFAULT_ID);
        },
        [setId, setIdError]
    );

    const onChangeNickname = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateNickname(value);
            setNickname(value);
            setNicknameError(error || ValidationMessages.DEFAULT_NICKNAME);
        },
        [setNickname, setNicknameError]
    );

    const onChangePassword = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateSignUpPassword(value, passwordCheck);
            setPassword(value);
            setPasswordError(error || ValidationMessages.DEFAULT_PASSWORD);
        },
        [setPassword, setPasswordError, passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateSignUpPassword(password, value);
            setPasswordCheck(value);
            setPasswordError(error || ValidationMessages.DEFAULT_PASSWORD);
        },
        [setPasswordCheck, setPasswordError, password]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (idError || passwordError || nicknameError) {
                return;
            }

            if (nickname && id && password && passwordCheck) {
                console.log('서버로 회원가입하기 요청');
                setSignUpError('');
                try {
                    const response = await axios.post('/signup', {
                        id,
                        nickname,
                        password,
                    });
                    console.log(response);
                    setSignupSuccess(ValidationMessages.SIGNUP_SUCCESS);
                } catch (error) {
                    console.log(error);
                    if (axios.isAxiosError(error)) {
                        switch (error.response?.status) {
                            case 400:
                                setSignUpError(
                                    ValidationMessages.SIGNUP_FAILED
                                );
                                break;
                            case 40001:
                                setSignUpError(ValidationMessages.INVALID_FORM);
                                break;
                            case 40002:
                                setSignUpError(ValidationMessages.EXIST_ID);
                                break;
                            case 40401:
                                setSignUpError(ValidationMessages.NO_RESOURCE);
                                break;
                            case 40102:
                                setSignUpError(
                                    ValidationMessages.INVALID_PASSWORD_LENGTH
                                );
                                break;
                            case 50000:
                                setSignUpError(ValidationMessages.SERVER_ERROR);
                                break;
                            default:
                                setSignUpError(
                                    ValidationMessages.UNKNOWN_ERROR
                                );
                                break;
                        }
                    } else {
                        setSignUpError(ValidationMessages.UNKNOWN_ERROR);
                    }
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
