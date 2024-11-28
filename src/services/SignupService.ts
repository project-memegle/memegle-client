import { post } from '../utils/API/fetcher';
import { SignUpDTO } from './dto/SignUpDto';
import axios from 'axios';

export const SIGN_UP_URL = '/users/sign/up';
export async function signUp(userData: SignUpDTO): Promise<void> {
    try {
        await post<void, SignUpDTO>(SIGN_UP_URL, userData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.code;
        }
        throw error;
    }
}
