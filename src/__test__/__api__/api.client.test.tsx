import axios, { AxiosError } from 'axios';
import ValidationMessages from '../../components/Validations/ValidationMessages';
import { handleApiError } from 'utils/API/handleApiError';

jest.spyOn(axios, 'isAxiosError').mockImplementation(
    (error) => error.isAxiosError === true
);
describe('api 에러 반환 테스트', () => {
    let setMessage: jest.Mock;
    beforeEach(() => {
        setMessage = jest.fn();
    });

    test.each([
        [40000, ValidationMessages.LOGIN_FAILED],
        [40001, ValidationMessages.INVALID_FORM],
        [40002, ValidationMessages.EXIST_USER],
        [40003, ValidationMessages.MISSED_FORM],
        [40102, ValidationMessages.INVALID_PASSWORD_LENGTH],
        [40401, ValidationMessages.MISSED_RESOURCE],
        [50000, ValidationMessages.SERVER_ERROR],
    ])('handles status code %d correctly', (status, expectedMessage) => {
        const error: AxiosError = {
            isAxiosError: true,
            response: {
                status: status,
                data: {},
                headers: {},
            },
            config: {},
            toJSON: () => ({}),
        } as AxiosError;
        console.log('error', error.response?.status);
        handleApiError(error, setMessage);
        expect(setMessage).toHaveBeenCalledWith(expectedMessage);
    });
});
