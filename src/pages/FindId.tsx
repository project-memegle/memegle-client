import { FormEvent, useCallback, useRef, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import { useNavigate } from 'react-router-dom';
import handleInputChange from 'utils/Event/handleInputChange';
import validateNickname from 'components/Validations/ValidateNickname';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { post } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
export default function FindId() {
    const navigate = useCustomNavigate();

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;

    const [id, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState(DEFAULT_ID);
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
            if (id) {
                setMessage('');
                post('/find/id', {
                    id,
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
        [id]
    );

    function findPassword() {
        navigate('/findpassword');
    }

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{nicknameError ? nicknameError : DEFAULT_ID}</p>
                    <label htmlFor="id">아이디</label>
                    <input
                        ref={nicknameInputRef}
                        className="c-login__input"
                        name="id"
                        id="id"
                        type="text"
                        placeholder={ValidationMessages.REQUIRED_ID}
                        value={id}
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
                        <p>본인 인증을 하지 않았다면 아이디를 찾을 수 없어요</p>
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/verification')}
                        >
                            본인인증 하러가기
                        </button>
                    </section>
                </section>
            </form>
        </div>
    );
}
