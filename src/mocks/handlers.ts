import { rest } from 'msw';
import ValidationMessages from '../components/UI/Validations/ValidationMessages';

interface LoginRequest {
    id: string;
    password: string;
}
interface SignupRequest {
    username: string;
    nickname: string;
    password: string;
}
export const handlers = [
    // rest.post('/login', (req, res, ctx) => {
    //     const { id, password } = req.body as LoginRequest;

    //     if (id === 'testid1' && password === 'testpassword1') {
    //         console.log('로그인 통신 요청 받음');
    //         return res(ctx.status(200), ctx.json({ message: 'success' }));
    //     } else {
    //         console.log('로그인 통신 요청 에러');
    //         return res(ctx.status(400), ctx.json({ message: 'fail' }));
    //     }
    // }),
    rest.post('/signup', (req, res, ctx) => {
        console.log('회원가입 통신 요청 받음');
        const { username, nickname, password } = req.body as SignupRequest;

        if (username && nickname && password) {
            return res(
                ctx.status(200),
                ctx.json({ message: ValidationMessages.SIGNUP_SUCCESS })
            );
        } else {
            return res(
                ctx.status(400),
                ctx.json({
                    message: ValidationMessages.SIGNUP_FAILED,
                    error: ValidationMessages.SIGNUP_FAILED,
                })
            );
        }
    }),
];
