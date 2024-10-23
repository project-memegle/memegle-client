import axios, { AxiosError } from 'axios';
import { handleApiError } from '../../utils/handleApiError';
import ValidationMessages from '../../components/Validations/ValidationMessages';

jest.spyOn(axios, 'isAxiosError').mockImplementation(
    (error) => error.isAxiosError === true
);
describe('handleApiError', () => {
    let setMessage: jest.Mock;
    beforeEach(() => {
        setMessage = jest.fn();
    });

    test.each([
        [40001, ValidationMessages.INVALID_FORM],
        [40002, ValidationMessages.EXIST_USER],
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
