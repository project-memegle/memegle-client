import {
    getDocs,
    query,
    where,
    collectionGroup,
    getFirestore,
} from 'firebase/firestore';
import { SearchResultItemDTO } from './dto/ResultDto';

const db = getFirestore();

async function searchByTag(tag: string): Promise<SearchResultItemDTO[]> {
    try {
        const images: any[] = [];
        const q = query(
            collectionGroup(db, 'images'),
            where('tagList', 'array-contains', tag)
        );

        const imageSnapshot = await getDocs(q);

        imageSnapshot.forEach((doc) => {
            images.push(doc.data());
        });
        return images;
    } catch (error) {
        console.error('Error searching images by tag:', error);
        throw new Error('Failed to search images by tag');
    }
}

export default searchByTag;
