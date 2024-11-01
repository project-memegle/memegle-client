import { FormEvent, useCallback, useRef, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import { useNavigate } from 'react-router-dom';
import handleInputChange from 'utils/Event/handleInputChange';
import validateNickname from 'components/Validations/ValidateNickname';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
export default function FindId() {
    const navigate = useNavigate();

    const DEFAULT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;

    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState(DEFAULT_NICKNAME);
    const [message, setMessage] = useState('');

    const nicknameInputRef = useRef<HTMLInputElement>(null);

    const onChangeNickname = useCallback(
        handleInputChange(setNickname, setNicknameError, validateNickname),
        []
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            if (nicknameError) {
                errorInputCheck(nicknameInputRef.current);
            }
            if (nickname) {
                setMessage('');
                post('/find/id', {
                    nickname,
                })
                    .then((response: AxiosResponse) => {
                        console.log('response :', response);
                        setMessage(response.data.message);
                    })
                    .catch((error: AxiosError) => {
                        console.log(error.response);
                        handleApiError(error as AxiosError, setMessage);
                    });
            }
        },
        [nickname]
    );

    function findPassword() {
        navigate('/findpassword');
    }

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{nicknameError ? nicknameError : DEFAULT_NICKNAME}</p>
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
