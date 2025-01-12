import {
    doc,
    getFirestore,
    setDoc,
    collection,
    getDocs,
    deleteDoc,
    Timestamp, // Timestamp 추가
} from 'firebase/firestore';
import { FavoriteItemDTO } from './dto/ResultDto';

async function addFavoriteItem({
    userId,
    imageUrl,
    category,
    tagList,
    imageId,
    uploader,
    order,
}: {
    userId: string;
    imageUrl: string;
    category: string;
    tagList: string[];
    imageId: string;
    uploader: string;
    order: number; // 순서 지정
}): Promise<void> {
    const firestore = getFirestore();

    const favoriteItem = {
        category: category,
        createdAt: Timestamp.now(),
        id: imageId,
        imageUrl: imageUrl,
        tagList: tagList,
        uploader: uploader,
        order: order !== undefined ? order : 0,
    };

    try {
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

async function getFavoriteItems(userId: string): Promise<FavoriteItemDTO[]> {
    const firestore = getFirestore();

    try {
        const favoriteImagesRef = collection(
            firestore,
            'users',
            userId,
            'favoriteImages'
        );

        const querySnapshot = await getDocs(favoriteImagesRef);

        const favoriteItems: FavoriteItemDTO[] = querySnapshot.docs
            .map((doc) => doc.data() as FavoriteItemDTO)
            .sort((a, b) => a.order - b.order);
        return favoriteItems;
    } catch (error) {
        console.error('Error fetching favorite items:', error);
        throw new Error(`Failed to fetch favorite items: ${error}`);
    }
}

async function updateFavoriteItemOrder(
    userId: string,
    imageId: string,
    newOrder: number
): Promise<void> {
    const firestore = getFirestore();

    try {
        const userFavoriteRef = doc(
            firestore,
            'users',
            userId,
            'favoriteImages',
            imageId
        );

        // 순서 업데이트
        await setDoc(userFavoriteRef, { order: newOrder }, { merge: true });

        console.log('Favorite item order updated successfully!');
    } catch (error) {
        console.error('Error updating favorite item order:', error);
        throw new Error(`Failed to update favorite item order: ${error}`);
    }
}

export {
    addFavoriteItem,
    deleteFavoriteItem,
    getFavoriteItems,
    updateFavoriteItemOrder,
};
