import { app } from '../../firebaseConfig';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { FirebaseError } from 'firebase/app';
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser,
} from 'firebase/auth';
import { UserInfoDTO } from './dto/UserInfoDto';

export const DELETE_ACCOUNT_URL = '/users';

export async function deleteAccount(userData: UserInfoDTO): Promise<void> {
    const { email, password } = userData;
    const auth = getAuth(app);
    const user = auth.currentUser;
    const ValidationMessages = getValidationMessages();

    if (!user) {
        throw new Error(ValidationMessages.NONEXIST_USER);
    }

    const authCredential = EmailAuthProvider.credential(email, password);
    try {
        await reauthenticateWithCredential(user, authCredential);
        await deleteUser(user);
        console.log('User deleted successfully');
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        console.error('Delete account error', errorMessage);

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
