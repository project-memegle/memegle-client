import ValidateSpace from './ValidateSpace';
import getValidationMessages from './ValidationMessages';

const validateEmail = (email: string) => {
    const trimmedEmail = ValidateSpace(email);
    const ValidationMessages = getValidationMessages();

    if (!trimmedEmail) {
        return ValidationMessages.REQUIRED_EMAIL;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
        return ValidationMessages.INVALID_EMAIL_TYPE;
    }

    return '';
};

export default validateEmail;
