import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const fetchWithCollection = async (collectionName:string) => {
    const collectionRef = collection(db, collectionName);
    try {
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('문서 데이터:', documents);
        return documents;
    } catch (error) {
        console.error('문서를 가져오는 중 오류 발생:', error);
        throw error;
    }
};

export default fetchWithCollection;
