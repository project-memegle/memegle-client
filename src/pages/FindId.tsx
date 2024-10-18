import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import useNavigateHandler from '../hooks/useNavigateHandler';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateId from '../components/Validations/ValidateId';
import validateLogInPassword from '../components/Validations/ValidateLogInPassword';
export default function FindId() {
    const navigate = useNavigateHandler();

    const [id, setId] = useState('');
    const [idError, setIdError] = useState(ValidationMessages.DEFAULT_NICKNAME);
    const [message, setMessage] = useState('');
    const onChangeId = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateId(value);
            setId(value);
            setIdError(error || ValidationMessages.DEFAULT_ID);
        },
        [setId, setIdError]
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            setMessage('');
            axios
                .post('/login', {
                    id,
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
        [id, setMessage]
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
                    <p>{idError}</p>
                    <label htmlFor="id">닉네임</label>
                    <input
                        className="c-login__input"
                        name="id"
                        id="id"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
                {message && <p>{message}</p>}
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__light"
                        type="submit"
                    >
                        아이디 찾기
                    </button>
                    <section className="c-login__button-section-bottom">
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
