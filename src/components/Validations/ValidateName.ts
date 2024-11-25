import ValidateSpace from './ValidateSpace';
import getValidationMessages from './ValidationMessages';

const validateName = (name: string) => {
    const trimmedName = ValidateSpace(name);
    const ValidationMessages = getValidationMessages();

    if (!trimmedName) {
        return ValidationMessages.REQUIRED_NAME;
    }

    const regex = /^[a-zA-Z가-힣]+$/;
    if (!regex.test(trimmedName)) {
        return ValidationMessages.INVALID_NAME_TYPE;
    }
    return '';
};

export default validateName;
