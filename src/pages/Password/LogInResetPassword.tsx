import { AxiosError } from 'axios';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import { ResetPassword } from 'services/PasswordService';
import StorageKeyword from 'Constant/StorageKeyword';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import { ResetPasswordDTO } from 'services/dto/PasswordDto';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function LogInResetPassword() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const location = useLocation();
    const { email, authenticationCode, authenticationType, loginId } =
        location.state || {};

    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (passwordError || !password) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (password && passwordCheck) {
                const userData: ResetPasswordDTO = {
                    loginId: loginId,
                    password: password,
                    email: email,
                    authenticationType: authenticationType,
                    authenticationCode: authenticationCode,
                };
                try {
                    await ResetPassword(userData);
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
        [
            loginId,
            email,
            password,
            passwordCheck,
            passwordError,
            authenticationType,
            navigate,
        ]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    {passwordError ? (
                        <p className="error-message">{passwordError}</p>
                    ) : (
                        <p>{ValidationMessages.DEFAULT_PASSWORD}</p>
                    )}
                    <section className="c-login__section-password">
                        <div>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                autoComplete="on"
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
                    type="submit"
                >
                    {t('CHANGE_PASSWORD')}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
