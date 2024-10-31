import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import validateId from '../components/Validations/ValidateId';
import { handleApiError } from 'utils/handleApiError';
import { useNavigate } from 'react-router-dom';
export default function FindId() {
    const [id, setId] = useState('');
    const [idError, setIdError] = useState(ValidationMessages.DEFAULT_NICKNAME);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
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
                    handleApiError(error as AxiosError, setMessage);
                });
        },
        [id, setMessage]
    );

    function findPassword() {
        navigate('/findpassword');
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
                        placeholder={ValidationMessages.REQUIRED_NICKNAME}
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
                            본인인증
                        </button>{' '}
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
