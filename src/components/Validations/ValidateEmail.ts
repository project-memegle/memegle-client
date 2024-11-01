import ValidationMessages from './ValidationMessages';
import ValidateSpace from './ValidateSpace';

const validateEmail = (email: string) => {
    const trimmedEmail = ValidateSpace(email);

    if (!trimmedEmail) {
        return ValidationMessages.REQUIRED_EMAIL;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
        return ValidationMessages.INVALID_EMAIL;
    }

    return '';
};

export default validateEmail;