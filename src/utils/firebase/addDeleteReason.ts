import { addDataToFirestore } from './addDataToFirestore';

async function addDeleteReason(reason: string): Promise<void> {
    const collectionName = 'deleteReasons';
    const documentId = 'deleteReasons';
    const data = {
        deleteReasons: reason,
    };

    try {
        await addDataToFirestore(collectionName, documentId, data);
        console.log('Delete reasons added successfully!');
    } catch (error) {
        console.error('Failed to add delete reasons: ', error);
    }
}

export default addDeleteReason;
