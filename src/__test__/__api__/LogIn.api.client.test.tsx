import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ValidationMessages from '../../components/Validations/ValidationMessages'; // Adjust the import path as necessary
import LogIn from '../../pages/LogIn';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('로그인 APi 성공 테스트', async () => {
    // Mock the axios post request to return a successful response
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

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));

    // Wait for the success message to appear
    await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith(
            ValidationMessages.LOGIN_SUCCESS
        );
    });

    // Ensure the axios post request was called with the correct data
    expect(mockedAxios.post).toHaveBeenCalledWith('/login', {
        loginId: 'testloginid1',
        password: 'TestPassword1!',
    });
});
