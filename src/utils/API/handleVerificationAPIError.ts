import { AxiosError } from 'axios';
import getValidationMessages from 'components/Validations/ValidationMessages';

const ValidationMessages = getValidationMessages();

const VerificationErrorMessages: Record<number, string> = {
    40105: ValidationMessages.FAILED_VERIFICATION_CODE,
    40106: ValidationMessages.NONEXIST_VARIFICATION_INFO,
    40001: ValidationMessages.INVALID_CODE_TYPE,
    5000: ValidationMessages.SERVER_ERROR,
};

export const handleVerificationApiError = (
    error: AxiosError | unknown,
    setMessage?: (message: string) => void
) => {
    let message: string;

    if (!(error instanceof AxiosError) || !error.response) {
        message = ValidationMessages.UNKNOWN_ERROR;
        if (setMessage) {
            setMessage(message);
        }
        return;
    }

    const statusCode = error.response.status;

    message = VerificationErrorMessages[statusCode] || ValidationMessages.UNKNOWN_ERROR;

    if (setMessage) {
        setMessage(message);
    }
    return message;
};