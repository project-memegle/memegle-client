import axios, { AxiosError } from 'axios';
import { handleErrorPage } from '../../pages/Error';
import getValidationMessages from '../../components/Validations/ValidationMessages';
const ValidationMessages = getValidationMessages();

const AxiosErrorMessages: Record<number, string> = {
    40000: ValidationMessages.REQUIRED_FORM,
    40001: ValidationMessages.INVALID_FORM,
    40002: ValidationMessages.EXIST_ID,
    40003: ValidationMessages.MISSING_FORM,
    40100: ValidationMessages.UNMATCHED_TOKEN,
    40101: ValidationMessages.INVALID_TOKEN,
    40102: ValidationMessages.INVALID_PASSWORD_LENGTH,
    40401: ValidationMessages.MISSING_RESOURCE,
    50000: ValidationMessages.SERVER_ERROR,
};

export const handleApiError = (
    error: AxiosError | unknown,
    setMessage?: (message: string) => void
) => {
    let message: string;

    if (!axios.isAxiosError(error) || !error.response) {
        message = ValidationMessages.UNKNOWN_ERROR;
        handleErrorPage(message);
        if (setMessage) {
            setMessage(message);
        }
        return;
    }

    const status = error.response.status;
    const statusCode = error.response.data.code;

    if (status === 200 || status === 204) {
        return;
    }

    message =
        AxiosErrorMessages[statusCode] || ValidationMessages.UNKNOWN_ERROR;

    handleErrorPage(message);
    if (setMessage) {
        setMessage(message);
    }
    return message;
};
