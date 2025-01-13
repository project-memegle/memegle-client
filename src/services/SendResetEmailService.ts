import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

export async function SendResetEmailService(email: string): Promise<void> {
    const auth = getAuth(app);

    const language = getSessionStorages(StorageKeyword.LANGUAGE) || 'ko';

    if (language === 'ko') {
        auth.languageCode = 'ko';
    } else {
        auth.languageCode = 'en';
    }

    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw new Error('Failed to send email');
    }
}
