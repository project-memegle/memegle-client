import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import useNavigateHandler from '../hooks/useNavigateHandler';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateId from '../components/Validations/ValidateId';
import validateLogInPassword from '../components/Validations/ValidateLogInPassword';

export default function LogIn() {
    const navigate = useNavigateHandler();

    const DEFAULT_ID = '아이디';
    const DEFAULT_PASSWORD = '비밀번호';

    const [id, setId] = useState('');
    const [idError, setIdError] = useState(DEFAULT_ID);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(DEFAULT_PASSWORD);
    const [message, setMessage] = useState('');
    const onChangeId = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateId(value);
            setId(value);
            setIdError(error || DEFAULT_ID);
        },
        [setId, setIdError]
    );

    const onChangePassword = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateLogInPassword(value);
            setPassword(value);
            setPasswordError(error || DEFAULT_PASSWORD);
        },
        [setPassword, setPasswordError]
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            setMessage('');
            axios
                .post('/login', {
                    id,
                    password,
                })
                .then((response: AxiosResponse) => {
                    console.log('response :', response);
                    setMessage(response.data.message);
                })
                .catch((error: AxiosError) => {
                    console.log(error.response);
                    if (axios.isAxiosError(error)) {
                        switch (error.response?.status) {
                            case 40000:
                                setMessage(ValidationMessages.LOGIN_FAILED);
                                break;
                            case 40001:
                                setMessage(ValidationMessages.INVALID_FORM);
                                break;
                            case 50000:
                                setMessage(ValidationMessages.SERVER_ERROR);
                                break;
                            default:
                                setMessage(ValidationMessages.UNKNOWN_ERROR);
                                break;
                        }
                    } else {
                        setMessage(ValidationMessages.UNKNOWN_ERROR);
                    }
                });
        },
        [id, password, setMessage]
    );

    function findId() {
        navigate('/findid');
    }

    function findPassword() {
        navigate('/findpassword');
    }

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{idError}</p>
                    <label htmlFor="id"></label>
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
                    <p>{passwordError}</p>
                    <label htmlFor="password"></label>
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
                {message && <p>{message}</p>}
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__light"
                        type="submit"
                    >
                        로그인
                    </button>
                    <button
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
