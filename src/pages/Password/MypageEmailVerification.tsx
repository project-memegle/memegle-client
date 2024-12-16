import useCustomNavigate from 'hooks/useCustomNaviaget';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { VerifyCodePassword, SendPasswordCode } from 'services/PasswordService';
import {
    SendPasswordCodeDTO,
    VerifyCodePasswordDTO,
} from 'services/dto/PasswordDto';
import { useTranslation } from 'react-i18next';
import getValidationMessages from 'components/Validations/ValidationMessages';
import StorageKeyword from 'Constant/StorageKeyword';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import VerificationForm from 'components/UI/VerificationForm';
import { handleVerificationApiError } from 'utils/API/handleVerificationAPIError';
import { AxiosError } from 'axios';

export default function MypageEmailVerification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [verification, setVerification] = useState(false);

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const loginId = getSessionStorages(StorageKeyword.USER_ID);

    const handleSendCode = useCallback(
        async (name: string, email: string) => {
            const userData: SendPasswordCodeDTO = {
                userName: name,
                email: email,
                authenticationType: StorageKeyword.VERIFICATION_CODE_PASSWORD,
            };
            try {
                await SendPasswordCode(userData);
                setVerification(true);
            } catch (error) {
                setMessage(ValidationMessages.INVALID_USER);
            }
        },
        [ValidationMessages]
    );

    const handleSubmit = useCallback(
        async (name: string, email: string, code: string) => {
            const userData: VerifyCodePasswordDTO = {
                email: email,
                authenticationCode: code,
                authenticationType: StorageKeyword.VERIFICATION_CODE_PASSWORD,
            };
            try {
                await VerifyCodePassword(userData);
                navigate('/password/change', {
                    state: {
                        email: email,
                        authenticationCode: code,
                        authenticationType:
                            StorageKeyword.VERIFICATION_CODE_PASSWORD,
                        loginId: loginId,
                    },
                });
            } catch (error) {
                handleVerificationApiError(error as AxiosError, setMessage);
            }
        },
        [navigate, loginId, ValidationMessages]
    );

    return (
        <div className="main__container">
            <VerificationForm
                onSubmit={handleSubmit}
                initialName={name}
                initialEmail={email}
                initialCode={code}
                message={message}
                setMessage={setMessage}
                category="password"
            />
        </div>
    );
}
