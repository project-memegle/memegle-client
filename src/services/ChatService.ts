import { post } from '../utils/API/fetcher';
import axios from 'axios';
import { ChatItemDTO } from './dto/ChatDto';
import getValidationMessages from 'components/Validations/ValidationMessages';

export const POST_CHAT_URL = '/chat/send';
export async function postChat(userData: ChatItemDTO): Promise<void> {
    const ValidationMessages = getValidationMessages();
    try {
        await post<void, ChatItemDTO>(POST_CHAT_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        }
        throw new Error(ValidationMessages.UNKNOWN_ERROR);
    }
}
