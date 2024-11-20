import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateId from '../components/Validations/ValidateId';
import validateLogInPassword from '../components/Validations/ValidateLogInPassword';
import { LogInRequestDTO, LogInResponseDTO } from '../services/dto/LogInDto';
import { setCookie } from '../utils/Storage/cookies';
import handleInputChange from '../utils/Event/handleInputChange';
import { errorInputCheck } from '../utils/Event/errorInputCheck';
import { getEnvVariableAsNumber } from 'utils/Storage/numberUntils';
import { resetErrors } from 'utils/Event/resetError';
import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useAuth } from 'components/auth/ProvideAuth';
import { logIn } from 'services/LogInService';
import { getUserInfo } from 'services/UserInfoService';
import StorageKeyword from 'Constant/StorageKeyword';
import {
    deleteSessionStorage,
    getSessionStorages,
} from 'utils/Storage/sessionStorage';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';

export default function LogIn() {
    const navigate = useCustomNavigate();
    const auth = useAuth();

    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;
    const [idError, setIdError] = useState(DEFAULT_ID);
    const [passwordError, setPasswordError] = useState(DEFAULT_PASSWORD);

    const [id, setId] = useState('testloginid3');
    const [password, setPassword] = useState('qwerQ!1234');
    const [message, setMessage] = useState('');

    const idInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId),
        []
    );

    const onChangePassword = useCallback(
        handleInputChange(setPassword, setPasswordError, validateLogInPassword),
        []
    );

    useEffect(() => {
        if (id && password) {
            resetErrors(setIdError, setPasswordError);
        }
    }, []);

    useEffect(() => {
        const sessionStoragePassword = getSessionStorages(
            StorageKeyword.CHANGE_PASSWORD_SUCCESS
        );

        if (
            sessionStoragePassword &&
            sessionStoragePassword === StorageKeyword.TRUE
        ) {
            setToastMessage(ValidationMessages.CHANGE_PASSWORD_SUCCESS);
            setToast(true);
            deleteSessionStorage(StorageKeyword.CHANGE_PASSWORD_SUCCESS);
        }
    }, []);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (idError) {
                errorInputCheck(idInputRef.current);
                return;
            }

            if (passwordError) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (id && password) {
                resetErrors(setIdError, setPasswordError);
                const userData: LogInRequestDTO = {
                    loginId: id,
                    password: password,
                };

                try {
                    await logIn(userData);
                    const userInfo = await getUserInfo();
                    if (userInfo) {
                        auth.login(() => {
                            navigate('/');
                        });
                    } else {
                        setMessage(ValidationMessages.GET_USER_INFO_FAIL);
                    }
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [id, password, idError, passwordError, auth, navigate]
    );
    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{idError ? idError : DEFAULT_ID}</p>
                    <label htmlFor="id">{DEFAULT_ID}</label>
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
                    <p>{passwordError ? passwordError : DEFAULT_PASSWORD}</p>
                    <label htmlFor="password">{DEFAULT_PASSWORD}</label>
                    <input
                        ref={passwordInputRef}
                        className="c-login__input"
                        name="password"
                        type="password"
                        id="password"
                        placeholder={ValidationMessages.REQUIRED_PASSWORD}
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                {message && <p className="c-login__message">{message}</p>}
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__orange"
                        type="submit"
                    >
                        로그인
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="button__rounded button__light"
                        type="submit"
                    >
                        회원가입
                    </button>
                    <section className="c-login__button-section-bottom">
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/id/verification')}
                        >
                            아이디 찾기
                        </button>
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/find/password')}
                        >
                            비밀번호 찾기
                        </button>
                    </section>
                </section>
            </form>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </div>
    );
}
