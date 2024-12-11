import AuthButton from 'components/auth/Button';
import ErrorMessage from 'components/UI/FontMessages/ErrorMessage';
import SuccessMessage from 'components/UI/FontMessages/SuccessMessage';
import validateNickname from 'components/Validations/ValidateNickname';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeNickname, checkNickname } from 'services/NicknameService';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';
import { setSessionStorages } from 'utils/Storage/sessionStorage';

export default function ChangeNickname() {
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const DEFAULT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;

    const navigate = useCustomNavigate();
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const onChangeNickname = useCallback(
        handleInputChange(
            setNickname,
            setErrorMessage,
            validateNickname,
            () => {
                setIsDuplicated(false);
                setIsChecked(false);
                setSuccessMessage('');
            }
        ),
        []
    );

    const onCheckNickname = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();

            if (errorMessage || !nickname) {
                errorInputCheck(nicknameInputRef.current);
                setErrorMessage(ValidationMessages.REQUIRED_NICKNAME);
                setSuccessMessage('');
                return;
            }

            try {
                const response = await checkNickname({ nickname });
                setIsChecked(true);
                setErrorMessage('');
                setSuccessMessage('');

                if (response) {
                    setSuccessMessage(
                        ValidationMessages.CHECK_NICKNAME_SUCCESS
                    );
                    setIsDuplicated(false);
                }
            } catch (error) {
                if (error === 40004) {
                    setErrorMessage(ValidationMessages.EXIST_NICKNAME);
                    return;
                }

                if (error === 5000) {
                    setErrorMessage(ValidationMessages.SERVER_ERROR);
                    return;
                }
                setErrorMessage(ValidationMessages.UNKNOWN_ERROR);
                return;
            }
        },
        [nickname, errorMessage]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (isDuplicated || !isChecked) {
                errorInputCheck(nicknameInputRef.current);
                setErrorMessage(ValidationMessages.REQUIRED_DUPLICATED_CHECK);
                setSuccessMessage('');
                return;
            }

            if (errorMessage || !nickname) {
                errorInputCheck(nicknameInputRef.current);
                setErrorMessage(ValidationMessages.REQUIRED_NICKNAME);
                setSuccessMessage('');
                return;
            }

            try {
                await changeNickname({ nickname });
                setSessionStorages({
                    key: StorageKeyword.CHANGE_NICKNAME_SUCCESS,
                    value: StorageKeyword.TRUE,
                });
                setSessionStorages({
                    key: StorageKeyword.USER_NICKNAME,
                    value: nickname,
                });

                navigate('/mypage');
            } catch (error) {
                if (error === 40004) {
                    setMessage(ValidationMessages.EXIST_NICKNAME);
                    return;
                }

                if (error === 5000) {
                    setMessage(ValidationMessages.SERVER_ERROR);
                    return;
                }
                setMessage(ValidationMessages.UNKNOWN_ERROR);
                return;
            }
        },
        [nickname, isDuplicated, isChecked, navigate]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <ErrorMessage message={errorMessage} />
                    <SuccessMessage message={successMessage} />
                    {!errorMessage && !successMessage && (
                        <p>{DEFAULT_NICKNAME}</p>
                    )}
                    <section className="c-login__section-verification">
                        <label htmlFor="nickname">닉네임</label>
                        <div className="c-login__section-relative">
                            <input
                                ref={nicknameInputRef}
                                className={`c-login__input ${
                                    isChecked
                                        ? isDuplicated
                                            ? 'fail'
                                            : 'success'
                                        : ''
                                }`}
                                name="nickname"
                                id="nickname"
                                type="text"
                                placeholder={t('REQUIRED_NICKNAME')}
                                value={nickname}
                                onChange={onChangeNickname}
                            />
                            {isChecked &&
                                (isDuplicated ? (
                                    <i className="c-icon c-icon--fill-fail">
                                        close
                                    </i>
                                ) : (
                                    <i className="c-icon c-icon--fill-success">
                                        check
                                    </i>
                                ))}
                        </div>
                        <AuthButton
                            className="button__rounded button__light"
                            type="button"
                            onClick={onCheckNickname}
                        >
                            {t('CHECK_DUPLICATED')}
                        </AuthButton>
                    </section>
                </div>
                {message && <p className="font-warning">{message}</p>}
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    {t('CHANGE_NICKNAME')}
                </button>
            </form>
        </div>
    );
}
