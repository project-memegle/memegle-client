import { FormEvent, useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { handleApiError } from 'utils/API/handleApiError';
import { postIdSearchCode, verifyIdSearchCode } from 'services/IdService';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import StorageKeyword from 'Constant/StorageKeyword';
import { VerifyCodePasswordDTO } from 'services/dto/PasswordDto';
import { VerificationRequestDTO } from 'services/dto/VerificationDto';
import VerificationForm from 'components/UI/VerificationForm';

export default function IdEmailVerification() {
    const navigate = useCustomNavigate();
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [verification, setVerification] = useState(false);

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const handleSendCode = useCallback(async (name: string, email: string) => {
        const userData: VerificationRequestDTO = {
            userName: name,
            email: email,
            authenticationType: StorageKeyword.VERIFICATION_CODE_ID,
        };
        setMessage('');
        try {
            await postIdSearchCode(userData);
            setVerification(true);
        } catch (error) {
            handleApiError(error as AxiosError, setMessage);
        }
    }, []);

    const handleSubmit = useCallback(
        async (name: string, email: string, code: string) => {
            const userData: VerifyCodePasswordDTO = {
                email: email,
                authenticationCode: code,
                authenticationType: StorageKeyword.VERIFICATION_CODE_ID,
            };
            setMessage('');
            try {
                const response = await verifyIdSearchCode(userData);
                navigate('/find/id', {
                    state: { loginId: response.data.loginId },
                });
            } catch (error) {
                if (error === 40105) {
                    setMessage(ValidationMessages.FAILED_VERIFICATION_CODE);
                    return;
                }
                if (error === 40106) {
                    setMessage(ValidationMessages.NONEXIST_VARIFICATION_INFO);
                    return;
                }
                if (error === 40001) {
                    setMessage(ValidationMessages.INVALID_CODE_TYPE);
                    return;
                }
                if (error === 5000) {
                    setMessage(ValidationMessages.SERVER_ERROR);
                    return;
                }
                setMessage(ValidationMessages.UNKNOWN_ERROR);
            }
        },
        [navigate, ValidationMessages]
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
                category="email"
            />
        </div>
    );
}
