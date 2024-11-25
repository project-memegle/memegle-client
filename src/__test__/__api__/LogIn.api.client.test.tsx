import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LogIn from '../../pages/LogIn';
import { setCookie, getCookie } from '../../utils/Storage/cookies';
import { MemoryRouter } from 'react-router-dom';
import getValidationMessages from '../../components/Validations/ValidationMessages';
jest.mock('../../utils/cookies');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedSetCookie = setCookie as jest.MockedFunction<typeof setCookie>;
const mockedGetCookie = getCookie as jest.MockedFunction<typeof getCookie>;

beforeAll(() => {
    process.env.ACCESS_TOKEN_STORE = '3600'; // Mock value for access token store duration
    process.env.REFRESH_TOKEN_STORE = '7200'; // Mock value for refresh token store duration
});

test('로그인 APi 성공 테스트', async () => {
    const ValidationMessages = getValidationMessages();
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Success' } });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
        <MemoryRouter>
            <LogIn />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'testloginid1' },
    });

    fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'TestPassword1!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));

    await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith(
            ValidationMessages.LOGIN_SUCCESS
        );
    });

    expect(mockedAxios.post).toHaveBeenCalledWith('/login', {
        loginId: 'testloginid1',
        password: 'TestPassword1!',
    });
});

test('로그인시 쿠키 저장 성공 테스트', async () => {
    const mockResponse = {
        data: {
            access_token: 'mockAccessToken',
            refresh_token: 'mockRefreshToken',
        },
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    render(
        <MemoryRouter>
            <LogIn />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'testloginid1' },
    });

    fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'TestPassword1!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));

    await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith('/login', {
            loginId: 'testloginid1',
            password: 'TestPassword1!',
        });
    });

    await waitFor(() => {
        expect(mockedSetCookie).toHaveBeenCalledWith(
            'access_token',
            'mockAccessToken',
            expect.any(Number)
        );
        expect(mockedSetCookie).toHaveBeenCalledWith(
            'refresh_token',
            'mockRefreshToken',
            expect.any(Number)
        );
    });

    await waitFor(() => {
        expect(mockedGetCookie).toHaveBeenCalledWith('access_token');
        expect(mockedGetCookie).toHaveBeenCalledWith('refresh_token');
    });
});
