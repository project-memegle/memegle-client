import { FormEvent, useCallback, useRef, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import ValidationMessages from '../../components/Validations/ValidationMessages';
import validateId from '../../components/Validations/ValidateId';
import handleInputChange from 'utils/Event/handleInputChange';
import validateEmail from 'components/Validations/ValidateEmail';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { handleApiError } from 'utils/API/handleApiError';
import { post } from 'utils/API/fetcher';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { findPassword } from 'services/PasswordService';
import { FindPasswordDTO } from 'services/dto/PasswordDto';
export default function FindPassword() {
    const navigate = useCustomNavigate();

    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [idError, setIdError] = useState(DEFAULT_ID);
    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');

    const idInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const onChangeId = useCallback(
        handleInputChange(setId, setIdError, validateId),
        []
    );

    const onChangeEmail = useCallback(
        handleInputChange(setEmail, setEmailError, validateEmail),
        []
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            if (idError || emailError) {
                if (idError) errorInputCheck(idInputRef.current);
                else if (emailError) errorInputCheck(emailInputRef.current);
                return;
            }
            if (id && email) {
                setMessage('');
                findPassword({ id, email } as FindPasswordDTO);
            }
        },
        [id, email]
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
                    <p>{emailError ? emailError : DEFAULT_EMAIL}</p>
                    <label htmlFor="email">이메일</label>
                    <input
                        ref={emailInputRef}
                        className="c-login__input"
                        name="email"
                        id="email"
                        type="text"
                        placeholder={ValidationMessages.REQUIRED_EMAIL}
                        value={email}
                        onChange={onChangeEmail}
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
                        <p>
                            본인 인증을 하지 않았다면 비밀번호를 찾을 수 없어요
                        </p>
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
