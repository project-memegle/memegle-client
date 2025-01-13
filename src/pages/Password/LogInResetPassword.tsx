import { AxiosError } from 'axios';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import StorageKeyword from 'Constant/StorageKeyword';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SendResetEmailService } from 'services/SendResetEmailService';
import { SubmitButton } from 'components/UI/Buttons';
import { FormProvider, useForm } from 'react-hook-form';

export default function LogInResetEmail() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const emailInputRef = useRef<HTMLInputElement>(null);
    const [isPending, setIsPending] = useState(false);
    const methods = useForm();

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setEmailError('');
            setMessage('');
        },
        []
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (emailError || !email) {
                errorInputCheck(emailInputRef.current);
                return;
            }
            try {
                setIsPending(true);
                await SendResetEmailService(email);
                setSessionStorages({
                    key: StorageKeyword.SENT_RESET_MAIL_SUCCESS,
                    value: StorageKeyword.TRUE,
                });
                navigate('/login');
            } catch (error) {
                handleApiError(error as AxiosError, setMessage);
            } finally {
                setIsPending(false);
            }
        },
        [email, emailError, navigate, t, ValidationMessages]
    );

    return (
        <div className="main__container">
            <FormProvider {...methods}>
                <form className="c-login" onSubmit={onSubmit}>
                    <div className="c-login__section">
                        {emailError ? (
                            <p className="error-message">{emailError}</p>
                        ) : (
                            <p>{ValidationMessages.DEFAULT_EMAIL}</p>
                        )}
                        <section className="c-login__section-email">
                            <div>
                                <label htmlFor="email">이메일</label>
                                <input
                                    autoComplete="on"
                                    ref={emailInputRef}
                                    className="c-login__input"
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder={t('REQUIRED_EMAIL')}
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </div>
                        </section>
                    </div>
                    {message && <p className="message">{message}</p>}
                    <SubmitButton
                        isPending={isPending}
                        text="SEND_PASSWORD_RESET_MAIL"
                    />
                </form>
            </FormProvider>
        </div>
    );
}
