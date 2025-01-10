import { getFirestore, doc, setDoc } from 'firebase/firestore';

/**
 * @param {string} collectionName
 * @param {string} documentId
 * @param {object} data
 * @returns {Promise<void>}
 */
export async function addDataToFirestore(
    collectionName: string,
    documentId: string,
    data: object
): Promise<void> {
    const db = getFirestore();

    try {
        const docRef = doc(db, collectionName, documentId);
        await setDoc(docRef, data);
        console.log(
            `Document successfully written to ${collectionName}/${documentId}`
        );
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
    }
}
