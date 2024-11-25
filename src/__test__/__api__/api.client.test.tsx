import axios, { AxiosError } from 'axios';
import { handleApiError } from '../../utils/API/handleApiError';
import getValidationMessages from '../../components/Validations/ValidationMessages';

jest.spyOn(axios, 'isAxiosError').mockImplementation(
    (error) => error.isAxiosError === true
);
describe('api 에러 반환 테스트', () => {
    let setMessage: jest.Mock;
    beforeEach(() => {
        setMessage = jest.fn();
    });
    const ValidationMessages = getValidationMessages();

    test.each([
        [40000, ValidationMessages.LOGIN_FAILED],
        [40001, ValidationMessages.INVALID_FORM],
        [40002, ValidationMessages.EXIST_ID],
        [40003, ValidationMessages.MISSING_FORM],
        [40102, ValidationMessages.INVALID_PASSWORD_LENGTH],
        [40401, ValidationMessages.MISSING_RESOURCE],
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
