import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, it, beforeAll, afterEach, afterAll, expect } from 'vitest';
import SignUp from './SignUp';
import ValidationMessages from '../components/UI/Validations/ValidationMessages';

// 서버 핸들러
const server = setupServer(
    rest.post<{ id: string; nickname: string; password: string }>(
        '/signup',
        (req, res, ctx) => {
            const { id, nickname, password } = req.body;
            // 여기에 성공적인 응답을 시뮬레이션
            if (id && nickname && password) {
                return res(
                    ctx.status(200),
                    ctx.json({ message: ValidationMessages.SIGNUP_SUCCESS })
                );
            }
            // 실패하는 경우
            return res(
                ctx.status(400),
                ctx.json({ message: ValidationMessages.SIGNUP_FAILED })
            );
        }
    )
);

// 테스트 서버 시작 및 종료
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SignUp Component', () => {
    it('회원가입 폼 렌더링 테스트', () => {
        render(<SignUp />);
        expect(screen.getByPlaceholderText('아이디')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('닉네임')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('비밀번호 확인')
        ).toBeInTheDocument();
    });

    it('사용자가 하나라도 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.click(screen.getByText('회원가입'));

        expect(
            await screen.findByText(ValidationMessages.REQUIRED_ID)
        ).toBeInTheDocument();
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_PASSWORD)
        ).toBeInTheDocument();
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_NICKNAME)
        ).toBeInTheDocument();
    });

    it('사용자가 아이디 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: '' },
        });
        fireEvent.click(screen.getByText('회원가입'));
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_ID)
        ).toBeInTheDocument();
    });

    it('사용자가 비밀번호 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testid' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: 'testnickname' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: '' },
        });
        fireEvent.click(screen.getByText('회원가입'));
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_PASSWORD)
        ).toBeInTheDocument();
    });

    it('사용자가 비밀번호가 일치하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testid' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: 'testnickname' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'abcd1234abc' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: 'abc1234' },
        });
        fireEvent.click(screen.getByText('회원가입'));
        expect(
            await screen.findByText(ValidationMessages.PASSWORD_MISMATCH)
        ).toBeInTheDocument();
    });

    it('사용자가 닉네임 입력하지 않았을 때', async () => {
        render(<SignUp />);
        fireEvent.change(screen.getByPlaceholderText('아이디'), {
            target: { value: 'testid1' },
        });
        fireEvent.change(screen.getByPlaceholderText('닉네임'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
            target: { value: 'testpassword1' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
            target: { value: 'testpassword1' },
        });
        fireEvent.click(screen.getByText('회원가입'));
        expect(
            await screen.findByText(ValidationMessages.REQUIRED_NICKNAME)
        ).toBeInTheDocument();
    });
});
