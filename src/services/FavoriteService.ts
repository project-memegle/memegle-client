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

async function addFavoriteItem({
    userId,
    imageUrl,
    category,
    tagList,
    imageId,
    uploader,
}: {
    userId: string;
    imageUrl: string;
    category: string;
    tagList: string[];
    imageId: string;
    uploader: string;
}): Promise<void> {
    const firestore = getFirestore();

    try {
        const favoriteItem = {
            category: category,
            createdAt: Timestamp.now(), // Firestore Timestamp 사용
            id: imageId,
            imageUrl: imageUrl,
            tagList: tagList,
            uploader: uploader,
        };
        // 디버깅 로그 추가
        console.log('userId:', userId);
        console.log('imageUrl:', imageUrl);
        console.log('category:', category);
        console.log('tagList:', tagList);
        console.log('imageId:', imageId);
        console.log('uploader:', uploader);

        const userFavoriteRef = doc(
            firestore,
            'users',
            userId,
            'favoriteImages',
            imageId
        );
        await setDoc(userFavoriteRef, favoriteItem);

        console.log('Favorite item added successfully!');
    } catch (error) {
        console.error('Error adding favorite item:', error);
        throw new Error(`Failed to add favorite: ${error}`);
    }
}

// 즐겨찾기 삭제
async function deleteFavoriteItem(
    userId: string,
    uniqueFileName: string
): Promise<void> {
    const firestore = getFirestore();

    try {
        const userFavoriteRef = doc(
            firestore,
            'users',
            userId,
            'favoriteImages',
            uniqueFileName
        );
        await deleteDoc(userFavoriteRef);

        console.log('Favorite item deleted successfully!');
    } catch (error) {
        console.error('Error deleting favorite item:', error);
        throw new Error(`Failed to delete favorite item: ${error}`);
    }
}

async function getFavoriteItems(
    userId: string
): Promise<SearchResultItemDTO[]> {
    const firestore = getFirestore();

    try {
        const favoriteImagesRef = collection(
            firestore,
            'users',
            userId,
            'favoriteImages'
        );
        const querySnapshot = await getDocs(favoriteImagesRef);

        // Firestore에서 데이터를 받아올 때, 타입을 정확히 지정
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

export { addFavoriteItem, deleteFavoriteItem, getFavoriteItems };
