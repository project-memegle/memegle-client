import axios, { AxiosError } from 'axios';
import ValidationMessages from '../../components/Validations/ValidationMessages';
import { handleErrorPage } from '../../pages/Error';

interface ErrorResponse {
    code?: number;
}

const errorMessages: Record<number, string> = {
    40000: ValidationMessages.LOGIN_FAILED,
    40001: ValidationMessages.INVALID_FORM,
    40002: ValidationMessages.EXIST_USER,
    40003: ValidationMessages.MISSING_FORM,
    40101: ValidationMessages.INVALID_TOKEN,
    40102: ValidationMessages.INVALID_PASSWORD_LENGTH,
    40401: ValidationMessages.MISSING_RESOURCE,
    50000: ValidationMessages.SERVER_ERROR,
};

const networkErrorMessages: Record<string, string> = {
    ECONNABORTED: ValidationMessages.TIMEOUT_ERROR,
    ENETUNREACH: ValidationMessages.NETWORK_ERROR,
    ECONNREFUSED: ValidationMessages.CONNECTION_REFUSED,
};

export const handleAxiosError = (
    error: AxiosError<ErrorResponse>,
    setMessage: (message: string) => void
) => {
    const status = error.response?.data?.code;
    let message: string;

    if (typeof status === 'number') {
        message = errorMessages[status] || ValidationMessages.UNKNOWN_ERROR;
    } else {
        message = ValidationMessages.UNKNOWN_ERROR;
    }

    setMessage(message);
    handleErrorPage(message);
};

const handleNetworkError = (
    error: Error,
    setMessage: (message: string) => void
) => {
    const message =
        networkErrorMessages[error.message] || ValidationMessages.UNKNOWN_ERROR;
    handleErrorPage(message);
    setMessage(message);
};

export const handleApiError = (
    error: AxiosError<ErrorResponse> | Error | unknown,
    setMessage: (message: string) => void
) => {
    if (error instanceof Error) {
        console.log('====================================');
        console.log('네트워크에러');
        console.log('====================================');
        handleNetworkError(error, setMessage);
        return;
    }

    if (axios.isAxiosError(error)) {
        console.log('====================================');
        console.log('악씨오쓰에러');
        console.log('====================================');
        handleAxiosError(error, setMessage);
        return;
    }

    setMessage(ValidationMessages.UNKNOWN_ERROR);
};
