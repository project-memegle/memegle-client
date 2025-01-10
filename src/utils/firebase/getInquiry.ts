import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

// 특정 문서의 데이터를 가져오기
const fetchDocument = async () => {
    const docRef = doc(db, 'inquiry', 'inquiry');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log('문서 데이터:', docSnap.data());
    } else {
        console.log('문서를 찾을 수 없습니다.');
    }
};

export { fetchDocument };