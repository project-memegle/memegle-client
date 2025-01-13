import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../../firebaseConfig';

export async function SendResetEmailService(email: string): Promise<void> {
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
        .then(() => {})
        .catch((error) => {
            throw new Error('Failed to send email');
        });
}
