import ValidationMessages from 'components/Validations/ValidationMessages';
import { post } from '../utils/API/fetcher';
import axios from 'axios';
import { ChatItemDTO } from './dto/ChatDto';

export const POST_CHAT_URL = '/chat/send';
export async function postChat(userData: ChatItemDTO): Promise<void> {
    try {
        await post<void, ChatItemDTO>(POST_CHAT_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        }
        throw new Error(ValidationMessages.UNKNOWN_ERROR);
    }
}
