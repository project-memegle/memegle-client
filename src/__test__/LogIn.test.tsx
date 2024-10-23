import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import LogIn from '../pages/LogIn';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { describe, beforeEach } from '@jest/globals';
import ValidationMessages from '../components/Validations/ValidationMessages';
import { debug } from 'console';

jest.mock('axios');

describe('LogIn Component', () => {
    beforeEach(() => {
        (axios.post as jest.Mock).mockImplementation(() =>
            Promise.resolve({ data: { message: 'success' } })
        );
    });

    test('로그인 성공 메시지 확인', async () => {
        const mockPost = axios.post as jest.Mock;
        mockPost.mockResolvedValue({ data: { message: 'success' } });

        render(
            <MemoryRouter>
                <LogIn />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testlogin1' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'TestPassword1!' },
        });

        fireEvent.click(screen.getByText('로그인'));

        const message = await screen.findByText('success');
        expect(message).toBeInTheDocument();
    });
});

describe('LogIn Component', () => {
    test.only('로그인 실패 메시지 확인', async () => {
        const mockPost = axios.post as jest.Mock;
        mockPost.mockRejectedValue({
            response: { code: 50000 },
        });

        render(
            <MemoryRouter>
                <LogIn />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'wrongId' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'wrongPassword' },
        });

        fireEvent.click(screen.getByText('로그인'));

        const message = await screen.findByText(
            ValidationMessages.SERVER_ERROR
        );
        expect(message).toBeInTheDocument();
        debug();
    });
});
