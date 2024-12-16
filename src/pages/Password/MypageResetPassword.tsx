import { AxiosError } from 'axios';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import StorageKeyword from 'Constant/StorageKeyword';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import { ResetPasswordDTO } from 'services/dto/PasswordDto';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ResetPassword } from 'services/PasswordService';

export default function MypageResetPassword() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const location = useLocation();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    const { email, authenticationCode, authenticationType, loginId } =
        location.state || {};

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
        }
    }, []);

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
                    {passwordError ? (
                        <p className="error-message">{passwordError}</p>
                    ) : (
                        <p>{DEFAULT_PASSWORD}</p>
                    )}
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
                                placeholder={t('DEFAULT_NEW_PASSWORD_CHECK')}
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
