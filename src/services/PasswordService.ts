import { post} from 'utils/API/fetcher';
import axios, { AxiosResponse } from 'axios';
import {
    VerifyCodePasswordDTO,
    ResetPasswordDTO,
    SendPasswordCodeDTO,
} from './dto/PasswordDto';
import { SEND_EMAIL_CODE, VERIFY_AUTH_CODE_URL } from './IdService';
import { getAuth, updatePassword } from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { reAuthenticationService } from './reAuthenticationService';
import { FirebaseError } from 'firebase-admin';
import getValidationMessages from 'components/Validations/ValidationMessages';

export const RESET_PASSWORD_URL = '/users/password';

export async function SendPasswordCode(
    userData: SendPasswordCodeDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            SendPasswordCodeDTO
        >(SEND_EMAIL_CODE, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function VerifyCodePassword(
    userData: VerifyCodePasswordDTO
): Promise<void> {
    try {
        const response: AxiosResponse<void> = await post<
            void,
            VerifyCodePasswordDTO
        >(VERIFY_AUTH_CODE_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
export async function ResetPassword(userData: ResetPasswordDTO): Promise<void> {
    const { email, password, newPassword } = userData;
    const auth = getAuth(app);
    const ValidationMessages = getValidationMessages();
    const user = auth.currentUser;

    if (!user) {
        throw new Error(ValidationMessages.NONEXIST_USER);
    }

    try {
        await reAuthenticationService({ email, password });

        await updatePassword(user, newPassword);
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        console.error('Password update error', errorMessage);

        if (errorCode === 'auth/email-already-in-use') {
            throw new Error(ValidationMessages.EXIST_EMAIL);
        } else if (errorCode === 'auth/wrong-password') {
            throw new Error(ValidationMessages.INVALID_PASSWORD);
        } else if (errorCode === 'auth/user-not-found') {
            throw new Error(ValidationMessages.NONEXIST_USER);
        } else {
            throw new Error(ValidationMessages.UNKNOWN_ERROR);
        }
    }
}
