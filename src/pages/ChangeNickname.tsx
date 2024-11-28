import { AxiosError } from 'axios';
import validateNickname from 'components/Validations/ValidateNickname';
import getValidationMessages from 'components/Validations/ValidationMessages';
import ValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeNickname, checkNickname } from 'services/NicknameService';
import { handleApiError } from 'utils/API/handleApiError';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import { getSessionStorages } from 'utils/Storage/sessionStorage';

export default function ChangeNickname() {
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const DEFAULT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;

    const navigate = useCustomNavigate();
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const onChangeNickname = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            const error = validateNickname(value);
            setNickname(value);
            setNicknameError(error);
            setIsChecked(false);
            setIsDuplicated(false);
            setErrorMessage('');
            setSuccessMessage('');
            setMessage('');
        },
        []
    );

    const onCheckNickname = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();

            // 입력 값 유효성 검사
            if (nicknameError || !nickname) {
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

                // 닉네임 중복 처리
                if (response?.isDuplicated) {
                    setErrorMessage(ValidationMessages.EXIST_NICKNAME);
                    setIsDuplicated(true);
                } else {
                    setSuccessMessage(
                        ValidationMessages.CHECK_NICKNAME_SUCCESS
                    );
                    setIsDuplicated(false);
                }
            } catch (error) {
                setErrorMessage(ValidationMessages.ERROR_CHECK_NICKNAME);
            }
        },
        [nickname, nicknameError]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const userId = getSessionStorages(StorageKeyword.USER_ID);

            // 중복 체크가 되지 않은 경우 처리
            if (isDuplicated || !isChecked) {
                errorInputCheck(nicknameInputRef.current);
                setErrorMessage(ValidationMessages.REQUIRED_DUPLICATED_CHECK);
                setSuccessMessage('');
                return;
            }

            // 사용자 ID가 없는 경우 처리
            if (!userId) {
                setErrorMessage(ValidationMessages.MISSING_ID);
                setSuccessMessage('');
                return;
            }

            try {
                await changeNickname({ userId, nickname });
                setSuccessMessage(ValidationMessages.CHANGE_NICKNAME_SUCCESS);
                setErrorMessage('');
                navigate('/mypage');
            } catch (error) {
                handleApiError(error as AxiosError, setErrorMessage);
            }
        },
        [nickname, isDuplicated, isChecked, navigate]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="success-message">{successMessage}</p>
                    )}
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
                        <button
                            type="button"
                            className="button__rounded button__light"
                            onClick={onCheckNickname}
                        >
                            {t('CHECK_DUPLICATED')}
                        </button>
                    </section>
                </div>
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    {t('CHANGE_NICKNAME')}
                </button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}
