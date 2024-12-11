import { FormEvent, useCallback, useRef, useState } from 'react';
import validateId from 'components/Validations/ValidateId';
import validateNickname from 'components/Validations/ValidateNickname';
import { SignUpDTO } from 'services/dto/SignUpDto';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';
import passwordCheckHandler from 'utils/SignUp/passwordCheckHandler';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { signUp } from 'services/SignupService';
import { LogInRequestDTO } from 'services/dto/LogInDto';
import { logIn } from 'services/LogInService';
import { useAuth } from 'components/auth/ProvideAuth';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import { checkNickname } from 'services/NicknameService';
import { checkId } from 'services/IdService';
import { InputField } from 'components/UI/InputField';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) =>
    message && <p className="error-message">{message}</p>;

interface SuccessMessageProps {
    message: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) =>
    message && <p className="success-message">{message}</p>;

interface ButtonProps {
    className: string;
    type: 'button' | 'submit';
    onClick?: (e: FormEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const Button = ({ className, type, onClick, children }: ButtonProps) => (
    <button className={className} type={type} onClick={onClick}>
        {children}
    </button>
);

export default function SignUp() {
    const navigate = useCustomNavigate();
    const auth = useAuth();
    const { t } = useTranslation();
    const ValidationMessages = getValidationMessages();
    const DEFAULT_ID = ValidationMessages.DEFAULT_ID;
    const DEFAULT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;
    const DEFAULT_PASSWORD = ValidationMessages.DEFAULT_PASSWORD;
    // ---------------------ID----------------------------
    const idInputRef = useRef<HTMLInputElement>(null);
    const [id, setId] = useState<string>('');
    const [idErrorMessage, setIdErrorMessage] = useState<string>('');
    const [idSuccessMessage, setIdSuccessMessage] = useState<string>('');
    const [isIdDupliacted, setIsIdDupliacted] = useState<boolean>(false);
    const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
    // ---------------------NICKNAME----------------------
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const [nickname, setNickname] = useState<string>('');
    const [nicknameErrorMessage, setNicknameErrorMessage] =
        useState<string>('');
    const [nicknameSuccessMessage, setNicknameSuccessMessage] =
        useState<string>('');
    const [isNicknameDupliacted, setIsNicknameDupliacted] =
        useState<boolean>(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);

    // ---------------------PASSWORD----------------------
    const [passwordError, setPasswordError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordCheckInputRef = useRef<HTMLInputElement>(null);

    // ---------------------SIGNUP-------------------------
    const [signUpError, setSignUpError] = useState<string>('');

    const onChangeId = useCallback(
        handleInputChange(setId, setIdErrorMessage, validateId, () => {
            setSignUpError('');
            setIdSuccessMessage('');
            setIsIdDupliacted(false);
            setIsIdChecked(false);
        }),
        []
    );

    const onSubmitCheckId = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setSignUpError('');
            // 입력 값 유효성 검사
            if (idErrorMessage || !id) {
                errorInputCheck(idInputRef.current);
                setIdErrorMessage(ValidationMessages.REQUIRED_ID);
                setIdSuccessMessage('');
                return;
            }

            try {
                const response = await checkId({ loginId: id });
                setIsIdChecked(true);
                setIdErrorMessage('');
                setIdSuccessMessage('');

                if (response) {
                    setIdSuccessMessage(ValidationMessages.CHECK_ID_SUCCESS);
                    setIsIdDupliacted(false);
                    return;
                }
            } catch (error) {
                if (error === 40002) {
                    setIdErrorMessage(ValidationMessages.EXIST_NICKNAME);
                    return;
                }
                setNicknameErrorMessage(
                    ValidationMessages.ERROR_CHECK_NICKNAME
                );
                return;
            }
        },
        [id, idErrorMessage]
    );

    const onChangeNickname = useCallback(
        handleInputChange(
            setNickname,
            setNicknameErrorMessage,
            validateNickname,
            () => {
                setSignUpError('');
                setNicknameSuccessMessage('');
                setIsNicknameChecked(false);
                setIsNicknameDupliacted(false);
            }
        ),
        []
    );

    const onSubmitCheckNickname = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setSignUpError('');

            // 입력 값 유효성 검사
            if (nicknameErrorMessage || !nickname) {
                errorInputCheck(nicknameInputRef.current);
                setNicknameErrorMessage(ValidationMessages.REQUIRED_NICKNAME);
                setNicknameSuccessMessage('');
                return;
            }

            try {
                const response = await checkNickname({ nickname });
                setIsNicknameChecked(true);
                setNicknameErrorMessage('');
                setNicknameSuccessMessage('');

                // 닉네임 중복 처리
                if (response) {
                    setNicknameSuccessMessage(
                        ValidationMessages.CHECK_NICKNAME_SUCCESS
                    );
                    setIsNicknameDupliacted(false);
                    return;
                }
            } catch (error) {
                if (error === 40004) {
                    setNicknameErrorMessage(ValidationMessages.EXIST_NICKNAME);
                    return;
                }
                setNicknameErrorMessage(
                    ValidationMessages.ERROR_CHECK_NICKNAME
                );
                return;
            }
        },
        [nickname, nicknameErrorMessage]
    );

    const onChangePassword = useCallback(
        passwordCheckHandler(setPassword, passwordCheck, setPasswordError),
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        passwordCheckHandler(setPasswordCheck, password, setPasswordError),
        [password]
    );

    const onClickVerification = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (!id) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (!isIdChecked) {
                setSignUpError(ValidationMessages.REQUIRED_CHECK_ID);
                return;
            }

            if (!nickname) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (!isNicknameChecked) {
                setSignUpError(ValidationMessages.REQUIRED_CHECK_NICKNAME);
                return;
            }
            if (idErrorMessage) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (nicknameErrorMessage) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (passwordError || !password) {
                errorInputCheck(passwordInputRef.current);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                try {
                    const userData = {
                        loginId: id,
                        nickname: nickname,
                        password: password,
                    };
                    const response = await signUp(userData);
                    // 회원가입 후 자동 로그인
                    const loginData: LogInRequestDTO = {
                        loginId: id,
                        password: password,
                    };
                    await logIn(loginData);

                    auth.login(() => {
                        navigate('/signup/verification', { state: loginData });
                    });
                } catch (error: unknown) {
                    if (error === 40002) {
                        setSignUpError(ValidationMessages.EXIST_USER);
                        return;
                    }
                    setSignUpError(ValidationMessages.UNKNOWN_ERROR);
                }
            }
        },
        [
            id,
            password,
            nickname,
            idErrorMessage,
            nicknameErrorMessage,
            passwordError,
            signUpError,
            navigate,
        ]
    );

    const onSignUpSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!id) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (!isIdChecked) {
                setSignUpError(ValidationMessages.REQUIRED_CHECK_ID);
                return;
            }

            if (!nickname) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (!isNicknameChecked) {
                setSignUpError(ValidationMessages.REQUIRED_CHECK_NICKNAME);
                return;
            }
            if (idErrorMessage) {
                errorInputCheck(idInputRef.current);
                return;
            }
            if (nicknameErrorMessage) {
                errorInputCheck(nicknameInputRef.current);
                return;
            }
            if (passwordError || !password) {
                errorInputCheck(passwordInputRef.current);
                return;
            }
            if (nickname && id && password && passwordCheck) {
                const userData: SignUpDTO = {
                    loginId: id,
                    nickname: nickname,
                    password: password,
                };
                try {
                    await signUp(userData);
                    // 회원가입 후 자동 로그인
                    const loginData: LogInRequestDTO = {
                        loginId: id,
                        password: password,
                    };
                    await logIn(loginData);

                    setSessionStorages({
                        key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });

                    // 로그인 상태를 업데이트하고 홈 페이지로 리다이렉트
                    auth.login(() => {
                        navigate('/');
                    });
                } catch (error: unknown) {
                    if (error === 40002) {
                        setSignUpError(ValidationMessages.EXIST_USER);
                        return;
                    }
                    setSignUpError(ValidationMessages.UNKNOWN_ERROR);
                }
            }
        },
        [
            id,
            nickname,
            password,
            passwordCheck,
            idErrorMessage,
            passwordError,
            nicknameErrorMessage,
            signUpError,
        ]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSignUpSubmit}>
                <div className="c-login__section">
                    <ErrorMessage message={idErrorMessage} />
                    <SuccessMessage message={idSuccessMessage} />
                    {!idErrorMessage && !idSuccessMessage && (
                        <p>{DEFAULT_ID}</p>
                    )}
                    <section className="c-login__section-verification">
                        <InputField
                            label="아이디"
                            type="text"
                            name="id"
                            value={id}
                            onChange={onChangeId}
                            placeholder={ValidationMessages.REQUIRED_ID}
                            ref={nicknameInputRef}
                            isDuplicated={isIdDupliacted}
                            isChecked={isIdChecked}
                            className={`c-login__input ${
                                isIdChecked
                                    ? isIdDupliacted
                                        ? 'fail'
                                        : 'success'
                                    : ''
                            }`}
                        />
                        <Button
                            className="button__rounded button__light"
                            type="button"
                            onClick={onSubmitCheckId}
                        >
                            {t('CHECK_DUPLICATED')}
                        </Button>
                    </section>
                </div>
                <div className="c-login__section">
                    <ErrorMessage message={nicknameErrorMessage} />
                    <SuccessMessage message={nicknameSuccessMessage} />
                    {!nicknameErrorMessage && !nicknameSuccessMessage && (
                        <p>{DEFAULT_NICKNAME}</p>
                    )}
                    <section className="c-login__section-verification">
                        <InputField
                            label="닉네임"
                            type="text"
                            name="nickname"
                            value={nickname}
                            onChange={onChangeNickname}
                            placeholder={t('REQUIRED_NICKNAME')}
                            ref={nicknameInputRef}
                            isDuplicated={isNicknameDupliacted}
                            isChecked={isNicknameChecked}
                            className={`c-login__input ${
                                isNicknameChecked
                                    ? isNicknameDupliacted
                                        ? 'fail'
                                        : 'success'
                                    : ''
                            }`}
                        />
                        {isNicknameChecked &&
                            (isNicknameDupliacted ? (
                                <i className="c-icon c-icon--fill-fail">
                                    close
                                </i>
                            ) : (
                                <i className="c-icon c-icon--fill-success">
                                    check
                                </i>
                            ))}
                        <Button
                            className="button__rounded button__light"
                            type="button"
                            onClick={onSubmitCheckNickname}
                        >
                            {t('CHECK_DUPLICATED')}
                        </Button>
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
                            placeholder={ValidationMessages.DEFAULT_PASSWORD}
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
                    <div className="c-login__button-section-message">
                        <p>{t('VERIFICATION_NOTICE-1')}</p>
                        <p>{t('VERIFICATION_NOTICE-2')}</p>
                        <p>{t('VERIFICATION_NOTICE-3')}</p>
                    </div>
                    <Button
                        className="button__rounded button__orange"
                        type="button"
                        onClick={onClickVerification}
                    >
                        {t('VERIFICATION_NAVIGATE_BUTTON')}
                    </Button>
                    <Button
                        className="button__rounded button__light"
                        type="submit"
                    >
                        {t('DEFAULT_SIGNUP')}
                    </Button>
                </section>
            </form>
        </div>
    );
}
