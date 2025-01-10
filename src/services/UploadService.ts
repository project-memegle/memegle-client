import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDataToFirestore } from 'utils/firebase/addDataToFirestore';
import { v4 as uuidv4 } from 'uuid';

async function uploadImageAndSaveData(file: File, category: string, tags: string[]): Promise<void> {
    const storage = getStorage();
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `images/${uniqueFileName}`);
    
    try {
        // 이미지를 Firebase Storage에 업로드
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Image uploaded successfully:', snapshot);

        // 업로드된 이미지의 다운로드 URL 가져오기
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Download URL:', downloadURL);

        // 이미지 URL과 다른 데이터를 Firestore에 저장
        const collectionName = 'memes';
        const documentId = uniqueFileName; // 필요에 따라 다른 ID를 사용할 수 있습니다.
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