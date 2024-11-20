import ValidationMessages from 'components/Validations/ValidationMessages';
import { post } from '../utils/API/fetcher';
import { SignUpDTO } from './dto/SignUpDto';
import axios from 'axios';

export const SIGN_UP_URL = '/users/sign/up';
export async function signUp(userData: SignUpDTO): Promise<void> {
    try {
        await post<void, SignUpDTO>(SIGN_UP_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error; // AxiosError를 호출자에게 전달
        }
        throw new Error(ValidationMessages.UNKNOWN_ERROR);
    }
}
