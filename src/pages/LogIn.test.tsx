import { render, screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers.ts';
import LogIn from './LogIn';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, beforeAll, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom';
const server = setupServer(...handlers);
server.listen({
    onUnhandledRequest: 'warn',
});

describe('LogIn Component', () => {
    // 테스트 서버 시작 및 종료
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it.only('로그인 성공 메시지 확인', async () => {
        render(
            <MemoryRouter>
                <LogIn />
            </MemoryRouter>
        );
        // Fill in the input fields
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testlogin1' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'TestPassword1!' },
        });
        // Submit the form
        fireEvent.click(screen.getByText('로그인'));
        // 응답 메시지를 확인합니다.
        const message = await screen.findByText('success');
        expect(message).toBeInTheDocument();
    });

    it('로그인 실패 메시지 확인', async () => {
        render(
            <MemoryRouter>
                <LogIn />
            </MemoryRouter>
        );
        // 잘못된 자격 증명으로 입력 필드에 값을 입력합니다.
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'wrongId' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'wrongPassword' },
        });
        // 폼을 제출합니다.
        fireEvent.click(screen.getByText('로그인'));
        screen.debug();
        // 응답 메시지를 확인합니다.
        const message = await screen.findByText((content) =>
            content.includes('fail')
        );
        expect(message).toBeInTheDocument();
    });
});
