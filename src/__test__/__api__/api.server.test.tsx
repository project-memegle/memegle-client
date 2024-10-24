import { handleApiError } from '../../utils/handleApiError';
import ValidationMessages from '../../components/Validations/ValidationMessages';

jest.mock('axios');
describe('api 네트워크 소통 실패 테스트', () => {
    let setMessage: jest.Mock;

    beforeEach(() => {
        setMessage = jest.fn();
    });

    test.each([
        ['ECONNABORTED', ValidationMessages.TIMEOUT_ERROR],
        ['ENETUNREACH', ValidationMessages.NETWORK_ERROR],
        ['ECONNREFUSED', ValidationMessages.CONNECTION_REFUSED],
    ])('handles network error code %s correctly', (code, expectedMessage) => {
        const error: Error & { code?: string } = new Error(code);
        handleApiError(error, setMessage);
        expect(setMessage).toHaveBeenCalledWith(expectedMessage);
    });
});
