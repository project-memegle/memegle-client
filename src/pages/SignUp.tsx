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
    const [idError, setIdError] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFALUT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const handleInputChange = (
        valueSetter: React.Dispatch<React.SetStateAction<string>>,
        errorSetter: React.Dispatch<React.SetStateAction<string>>,
        validator: (value: string) => string
    ) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/\s/g, '');
            const error = validator(value);
            setSignupSuccess('');
            valueSetter(value);
            errorSetter(error);
        };
    };

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId),
        []
    );

    const onChangeNickname = useCallback(
        handleInputChange(setNickname, setNicknameError, validateNickname),
        []
    );
    const onChangePassword = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/\s/g, '');
            setPassword(value);

            const error = validateSignUpPassword(value, passwordCheck);
            setPasswordError(error);

            console.log('password:', value, 'passwordError:', error);
        },
        [passwordCheck]
    );
    const onChangePasswordCheck = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/\s/g, '');
            setPasswordCheck(value);

            const error = validateSignUpPassword(password, value);
            setPasswordError(error);

            console.log('password check:', value, 'passwordError:', error);
        },
        [password]
    );
    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (idError || passwordError || nicknameError) {
                signUpError && setSignUpError(ValidationMessages.SIGNUP_ERROR);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                setSignUpError('');
                const userData: SignUpDTO = {
                    loginId: id,
                    nickname: nickname,
                    password: password,
                };
                setSignupSuccess(ValidationMessages.SIGNUP_SUCCESS);
                try {
                    const response = await axios.post('/signup', userData);
                    console.log(response);
                } catch (error) {
                    handleApiError(error as AxiosError, setSignUpError);
                }
            }
        },
        [id, nickname, password, passwordCheck]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{idError ? idError : DEFAULT_ID}</p>
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
                    <p>{nicknameError ? nicknameError : DEFALUT_NICKNAME}</p>
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
                    <p>{passwordError ? passwordError : DEFAULT_PASSWORD}</p>
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
