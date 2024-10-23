import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SignUp from '../../pages/SignUp';
import { handleApiError } from '../../utils/handleApiError';

jest.mock('../util/handleApiError', () => ({
    handleApiError: jest.fn(),
}));

jest.mock('axios'); // Mock axios

describe('SignUp Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks before each test
    });

    test('renders SignUp form', () => {
        render(<SignUp />);

        // Check if input fields and button are in the document
        expect(screen.getByLabelText(/아이디/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/닉네임/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/비밀번호 확인/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /회원가입/i })
        ).toBeInTheDocument();
    });

    test('submits form with valid data', async () => {
        render(<SignUp />);

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/아이디/i), {
            target: { value: 'testUser' },
        });
        fireEvent.change(screen.getByLabelText(/닉네임/i), {
            target: { value: 'testNickname' },
        });
        fireEvent.change(screen.getByLabelText(/비밀번호/i), {
            target: { value: 'TestPassword123!' },
        });
        fireEvent.change(screen.getByLabelText(/비밀번호 확인/i), {
            target: { value: 'TestPassword123!' },
        });

        // Mock the Axios post response
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));

        // Wait for the success message
        await waitFor(() => {
            expect(screen.getByText(/회원가입 성공/i)).toBeInTheDocument(); // Adjust according to your success message
        });

        expect(axios.post).toHaveBeenCalledWith('/signup', {
            loginId: 'testUser',
            nickname: 'testNickname',
            password: 'TestPassword123!',
        });
    });

    test('shows error message on API failure', async () => {
        render(<SignUp />);

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/아이디/i), {
            target: { value: 'testUser' },
        });
        fireEvent.change(screen.getByLabelText(/닉네임/i), {
            target: { value: 'testNickname' },
        });
        fireEvent.change(screen.getByLabelText(/비밀번호/i), {
            target: { value: 'TestPassword123!' },
        });
        fireEvent.change(screen.getByLabelText(/비밀번호 확인/i), {
            target: { value: 'TestPassword123!' },
        });

        // Mock the Axios post to reject with an error
        const errorMessage = 'Failed to sign up';
        (axios.post as jest.Mock).mockRejectedValueOnce(
            new Error(errorMessage)
        );

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));

        // Wait for the error message
        await waitFor(() => {
            expect(handleApiError).toHaveBeenCalled(); // Check if error handling was called
            expect(screen.getByText(errorMessage)).toBeInTheDocument(); // Adjust according to your error message handling
        });
    });
});
