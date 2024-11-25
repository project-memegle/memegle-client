import ValidateSpace from './ValidateSpace';
import getValidationMessages from './ValidationMessages';

const validateId = (id: string) => {
    const trimmedId = ValidateSpace(id);
    const ValidationMessages = getValidationMessages();

    if (!trimmedId) {
        return ValidationMessages.REQUIRED_ID;
    }
    if (trimmedId.length < 6) {
        return ValidationMessages.INVALID_ID_LENGTH;
    }
    if (trimmedId.length > 15) {
        return ValidationMessages.INVALID_ID_LENGTH; // 15자 초과 시 에러 메시지
    }
    const regex = /^[a-z0-9]+$/;
    if (!regex.test(trimmedId)) {
        return ValidationMessages.INVALID_ID_TYPE;
    }
    return '';
};

export default validateId;