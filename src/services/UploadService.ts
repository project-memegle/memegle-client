import { collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebaseConfig';

async function uploadService(
    userId: string,
    file: File,
    category: string,
    tagList: string[]
): Promise<void> {
    const storage = getStorage();
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `images/${uniqueFileName}`);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const categoryCollection = 'categories';
        const categoryDoc = category;
        const imagesSubCollection = 'images';

        const data = {
            id: uniqueFileName,
            imageUrl: downloadURL,
            category: category,
            createdAt: new Date(),
            tagList: tagList,
            uploader: userId,
        };

        const docRef = doc(
            collection(
                db,
                categoryCollection,
                categoryDoc,
                imagesSubCollection
            ),
            uniqueFileName
        );
        await setDoc(docRef, data);

        const userCollection = 'users';
        const userUniqueId = userId;
        const userImagesSubCollection = 'uploadedImages';

        const userDocRef = doc(
            collection(
                db,
                userCollection,
                userUniqueId,
                userImagesSubCollection
            ),
            uniqueFileName
        );
        await setDoc(userDocRef, data);

    } catch (error) {
        console.error('Failed to upload image and save data:', error);
        throw new Error('Failed to upload image and save data');
    }
}

export default uploadService;
