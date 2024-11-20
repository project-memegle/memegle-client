import { AxiosError } from 'axios';
import validateNickname from 'components/Validations/ValidateNickname';
import ValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { changeNickname, checkNickname } from 'services/NicknameService';
import { handleApiError } from 'utils/API/handleApiError';
import handleInputChange from 'utils/Event/handleInputChange';
import { getSessionStorages } from 'utils/Storage/sessionStorage';

export default function ChangeNickname() {
    const DEFAULT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;

    const navigate = useCustomNavigate();
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState(DEFAULT_NICKNAME);

    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // New state to track if nickname has been checked

    const onChangeNickname = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            const error = validateNickname(value);
            setNickname(value);
            setNicknameError(error);
            setIsChecked(false);
        },
        []
    );

    const onCheckNickname = useCallback(
        async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (nicknameError) {
                return;
            }
            const response = await checkNickname({ nickname });

            setIsChecked(true); // Set the checked state to true after checking
            if (response?.isDuplicated) {
                setNicknameError(ValidationMessages.EXIST_NICKNAME);
                setIsDuplicated(true);
                return;
            }

            setNicknameError(ValidationMessages.CHECK_NICKNAME_SUCCESS);
            setIsDuplicated(false);
        },
        [nickname, nicknameError]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const userId = getSessionStorages(StorageKeyword.USER_ID);

            if (isDuplicated) {
                return;
            }

            if (!userId) {
                setMessage(ValidationMessages.MISSING_ID);
                return;
            }

            if (nickname) {
                await changeNickname({ userId, nickname });
                setMessage(ValidationMessages.CHANGE_NICKNAME_SUCCESS);
                navigate('/mypage');
            }
        },
        [nickname, nicknameError, isDuplicated, navigate]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{nicknameError ? nicknameError : DEFAULT_NICKNAME}</p>
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
                                placeholder="닉네임"
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
                            onClick={onCheckNickname} // Attach the onCheckNickname function
                        >
                            중복확인
                        </button>
                    </section>
                </div>
                <button
                    className="button__rounded button__orange"
                    type="submit" // Ensure this button submits the form
                >
                    닉네임 변경하기
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
