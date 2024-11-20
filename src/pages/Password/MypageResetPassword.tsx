import { AxiosError } from 'axios';
import ValidationMessages from 'components/Validations/ValidationMessages';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import { mypageResetPassword } from 'services/PasswordService';
import StorageKeyword from 'Constant/StorageKeyword';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import { MypageResetPassworddDTO } from 'services/dto/PasswordDto';

export default function MypageResetPassword() {
    const navigate = useCustomNavigate();

    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(DEFAULT_PASSWORD);

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    const onChangePassword = useCallback(
        passwordCheckHandler(setPassword, passwordCheck, setPasswordError, () =>
            setMessage('')
        ),
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        passwordCheckHandler(setPasswordCheck, password, setPasswordError, () =>
            setMessage('')
        ),
        [password]
    );

    useEffect(() => {
        const id = sessionStorage.getItem(StorageKeyword.USER_ID);
        const email = sessionStorage.getItem(StorageKeyword.USER_EMAIL);
        if (id && email) {
            setId(id);
            setEmail(email);
        }
    }, []);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (passwordError) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (password && passwordCheck) {
                const userData: MypageResetPassworddDTO = {
                    id: id,
                    password: password,
                    email: email,
                    verificationType: '비밀번호 변경',
                };

                try {
                    await mypageResetPassword(userData);
                    setMessage(ValidationMessages.CHANGE_PASSWORD_SUCCESS);
                    setSessionStorages({
                        key: StorageKeyword.CHANGE_PASSWORD_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });
                    navigate('/mypage');
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [id, email, password, passwordCheck, passwordError, navigate]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{passwordError ? passwordError : DEFAULT_PASSWORD}</p>
                    <section className="c-login__section-password">
                        <div>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                ref={passwordInputRef}
                                className="c-login__input"
                                name="password"
                                type="password"
                                id="password"
                                placeholder="새로운 비밀번호"
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-check">
                                비밀번호 확인
                            </label>
                            <input
                                ref={passwordCheckInputRef}
                                className="c-login__input"
                                name="password-check"
                                type="password"
                                id="password-check"
                                placeholder="새로운 비밀번호 확인"
                                value={passwordCheck}
                                onChange={onChangePasswordCheck}
                            />
                        </div>
                    </section>
                </div>
                <button
                    className="button__rounded button__orange"
                    type="submit" // Ensure this button submits the form
                >
                    비밀번호 재설정
                </button>
            </form>
            {message && <p className='message'>{message}</p>}
        </div>
    );
}
