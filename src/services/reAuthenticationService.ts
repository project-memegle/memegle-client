import {
    User,
    EmailAuthProvider,
    reauthenticateWithCredential,
    getAuth,
} from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { FirebaseError } from 'firebase/app';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { UserInfoDTO } from './dto/UserInfoDto';

export async function reAuthenticationService(
    userData: UserInfoDTO
): Promise<void> {
    const { email, password } = userData;
    const ValidationMessages = getValidationMessages();
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
        throw new Error(ValidationMessages.NONEXIST_USER);
    }

    const authCredential = EmailAuthProvider.credential(email, password);
    try {
        const userCredential = await reauthenticateWithCredential(
            user,
            authCredential
        );
        const reauthenticatedUser = userCredential.user;
        console.log('Reauthentication successful', reauthenticatedUser);
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        console.error('Reauthentication error', errorMessage);

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
