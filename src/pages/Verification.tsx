import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import {
    deleteSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';
import { UserInfoDTO } from 'services/dto/UserInfoDTO';
import { verifyVerificationCode } from 'services/VerificationService';
import StorageKeyword from 'Constant/StorageKeyword';
import { VerifyCodePasswordDTO } from 'services/dto/PasswordDto';
import VerificationForm from 'components/UI/VerificationForm';
import { signUp } from 'services/SignupService';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { handleVerificationApiError } from 'utils/API/handleVerificationAPIError';

export default function Verification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();

    const [message, setMessage] = useState('');

    const removeSignUpData = () => {
        deleteSessionStorage('id');
        deleteSessionStorage('nickname');
        deleteSessionStorage('password');
    };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const getSignUpData = async () => {
        const id = getSessionStorages('id');
        const nickname = getSessionStorages('nickname');
        const password = getSessionStorages('password');
        if (id && nickname && password) {
            const userData: UserInfoDTO = {
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

    const onSubmit = useCallback(
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
                handleVerificationApiError(error as AxiosError, setMessage);
            }
        },
        [navigate]
    );

    return (
        <div className="main__container">
            <VerificationForm
                onSubmit={onSubmit}
                initialName={name}
                initialEmail={email}
                initialCode={code}
                message={message}
                setMessage={setMessage}
            />
        </div>
    );
}
