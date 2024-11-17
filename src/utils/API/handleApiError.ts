import axios, { AxiosError } from 'axios';
import ValidationMessages from '../../components/Validations/ValidationMessages';
import { handleErrorPage } from '../../pages/Error';

const errorMessages: Record<number, string> = {
    40000: ValidationMessages.LOGIN_FAILED,
    40001: ValidationMessages.INVALID_FORM,
    40002: ValidationMessages.EXIST_USER,
    40003: ValidationMessages.MISSING_FORM,
    40102: ValidationMessages.INVALID_PASSWORD_LENGTH,
    40401: ValidationMessages.MISSING_RESOURCE,
    50000: ValidationMessages.SERVER_ERROR,
};

export const handleAxiosError = (
    error: AxiosError,
    setMessage: (message: string) => void
) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        const message =
            status !== undefined
                ? errorMessages[status]
                : ValidationMessages.UNKNOWN_ERROR;
        setMessage(message);
        handleErrorPage(message);
    } else {
        setMessage(ValidationMessages.UNKNOWN_ERROR);
    }
};

const networkErrorMessages: Record<string, string> = {
    ECONNABORTED: ValidationMessages.TIMEOUT_ERROR,
    ENETUNREACH: ValidationMessages.NETWORK_ERROR,
    ECONNREFUSED: ValidationMessages.CONNECTION_REFUSED,
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
    error: AxiosError | Error | unknown,
    setMessage: (message: string) => void
) => {
    if (axios.isAxiosError(error)) {
        handleAxiosError(error, setMessage);
    } else if (error instanceof Error) {
        handleNetworkError(error, setMessage);
    } else {
        setMessage(ValidationMessages.UNKNOWN_ERROR);
    }
};
