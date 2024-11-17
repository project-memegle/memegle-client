import { AxiosError } from 'axios';
import validateNickname from 'components/Validations/ValidateNickname';
import ValidationMessages from 'components/Validations/ValidationMessages';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { handleApiError } from 'utils/API/handleApiError';
import handleInputChange from 'utils/Event/handleInputChange';

export default function ChangeNickname() {
    const navigate = useCustomNavigate();
    const [message, setMessage] = useState('');
    const DEFALUT_NICKNAME = ValidationMessages.DEFAULT_NICKNAME;
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState(DEFALUT_NICKNAME);

    const nicknameInputRef = useRef<HTMLInputElement>(null);

    const onChangeNickname = useCallback(
        handleInputChange(setNickname, setNicknameError, validateNickname, () =>
            setMessage('')
        ),
        []
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (nicknameError) {
                return;
            }

            if (nickname) {
                try {
                    // await signUp(userData);
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [nickname, nicknameError]
    );

    return (
        <div className="main__container">
            <form className="c-login" onSubmit={onSubmit}>
                <div className="c-login__section">
                    <p>{nicknameError ? nicknameError : DEFALUT_NICKNAME}</p>
                    <section className="c-login__section-verification">
                        <label htmlFor="nickname">닉네임</label>
                        <input
                            ref={nicknameInputRef}
                            className="c-login__input"
                            name="nickname"
                            id="nickname"
                            type="text"
                            placeholder="닉네임"
                            value={nickname}
                            onChange={onChangeNickname}
                        />
                        <button
                            type="button"
                            className="button__rounded button__light"
                        >
                            중복확인
                        </button>
                    </section>
                </div>
                <button
                    className="button__rounded button__orange"
                    onClick={() => navigate('/mypage')}
                >
                    닉네임 변경하기
                </button>
            </form>
        </div>
    );
}
