import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useNavigateHandler from '../hooks/useNavigateHandler';
import ValidationMessages from '../components/UI/Validations/ValidationMessages';
import validateId from '../components/UI/Validations/ValidateId';
import validateLogInPassword from '../components/UI/Validations/ValidateLogInPassword';

export default function LogIn() {
    const navigate = useNavigateHandler();

    const [id, setId] = useState('');
    const [idError, setIdError] = useState(ValidationMessages.REQUIRED_ID);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(
        ValidationMessages.REQUIRED_PASSWORD
    );
    const [message, setMessage] = useState('');

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
            setIdError(error);
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
                    setMessage(response.data.message); // Assuming the success message is in response.data.message
                })
                .catch((error) => {
                    console.log(error);
                    setMessage(error.response?.data?.message); // Assuming the error message is in error.response.data.message
                });
        },
        [id, password]
    );

    function findId() {
        navigate('/findid');
    }

    function findPassword() {
        navigate('/findpassword');
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    {idError && <p>{idError}</p>}
                    <label htmlFor="id"></label>
                    <input
                        name="id"
                        id="id"
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={onChangeId}
                    />
                </div>
                <div>
                    {passwordError && <p>{passwordError}</p>}
                    <label htmlFor="password"></label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <button className="login__button" type="submit">
                    로그인
                </button>
            </form>
            {message && <p>{message}</p>}
            <section>
                <button onClick={findId}>아이디 찾기</button>
                <button onClick={findPassword}>비밀번호 찾기</button>
            </section>
        </>
    );
}
