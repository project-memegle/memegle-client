import { FormEvent, useCallback, useRef, useState } from 'react';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { signUp } from 'services/SignupService';
import { logIn } from 'services/LogInService';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';
import { useTranslation } from 'react-i18next';
import { InputField } from 'components/UI/InputField';
import AuthButton from 'components/auth/Button';
import SuccessMessage from 'components/UI/FontMessages/SuccessMessage';
import ErrorMessage from 'components/UI/FontMessages/ErrorMessage';
import { useAuth } from 'components/auth/ProvideAuth';
import getValidationMessages from 'components/Validations/ValidationMessages';
import validateEmail from 'components/Validations/ValidateEmail';
import { UserInfoDTO } from 'services/dto/UserInfoDto';
import { FormProvider, useForm } from 'react-hook-form';
import { SubmitButton } from 'components/UI/Buttons';

export default function SignUp() {
    const navigate = useCustomNavigate();
    const auth = useAuth();
    const ValidationMessages = getValidationMessages();
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;
    // ---------------------email----------------------------
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [email, setemail] = useState<string>('');
    const [emailErrorMessage, setemailErrorMessage] = useState<string>('');
    const [emailSuccessMessage, setemailSuccessMessage] = useState<string>('');
    const [isEmailDupliacted, setisEmailDupliacted] = useState<boolean>(false);
    const [isemailChecked, setIsemailChecked] = useState<boolean>(false);

    // ---------------------PASSWORD----------------------
    const [passwordError, setPasswordError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    // ---------------------SIGNUP-------------------------
    const [signUpError, setSignUpError] = useState<string>('');
    const [isPending, setIsPending] = useState(false);
    const methods = useForm();

    const onChangeEmail = useCallback(
        handleInputChange(setemail, setemailErrorMessage, validateEmail, () => {
            setSignUpError('');
            setemailSuccessMessage('');
            setisEmailDupliacted(false);
            setIsemailChecked(false);
        }),
        []
    );

    const onChangePassword = useCallback(
        passwordCheckHandler(setPassword, passwordCheck, setPasswordError),
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        passwordCheckHandler(setPasswordCheck, password, setPasswordError),
        [password]
    );

    const onSignUpSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!email) {
                errorInputCheck(emailInputRef.current);
                return;
            }

            if (emailErrorMessage) {
                errorInputCheck(emailInputRef.current);
                return;
            }

            if (passwordError || !password) {
                errorInputCheck(passwordInputRef.current);
                return;
            }
            if (email && password && passwordCheck) {
                const userData: UserInfoDTO = {
                    email: email,
                    password: password,
                };
                try {
                    setIsPending(true);
                    await signUp(userData);
                    setSessionStorages({
                        key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });
                    try {
                        await logIn(userData);
                        auth.login(() => {
                            navigate('/');
                        });
                    } catch (loginError) {
                        if (loginError instanceof Error) {
                            console.error(loginError.message);
                            setSignUpError(loginError.message);
                        } else {
                            setSignUpError(ValidationMessages.UNKNOWN_ERROR);
                        }
                    }
                } catch (signUpError) {
                    if (signUpError instanceof Error) {
                        console.error(signUpError.message);
                        setSignUpError(signUpError.message);
                    } else {
                        setSignUpError(ValidationMessages.UNKNOWN_ERROR);
                    }
                } finally {
                    setIsPending(false);
                }
            }
        },
        [
            email,
            password,
            passwordCheck,
            emailErrorMessage,
            passwordError,
            signUpError,
        ]
    );

    return (
        <div className="main__container">
            <FormProvider {...methods}>
                <form className="c-login" onSubmit={onSignUpSubmit}>
                    <div className="c-login__section">
                        <ErrorMessage message={emailErrorMessage} />
                        <SuccessMessage message={emailSuccessMessage} />
                        {!emailErrorMessage && !emailSuccessMessage && (
                            <p>{DEFAULT_EMAIL}</p>
                        )}
                        <section className="c-login__section-verification">
                            <InputField
                                label="이메일"
                                type="text"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder={ValidationMessages.REQUIRED_EMAIL}
                                ref={emailInputRef}
                                isDuplicated={isEmailDupliacted}
                                isChecked={isemailChecked}
                                className={`c-login__input ${
                                    isemailChecked
                                        ? isEmailDupliacted
                                            ? 'fail'
                                            : 'success'
                                        : ''
                                }`}
                            />
                        </section>
                    </div>
                    <div className="c-login__section">
                        <ErrorMessage message={passwordError} />
                        {!passwordError && <p>{DEFAULT_PASSWORD}</p>}
                        <section className="c-login__section-password">
                            <InputField
                                label="비밀번호"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                placeholder={
                                    ValidationMessages.DEFAULT_PASSWORD
                                }
                                ref={passwordInputRef}
                                className="c-login__input"
                            />
                            <InputField
                                label="비밀번호 확인"
                                type="password"
                                name="password-check"
                                value={passwordCheck}
                                onChange={onChangePasswordCheck}
                                placeholder={
                                    ValidationMessages.DEFAULT_PASSWORD_CHECK
                                }
                                ref={passwordCheckInputRef}
                                className="c-login__input"
                            />
                        </section>
                    </div>
                    {signUpError && (
                        <p className="message font-warning">{signUpError}</p>
                    )}
                    <section className="c-login__button-section">
                        <SubmitButton
                            isPending={isPending}
                            text="DEFAULT_SIGNUP"
                        />
                    </section>
                </form>
            </FormProvider>
        </div>
    );
}
