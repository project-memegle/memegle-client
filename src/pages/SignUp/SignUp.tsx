import { FormEvent, useCallback, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import validateId from 'components/Validations/ValidateId';
import validateNickname from 'components/Validations/ValidateNickname';
import { SignUpDTO } from 'services/dto/SignUpDto';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { signUp } from 'services/SignupService';
import { LogInRequestDTO } from 'services/dto/LogInDto';
import { logIn } from 'services/LogInService';
import { useAuth } from 'components/auth/ProvideAuth';
import { useLocation } from 'react-router-dom';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
    const navigate = useCustomNavigate();
    const auth = useAuth();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();

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

    const idInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId, () =>
            setSignUpError('')
        ),
        []
    );

    const onChangeNickname = useCallback(
        handleInputChange(setNickname, setNicknameError, validateNickname),
        []
    );

    const onChangePassword = useCallback(
        passwordCheckHandler(setPassword, passwordCheck, setPasswordError),
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        passwordCheckHandler(setPasswordCheck, password, setPasswordError),
        [password]
    );

    const onClickVerification = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();

            if (idError) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (nicknameError) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (passwordError) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                try {
                    const userData = {
                        loginId: id,
                        nickname: nickname,
                        password: password,
                    };
                    const response = await signUp(userData);
                    // 회원가입 후 자동 로그인
                    const loginData: LogInRequestDTO = {
                        loginId: id,
                        password: password,
                    };
                    await logIn(loginData);

                    auth.login(() => {
                        navigate('/signup/verification', { state: loginData });
                    });
                } catch (error) {
                    handleApiError(error, setSignUpError);
                }
            }
        },
        [
            id,
            password,
            nickname,
            idError,
            nicknameError,
            passwordError,
            signUpError,
            navigate,
        ]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (idError) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (nicknameError) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (passwordError) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                const userData: SignUpDTO = {
                    loginId: id,
                    nickname: nickname,
                    password: password,
                };
                try {
                    const response = await signUp(userData);
                    // 회원가입 후 자동 로그인
                    const loginData: LogInRequestDTO = {
                        loginId: id,
                        password: password,
                    };
                    await logIn(loginData);

                    setSessionStorages({
                        key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });

                    // 로그인 상태를 업데이트하고 홈 페이지로 리다이렉트
                    auth.login(() => {
                        navigate('/');
                    });
                } catch (error) {
                    handleApiError(error, setSignUpError);
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
                        placeholder={ValidationMessages.REQUIRED_ID}
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
                        placeholder={ValidationMessages.REQUIRED_NICKNAME}
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
                                placeholder={
                                    ValidationMessages.DEFAULT_PASSWORD
                                }
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
                                placeholder={
                                    ValidationMessages.DEFAULT_PASSWORD_CHECK
                                }
                                value={passwordCheck}
                                onChange={onChangePasswordCheck}
                            />
                        </div>
                    </section>
                </div>
                {signUpError && <p className="message">{signUpError}</p>}
                <section className="c-login__button-section">
                    <div className="c-login__button-section-message">
                        <p>{t('VERIFICATION_NOTICE-1')}</p>
                        <p>{t('VERIFICATION_NOTICE-2')}</p>
                        <p>{t('VERIFICATION_NOTICE-3')}</p>
                    </div>
                    <button
                        className="button__rounded button__orange"
                        type="button"
                        onClick={onClickVerification}
                    >
                        {t('VERIFICATION_NAVIGATE_BUTTON')}
                    </button>
                    <button className="button__rounded button__light">
                        {t('DEFAULT_SIGNUP')}
                    </button>
                </section>
            </form>
        </div>
    );
}
