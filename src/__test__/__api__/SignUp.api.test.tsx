import axios, { AxiosError } from 'axios';
import { handleApiError } from '../../utils/handleApiError';
import ValidationMessages from '../../components/Validations/ValidationMessages';

jest.spyOn(axios, 'isAxiosError').mockImplementation(
    (error) => error.isAxiosError === true
);
describe('handleApiError', () => {
    let setMessage: jest.Mock;

    beforeEach(() => {
        setMessage = jest.fn(); // setMessage를 모킹하여 메시지를 설정하는 함수로 사용
    });

    test.each([
        [40001, ValidationMessages.INVALID_FORM],
        [40002, ValidationMessages.EXIST_USER],
        [50000, ValidationMessages.SERVER_ERROR],
    ])('handles status code %d correctly', (status, expectedMessage) => {
        const error: AxiosError = {
            isAxiosError: true,
            response: {
                status: status, // 숫자로 변환하여 설정
                data: {},
                headers: {},
            },
            config: {},
            toJSON: () => ({}),
        } as AxiosError;
        console.log('error', error.response?.status);
        handleApiError(error, setMessage); // 에러를 처리하는 함수 호출
        // setMessage 호출 로그
        console.log('setMessage calls:', setMessage.mock.calls);
        expect(setMessage).toHaveBeenCalledWith(expectedMessage); // 올바른 메시지가 설정되었는지 확인
    });
});
