import getValidationMessages from 'components/Validations/ValidationMessages';
import { getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export async function postChat({
    userId,
    category,
    content,
}: {
    userId: string;
    category: string;
    content: string;
}): Promise<void> {
    const ValidationMessages = getValidationMessages();
    const storage = getStorage();

    try {
        const data = {
            userId: userId,
            chatId: uuidv4(),
            category: category,
            content: content,
            createdAt: new Date(),
        };

        const docRef = doc(collection(db, 'inquiry'), userId); // 'inquiry' 컬렉션에 userId 문서 생성
        await setDoc(docRef, data);

        console.log('Chat posted successfully!');
    } catch (error) {
        console.log(error);
        throw new Error(ValidationMessages.UNKNOWN_ERROR);
    }
}
