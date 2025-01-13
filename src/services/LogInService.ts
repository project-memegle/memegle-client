import { LogInRequestDTO } from 'services/dto/LogInDto';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { app } from '../../firebaseConfig';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

export async function logIn(userData: LogInRequestDTO): Promise<void> {
    const { email, password } = userData;
    const ValidationMessages = getValidationMessages();
    const auth = getAuth(app);

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        setSessionStorages({
            key: user.email as string,
            value: email,
        });
        setSessionStorages({
            key: StorageKeyword.USER_UID,
            value: user.uid,
        });
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        if (errorCode === 'auth/invalid-credential') {
            throw new Error(ValidationMessages.NONEXIST_AUTH);
        } else {
            throw new Error(ValidationMessages.UNKNOWN_ERROR);
        }
    }
}
