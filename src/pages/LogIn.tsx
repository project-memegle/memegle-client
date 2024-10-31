import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateId from '../components/Validations/ValidateId';
import validateLogInPassword from '../components/Validations/ValidateLogInPassword';
import { useNavigate } from 'react-router-dom';
import { LogInDTO } from '../services/dto/LogInDto';
import { handleApiError } from '../utils/handleApiError';
import { getCookie, setCookie } from '../utils/cookies';

export default function LogIn() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [idError, setIdError] = useState(ValidationMessages.DEFAULT_ID);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const onChangeId = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateId(value);
            setId(value);
            setIdError(error);
        },
        [setId, setIdError]
    );

    const onChangePassword = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateLogInPassword(value);
            setPassword(value);
            setPasswordError(error);
        },
        [setPassword, setPasswordError]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!id) {
                setIdError(ValidationMessages.REQUIRED_ID);
                return;
            }
            if (!password) {
                setPasswordError(ValidationMessages.REQUIRED_PASSWORD);
                return;
            }

            if (id && password) {
                setIdError('');
                setPasswordError('');
                const userData: LogInDTO = {
                    loginId: id,
                    password: password,
                };
                try {
                    alert(ValidationMessages.LOGIN_SUCCESS);
                    const response = await axios.post('/login', userData);
                    console.log(response);

                    // 서버로부터 access_token과 refresh_token을 받아옴
                    const {
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    } = response.data;

                    const getEnvVariableAsNumber = (
                        envVar: string | undefined,
                        varName: string
                    ): number => {
                        const value = Number(envVar);
                        if (isNaN(value)) {
                            throw new Error(`Invalid ${varName} value`);
                        }
                        return value;
                    };

                    const accessTokenStore = getEnvVariableAsNumber(
                        process.env.ACCESS_TOKEN_STORE,
                        'ACCESS_TOKEN_STORE'
                    );
                    const refreshTokenStore = getEnvVariableAsNumber(
                        process.env.REFRESH_TOKEN_STORE,
                        'REFRESH_TOKEN_STORE'
                    );

                    // Set cookies
                    setCookie('access_token', accessToken, accessTokenStore);
                    setCookie('refresh_token', refreshToken, refreshTokenStore);

                    // 쿠키에서 저장한 토큰들 가져오기
                    const savedAccessToken = getCookie('access_token');
                    const savedRefreshToken = getCookie('refresh_token');
                    console.log('Access Token:', savedAccessToken);
                    console.log('Refresh Token:', savedRefreshToken);
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [id, password]
    );

    function findId() {
        navigate('/findid');
    }

    function findPassword() {
        navigate('/findpassword');
    }
    function navigateToSignUp() {
        navigate('/signup');
    }

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
                        placeholder="아이디를 입력해주세요"
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
                <div className="c-login__section">
                    <p>{passwordError ? passwordError : DEFAULT_PASSWORD}</p>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        className="c-login__input"
                        name="password"
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                {message && <p className="c-login__message">{message}</p>}
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__light"
                        type="submit"
                    >
                        로그인
                    </button>
                    <button
                        onClick={navigateToSignUp}
                        className="button__rounded button__light"
                        type="submit"
                    >
                        회원가입
                    </button>
                    <section className="c-login__button-section-bottom">
                        <button className="button__light-font" onClick={findId}>
                            아이디 찾기
                        </button>
                        <button
                            className="button__light-font"
                            onClick={findPassword}
                        >
                            비밀번호 찾기
                        </button>
                    </section>
                </section>
            </form>
        </div>
    );
}
