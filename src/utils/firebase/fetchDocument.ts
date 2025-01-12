import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const fetchDocument = async (collectionName: string, fieldName: string) => {
    const docRef = doc(db, collectionName, fieldName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log('문서 데이터:', docSnap.data());
    } else {
        console.log('문서를 찾을 수 없습니다.');
    }
};

export default fetchDocument;
