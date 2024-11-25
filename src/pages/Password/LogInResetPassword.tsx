import { AxiosError } from 'axios';
import ValidationMessages from 'components/Validations/ValidationMessages';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import { loginResetPassword } from 'services/PasswordService';
import StorageKeyword from 'Constant/StorageKeyword';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import { LogInResetPassworddDTO } from 'services/dto/PasswordDto';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';

export default function LogInResetPassword() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
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
                const userData: LogInResetPassworddDTO = {
                    id: id,
                    password: password,
                    email: email,
                    verificationType: '비밀번호 찾기',
                };

                try {
                    await loginResetPassword(userData);
                    setMessage(ValidationMessages.CHANGE_PASSWORD_SUCCESS);
                    setSessionStorages({
                        key: StorageKeyword.CHANGE_PASSWORD_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });
                    navigate('/login');
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
                                placeholder={t('DEFAULT_NEW_PASSWORD')}
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
                                placeholder={t('DEFAULT_NEW_PASSWORD')}
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
                    {t('CHANGE_PASSWORD')}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
