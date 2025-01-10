import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDataToFirestore } from 'utils/firebase/addDataToFirestore';
import { v4 as uuidv4 } from 'uuid';

async function uploadImageAndSaveData(file: File, category: string, tags: string[]): Promise<void> {
    const storage = getStorage();
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `images/${uniqueFileName}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Image uploaded successfully:', snapshot);

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Download URL:', downloadURL);

        const collectionName = 'memes';
        const documentId = uniqueFileName; 
        const data = {
            category: category,
            createdAt: new Date(),
            imageUrl: downloadURL,
            tags: tags,
        };

        await addDataToFirestore(collectionName, documentId, data);
        console.log('Data added to Firestore successfully!');
    } catch (error) {
        console.error('Failed to upload image and save data:', error);
    }
}

export default uploadImageAndSaveData;