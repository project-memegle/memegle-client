import { FormEvent, useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { handleApiError } from 'utils/API/handleApiError';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import { verifyVerificationCode } from 'services/VerificationService';
import StorageKeyword from 'Constant/StorageKeyword';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'components/auth/ProvideAuth';
import { LogInRequestDTO } from 'services/dto/LogInDto';
import { logIn } from 'services/LogInService';
import { VerifyCodePasswordDTO } from 'services/dto/PasswordDto';
import VerificationForm from 'components/UI/VerificationForm';

export default function SignUpVerification() {
    const navigate = useCustomNavigate();
    const auth = useAuth();

    const location = useLocation();
    const logInUserData = location.state as LogInRequestDTO;
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!logInUserData) {
            navigate('/signup');
        }
    }, [logInUserData, navigate]);

    const skipVerification = async () => {
        if (!logInUserData) {
            navigate('/signup');
        }
        try {
            const loginData: LogInRequestDTO = {
                loginId: logInUserData.loginId,
                password: logInUserData.password,
            };

            await logIn(loginData);

            setSessionStorages({
                key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                value: StorageKeyword.TRUE,
            });

            auth.login(() => {
                navigate('/');
            });
        } catch (error) {
            handleApiError(error as AxiosError, setMessage);
        }
    };

    const handleSubmit = useCallback(
        async (name: string, email: string, code: string) => {
            if (logInUserData) {
                const userData: VerifyCodePasswordDTO = {
                    email: email,
                    authenticationCode: code,
                    authenticationType: StorageKeyword.VERIFICATION_CODE_SIGNUP,
                };
                setMessage('');
                try {
                    await verifyVerificationCode(userData);
                    skipVerification();

                    const { loginId, password } = logInUserData;

                    const loginData: LogInRequestDTO = {
                        loginId,
                        password,
                    };
                    await logIn(loginData);

                    setSessionStorages({
                        key: StorageKeyword.CREATE_ACCOUNT_SUCCESS,
                        value: StorageKeyword.TRUE,
                    });

                    auth.login(() => {
                        navigate('/');
                    });
                } catch (error) {
                    handleApiError(error as AxiosError, setMessage);
                }
            }
        },
        [logInUserData, navigate, auth]
    );

    return (
        <div className="main__container">
            <VerificationForm
                onSubmit={handleSubmit}
                onSkipVerification={skipVerification}
            />
            {message && <p className="message">{message}</p>}
        </div>
    );
}
