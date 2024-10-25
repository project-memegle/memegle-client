import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateId from '../components/Validations/ValidateId';
import validateLogInPassword from '../components/Validations/ValidateLogInPassword';
export default function FindPassword() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [idError, setIdError] = useState(ValidationMessages.DEFAULT_ID);
    const [emailError, setEmailError] = useState(
        ValidationMessages.DEFAULT_EMAIL
    );
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
    const onChangeEmail = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const error = validateId(value);
            setId(value);
            setIdError(error || ValidationMessages.DEFAULT_EMAIL);
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
                        placeholder="아이디를 입력해주세요"
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
                <div className="c-login__section">
                    <p>{emailError}</p>
                    <label htmlFor="id">이메일</label>
                    <input
                        className="c-login__input"
                        name="id"
                        id="id"
                        type="text"
                        placeholder="이메일을 입력해주세요"
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
                        비밀번호 찾기
                    </button>
                    <section className="c-login__button-section-bottom">
                        <button className="button__light-font" onClick={findId}>
                            아이디 찾기
                        </button>
                    </section>
                </section>
            </form>
        </div>
    );
}
