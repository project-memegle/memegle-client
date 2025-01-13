import {
    doc,
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
} from 'firebase/firestore';
import { SearchResultItemDTO } from './dto/ResultDto';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { db } from '../../firebaseConfig';

async function deleteUploadedImages({
    userId,
    category,
    uniqueFileName,
}: {
    userId: string;
    category: string;
    uniqueFileName: string;
}): Promise<void> {
    const firestore = getFirestore();
    const storage = getStorage();
    try {
        // 1. Firebase Storage에서 파일 삭제
        const storageRef = ref(storage, `images/${uniqueFileName}`);
        // await deleteObject(storageRef);

        // 2. Firestore에서 사용자 업로드 이미지 문서 삭제
        const userCollection = 'users';
        const userImagesSubCollection = 'uploadedImages';
        const userDocRef = doc(
            collection(db, userCollection, userId, userImagesSubCollection),
            uniqueFileName
        );
        await deleteDoc(userDocRef);

        // 3. Firestore에서 카테고리 이미지 문서 삭제
        const categoryCollection = 'categories';
        const imagesSubCollection = 'images';
        const categoryDocRef = doc(
            collection(db, categoryCollection, category, imagesSubCollection),
            uniqueFileName
        );
        await deleteDoc(categoryDocRef);
    } catch (error) {
        throw new Error(`Failed to delete favorite item: ${error}`);
    }
}

async function getUploadedImages(
    userId: string
): Promise<SearchResultItemDTO[]> {
    const firestore = getFirestore();

    try {
        const favoriteImagesRef = collection(
            firestore,
            'users',
            userId,
            'uploadedImages'
        );
        const querySnapshot = await getDocs(favoriteImagesRef);

        const favoriteItems: SearchResultItemDTO[] = querySnapshot.docs.map(
            (doc) => doc.data() as SearchResultItemDTO
        );
        return favoriteItems;
    } catch (error) {
        throw new Error(`Failed to fetch favorite items: ${error}`);
    }
}

export { deleteUploadedImages, getUploadedImages };
