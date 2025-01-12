import {
    doc,
    getFirestore,
    setDoc,
    collection,
    getDocs,
    deleteDoc,
    Timestamp, // Timestamp 추가
} from 'firebase/firestore';
import { SearchResultItemDTO } from './dto/ResultDto';

async function deleteUploadedImages(
    userId: string,
    uniqueFileName: string
): Promise<void> {
    const firestore = getFirestore();

    try {
        const userFavoriteRef = doc(
            firestore,
            'users',
            userId,
            'uploadedImages',
            uniqueFileName
        );
        await deleteDoc(userFavoriteRef);

        console.log('Favorite item deleted successfully!');
    } catch (error) {
        console.error('Error deleting favorite item:', error);
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
        console.log('Favorite items:', favoriteItems);
        return favoriteItems;
    } catch (error) {
        console.error('Error fetching favorite items:', error);
        throw new Error(`Failed to fetch favorite items: ${error}`);
    }
}

export { deleteUploadedImages, getUploadedImages };
