import ValidationMessages from 'components/Validations/ValidationMessages';
import { post } from '../utils/API/fetcher';
import { SignUpDTO } from './dto/SignUpDto';
import { AxiosResponse } from 'axios';

export async function signUp(userData: SignUpDTO): Promise<void> {
    const response: AxiosResponse<void> = await post<void, SignUpDTO>(
        '/users/sign/up',
        userData
    );

    if (response.status !== 200 && response.status !== 204) {
        throw new Error(ValidationMessages.FAILED_EVENT);
    }
}
