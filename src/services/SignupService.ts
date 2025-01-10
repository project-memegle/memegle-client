import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { FirebaseError } from 'firebase/app';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { UserInfoDTO } from './dto/UserInfoDto';

export async function signUp(userData: UserInfoDTO): Promise<void> {
    const { email, password } = userData;
    const ValidationMessages = getValidationMessages();
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        if (errorCode === 'auth/email-already-in-use') {
            throw new Error(ValidationMessages.EXIST_EMAIL);
        } else {
            throw new Error(ValidationMessages.UNKNOWN_ERROR);
        }
    }
}
