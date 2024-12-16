import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import {
    deleteSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';
import { SignUpDTO } from 'services/dto/SignUpDto';
import { verifyVerificationCode } from 'services/VerificationService';
import StorageKeyword from 'Constant/StorageKeyword';
import { VerifyCodePasswordDTO } from 'services/dto/PasswordDto';
import VerificationForm from 'components/UI/VerificationForm';
import { signUp } from 'services/SignupService';

export default function Verification() {
    const navigate = useCustomNavigate();

    const [message, setMessage] = useState('');

    const removeSignUpData = () => {
        deleteSessionStorage('id');
        deleteSessionStorage('nickname');
        deleteSessionStorage('password');
    };

    const getSignUpData = async () => {
        const id = getSessionStorages('id');
        const nickname = getSessionStorages('nickname');
        const password = getSessionStorages('password');
        if (id && nickname && password) {
            const userData: SignUpDTO = {
                loginId: id,
                nickname: nickname,
                password: password,
            };
            try {
                await signUp(userData);
                removeSignUpData();
                navigate('/login');
            } catch (error) {
                handleApiError(error as AxiosError, setMessage);
            }
        }
    };

    const handleSubmit = useCallback(
        async (name: string, email: string, code: string) => {
            const userData: VerifyCodePasswordDTO = {
                email: email,
                authenticationCode: code,
                authenticationType: StorageKeyword.VERIFICATION_CODE_SIGNUP,
            };
            setMessage('');
            try {
                await verifyVerificationCode(userData);
                getSignUpData();
                setSessionStorages({
                    key: StorageKeyword.VERIFICATION_SUCCESS,
                    value: StorageKeyword.TRUE,
                });

                navigate('/mypage');
            } catch (error) {
                handleApiError(error as AxiosError, setMessage);
            }
        },
        [navigate]
    );

    return (
        <div className="main__container">
            <VerificationForm onSubmit={handleSubmit} />
            {message && <p className="message">{message}</p>}
        </div>
    );
}
