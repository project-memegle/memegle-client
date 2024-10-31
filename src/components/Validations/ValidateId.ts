import ValidationMessages from './ValidationMessages';
import ValidateSpace from './ValidateSpace';

const validateId = (id: string) => {
    const trimmedId = ValidateSpace(id);

    if (!trimmedId) {
        return ValidationMessages.REQUIRED_ID;
    }
    if (trimmedId.length < 6) {
        return ValidationMessages.INVALID_ID_LENGTH;
    }
    const regex = /^[a-z0-9]+$/;
    if (!regex.test(trimmedId)) {
        return ValidationMessages.INVALID_ID_TYPE;
    }
    return '';
};

export default validateId;
