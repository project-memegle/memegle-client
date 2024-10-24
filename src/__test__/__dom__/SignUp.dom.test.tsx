import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from '../../pages/SignUp';
import '@testing-library/jest-dom';
import ValidationMessages from '../../components/Validations/ValidationMessages';
describe('회원가입 렌더링 확인', () => {
    test('input과 버튼 렌더링', () => {
        render(<SignUp />);

        // 입력 필드가 화면에 나타나는지 확인
        expect(screen.getByLabelText(/아이디/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/닉네임/i)).toBeInTheDocument();

        // 비밀번호 필드가 두 개 있는지 확인
        const passwordFields = screen.getAllByLabelText(/비밀번호/i);
        expect(passwordFields.length).toBe(2); // 비밀번호 필드가 2개인지 확인
        expect(passwordFields[0]).toBeInTheDocument();
        expect(passwordFields[1]).toBeInTheDocument();

        // 비밀번호 확인 필드가 존재하는지 확인
        expect(screen.getByLabelText(/비밀번호 확인/i)).toBeInTheDocument();

        // 버튼이 화면에 나타나는지 확인
        expect(
            screen.getByRole('button', { name: /회원가입/i })
        ).toBeInTheDocument();
    });

    test('아이디 입력 필드에 잘못된 값 입력시 에러메세지 발생 확인', () => {
        render(<SignUp />);

        // 아이디 입력 필드에 잘못된 값 입력
        const idInput = screen.getByLabelText(/아이디/i);
        fireEvent.change(idInput, { target: { value: '한글아이디다' } });

        // 에러 메시지가 화면에 나타나는지 확인
        expect(
            screen.getByText(ValidationMessages.INVALID_ID_TYPE)
        ).toBeInTheDocument();
    });

    test('닉네임 입력 필드에 잘못된 값 입력시 에러메세지 발생 확인', () => {
        render(<SignUp />);

        // 닉네임 입력 필드에 잘못된 값 입력
        const nicknameInput = screen.getByLabelText(/닉네임/i);
        fireEvent.change(nicknameInput, {
            target: { value: 'invalidnickname!' },
        });

        // 에러 메시지가 화면에 나타나는지 확인
        expect(
            screen.getByText(ValidationMessages.INVALID_NICKNAME_TYPE)
        ).toBeInTheDocument();
    });

    test.only('비밀번호 입력 필드에 잘못된 값 입력시 에러메세지 발생 확인', () => {
        render(<SignUp />);

        // 비밀번호 입력 필드에 값 입력
        const passwordInput = screen.getByLabelText(/비밀번호/i);
        fireEvent.change(passwordInput, {
            target: { value: 'asd' },
        });

        // 비밀번호 확인 입력 필드에 다른 값 입력
        const passwordCheckInput = screen.getByLabelText(/비밀번호 확인/i);
        fireEvent.change(passwordCheckInput, {
            target: { value: 'asd' },
        });
        // 에러 메시지가 화면에 나타나는지 확인
        expect(
            screen.getByText(ValidationMessages.INVALID_PASSWORD_LENGTH)
        ).toBeInTheDocument();
    });

    test('비밀번호 확인 입력 필드에 비밀번호와 다른 값 입력시 에러메세지 발생 확인', () => {
        render(<SignUp />);

        // 비밀번호 입력 필드에 값 입력
        const passwordInput = screen.getByLabelText(/비밀번호/i);
        fireEvent.change(passwordInput, {
            target: { value: 'TestPassword1!' },
        });

        // 비밀번호 확인 입력 필드에 다른 값 입력
        const passwordCheckInput = screen.getByLabelText(/비밀번호 확인/i);
        fireEvent.change(passwordCheckInput, {
            target: { value: 'DifferentPassword1!' },
        });

        // 에러 메시지가 화면에 나타나는지 확인
        expect(
            screen.getByText(ValidationMessages.PASSWORD_MISMATCH)
        ).toBeInTheDocument();
    });

    test('모든 폼에 유효한 값 입력시 성공메세지 출력', async () => {
        const { findByText } = render(<SignUp />);

        // 모든 필드에 유효한 값 입력
        fireEvent.change(screen.getByLabelText(/아이디/i), {
            target: { value: 'testloginid1' },
        });
        fireEvent.change(screen.getByLabelText(/닉네임/i), {
            target: { value: 'testNickname1' },
        });
        const passwordInputs = screen.getAllByLabelText(/비밀번호/i);
        fireEvent.change(passwordInputs[0], {
            target: { value: 'TestPassword1!' },
        });
        fireEvent.change(passwordInputs[1], {
            target: { value: 'TestPassword1!' },
        });
        // 회원가입 버튼 클릭
        fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));

        // 성공 메시지가 나타나는지 확인
        expect(
            await findByText(ValidationMessages.SIGNUP_SUCCESS)
        ).toBeInTheDocument();
    });
});
