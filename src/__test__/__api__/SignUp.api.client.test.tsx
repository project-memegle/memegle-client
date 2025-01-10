import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SignUp from '../../pages/SignUp'; // Adjust the import path as necessary
import getValidationMessages from '../../components/Validations/ValidationMessages';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('회원가입 APi 성공 테스트', async () => {
    // Mock the axios post request to return a successful response
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Success' } });
    const ValidationMessages = getValidationMessages();

    render(<SignUp />);

    // Fill in the form fields with valid values
    fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'testloginid1' },
    });
    fireEvent.change(screen.getByPlaceholderText('닉네임'), {
        target: { value: 'testNickname1' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'TestPassword1!' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
        target: { value: 'TestPassword1!' },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));

    // Wait for the success message to appear
    await waitFor(() => {
        expect(
            screen.getByText(ValidationMessages.SIGNUP_SUCCESS)
        ).toBeInTheDocument();
    });

    // Ensure the axios post request was called with the correct data
    expect(mockedAxios.post).toHaveBeenCalledWith('/signup', {
        loginId: 'testloginid1',
        nickname: 'testNickname1',
        password: 'TestPassword1!',
    });
});
