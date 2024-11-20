import { useAuth } from 'components/auth/ProvideAuth';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import ValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useEffect, useState } from 'react';
import { postDeleteAccount } from 'services/deleteAccountService';
import { clearLocalStorage } from 'utils/Storage/localStorage';
import {
    clearSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';

export default function DeleteAccount() {
    const navigate = useCustomNavigate();
    const auth = useAuth();

    const [reason, setReason] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);

    useEffect(() => {
        const userId = getSessionStorages(StorageKeyword.USER_ID);
        if (userId) {
            setId(userId);
        }
    }, []);

    function onChangeReason(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setReason(event.target.value);
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!reason) {
            setToastMessage(ValidationMessages.REQUIRED_REASON);
            setToast(true);
            return;
        }

        try {
            const userData = {
                userId: id,
                reason: reason,
            };
            await postDeleteAccount(userData);
            clearSessionStorage();
            setSessionStorages({
                key: StorageKeyword.DELETE_ACCOUNT_SUCCESS,
                value: StorageKeyword.TRUE,
            });
            auth.logout(() => {
                navigate('/');
            });
        } catch (error) {
            setToastMessage(ValidationMessages.REQUIRED_REASON);
            setToast(true);
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
        onChangeReason(event);
    };

    return (
        <main className="home__main">
            <form action="" className="c-deleteAccount" onSubmit={onSubmit}>
                <h2>정말 떠나시는건가요?😭</h2>
                <p>
                    계정을 삭제하시려는 이유를 말씀해주세요. <br /> 소중한
                    피드백 자료로 활용하겠습니다.
                </p>
                <section className="c-deleteAccount__checkbox">
                    <div>
                        <input
                            id="resource"
                            type="radio"
                            name="delete"
                            value="자료가 충분하지 않다"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="resource">자료가 충분하지 않다</label>
                    </div>
                    <div>
                        <input
                            id="privacy"
                            type="radio"
                            name="delete"
                            value="개인정보 문제"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="privacy">개인정보 문제</label>
                    </div>
                    <div>
                        <input
                            id="notuseful"
                            type="radio"
                            name="delete"
                            value="서비스가 유용하지 않다"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="notuseful">
                            서비스가 유용하지 않다
                        </label>
                    </div>
                    <div>
                        <input
                            id="difficult"
                            type="radio"
                            name="delete"
                            value="이용이 어렵다"
                            onChange={onChangeReason}
                        />
                        <label htmlFor="difficult">이용이 어렵다</label>
                    </div>
                    <section className="c-deleteAccount__checkbox-textarea">
                        <div>
                            <input
                                id="other"
                                type="radio"
                                name="delete"
                                value="기타"
                                onChange={onChangeReason}
                            />
                            <label htmlFor="other">기타</label>
                        </div>
                        <textarea
                            id="feedback"
                            placeholder="떠나시려는 이유를 입력해주세요."
                            onInput={handleInput}
                            onChange={onChangeReason}
                        />
                    </section>
                </section>
                <button
                    className="button__rounded button__orange"
                    type="submit"
                >
                    계정 삭제하기
                </button>
            </form>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </main>
    );
}
