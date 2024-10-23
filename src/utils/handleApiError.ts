import axios, { AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';

const errorMessages: Record<number, string> = {
    40000: ValidationMessages.LOGIN_FAILED,
    40001: ValidationMessages.INVALID_FORM,
    40002: ValidationMessages.EXIST_USER,
    40003: ValidationMessages.MISSED_FORM,
    40102: ValidationMessages.INVALID_PASSWORD_LENGTH,
    40401: ValidationMessages.NO_RESOURCE,
    50000: ValidationMessages.SERVER_ERROR,
};

export const handleApiError = (
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
    } else {
        setMessage(ValidationMessages.UNKNOWN_ERROR);
    }
};
