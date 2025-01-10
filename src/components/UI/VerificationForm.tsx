import { FormEvent, useCallback, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import handleInputChange from 'utils/Event/handleInputChange';
import validateEmail from 'components/Validations/ValidateEmail';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { handleApiError } from 'utils/API/handleApiError';
import validateName from 'components/Validations/ValidateName';
import { VerificationRequestDTO } from 'services/dto/VerificationDto';
import useTimer from 'hooks/useTimer';
import formatTime from 'utils/Format/formatTime';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import {
    postVerificationCode,
    verifyVerificationCode,
} from 'services/VerificationService';
import StorageKeyword from 'Constant/StorageKeyword';
import { useTranslation } from 'react-i18next';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { VerifyCodePasswordDTO } from 'services/dto/PasswordDto';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { InputField } from 'components/UI/InputField';

interface VerificationFormProps {
    onSubmit: (name: string, email: string, code: string) => void;
    onSkipVerification?: () => void;
    initialName?: string;
    initialEmail?: string;
    initialCode?: string;
    message?: string;
    category?: string;
    setMessage?: (message: string) => void;
}

export default function VerificationForm({
    onSubmit,
    onSkipVerification,
    initialName = '',
    initialEmail = '',
    initialCode = '',
    message = '',
    category = '',
    setMessage = () => {},
}: VerificationFormProps) {
    const { t } = useTranslation();
    const ValidationMessages = getValidationMessages();
    const DEFAULT_NAME = ValidationMessages.DEFAULT_NAME;
    const DEFAULT_EMAIL = ValidationMessages.DEFAULT_EMAIL;

    const [nameError, setNameError] = useState(DEFAULT_NAME);
    const [emailError, setEmailError] = useState(DEFAULT_EMAIL);

    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [code, setCode] = useState(initialCode);

    const [verification, setVerification] = useState(false);

    const { timer, startTimer, isActive } = useTimer(300);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const [hasTimerStarted, setHasTimerStarted] = useState(false);

    const navigate = useCustomNavigate();

    const onChangeName = useCallback(
        handleInputChange(setName, setNameError, validateName),
        []
    );

    const onChangeEmail = useCallback(
        handleInputChange(setEmail, setEmailError, validateEmail),
        []
    );

    const onChangeCode = useCallback((e: FormEvent<HTMLInputElement>) => {
        setCode(e.currentTarget.value);
    }, []);

    const onChangeVerification = useCallback(async () => {
        if (nameError) {
            errorInputCheck(nameInputRef.current);
            return;
        }
        if (emailError) {
            errorInputCheck(emailInputRef.current);
            return;
        }

        if (name && email) {
            let authenticationType;
            if (category === 'password') {
                authenticationType = StorageKeyword.VERIFICATION_CODE_PASSWORD;
            } else if (category === 'email') {
                authenticationType = StorageKeyword.VERIFICATION_CODE_ID;
            } else {
                authenticationType = StorageKeyword.VERIFICATION_CODE_SIGNUP;
            }

            const userData: VerificationRequestDTO = {
                userName: name,
                email: email,
                authenticationType: authenticationType,
            };

            setMessage('');
            startTimer();
            setHasTimerStarted(true);

            try {
                await postVerificationCode(userData);
                setVerification(true);
            } catch (error) {
                handleApiError(error as AxiosError, setMessage);
            }
        }
    }, [startTimer, name, email, nameError, emailError, category]);

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (nameError) {
                errorInputCheck(nameInputRef.current);
                return;
            }

            if (emailError) {
                errorInputCheck(emailInputRef.current);
                return;
            }

            if (!code) {
                errorInputCheck(codeInputRef.current);
                return;
            }

            setSessionStorages({
                key: StorageKeyword.VERIFICATION_SUCCESS,
                value: StorageKeyword.TRUE,
            });

            onSubmit(name, email, code);
        },
        [name, email, code, nameError, emailError, onSubmit]
    );

    return (
        <form className="c-login" onSubmit={handleSubmit}>
            <section className="c-login__section">
                <p>{nameError ? nameError : DEFAULT_NAME}</p>
                <InputField
                    label="이름"
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    placeholder={ValidationMessages.REQUIRED_NAME}
                    ref={nameInputRef}
                    className="c-login__input"
                />
            </section>
            <section className="c-login__section">
                <p>{emailError ? emailError : DEFAULT_EMAIL}</p>
                <section className="c-login__section-verification">
                    <div className='relative'>
                        <InputField
                            label="이메일"
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            placeholder={ValidationMessages.REQUIRED_EMAIL}
                            ref={emailInputRef}
                            className="c-login__input"
                        />
                    </div>
                    <button
                        type="button"
                        className="button__rounded button__light"
                        onClick={onChangeVerification}
                        disabled={isActive}
                    >
                        {hasTimerStarted
                            ? t('VERIFICATION_RESEND_CODE')
                            : t('VERIFICATION_SEND_CODE')}
                    </button>
                </section>
            </section>
            {verification && (
                <section className="c-login__section">
                    <InputField
                        label="인증번호"
                        type="text"
                        name="verification"
                        value={code}
                        onChange={onChangeCode}
                        placeholder={
                            isActive
                                ? t('VERIFICATION_ENTER_CODE')
                                : t('VERIFICATION_TIMEOVER')
                        }
                        ref={codeInputRef}
                        className="c-login__input"
                    />
                    <p className="c-login__section-timer">
                        {formatTime(timer)}
                    </p>
                </section>
            )}
            {category && (
                <section className="c-login__button-section-bottom">
                    {category === 'password' ? (
                        <div className="c-login__button-section-bottom-text">
                            <p>
                                {t('REQUIRED_VERIFICATION_FOR_FIND_PASSWORD-1')}
                            </p>
                            <p>
                                {t('REQUIRED_VERIFICATION_FOR_FIND_PASSWORD-2')}
                            </p>
                        </div>
                    ) : category === 'email' ? (
                        <div className="c-login__button-section-bottom-text">
                            <p>{t('REQUIRED_VERIFICATION_FOR_FIND_ID-1')}</p>
                            <p>{t('REQUIRED_VERIFICATION_FOR_FIND_ID-2')}</p>
                        </div>
                    ) : null}
                    {category && (
                        <button
                            className="button__light-font"
                            onClick={() => navigate('/verification')}
                        >
                            <p>{t('GO_VERIFY_EMAIL')}</p>
                        </button>
                    )}
                </section>
            )}
            {message && <p className="font-warning">{message}</p>}
            <section className="c-login__button-section">
                <button className="button__rounded button__orange">
                    {t('VERIFICATION_COMPLETE')}
                </button>
                {onSkipVerification && (
                    <button
                        className="button__rounded button__light"
                        type="button"
                        onClick={onSkipVerification}
                    >
                        {t('BUTTON_LATER')}
                    </button>
                )}
            </section>
        </form>
    );
}
