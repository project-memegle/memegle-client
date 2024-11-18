import { get } from 'utils/API/fetcher';

export async function getNotification() {
    try {
        const url = '/notifications/state';
        const response = await get(url);
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
    }
}
