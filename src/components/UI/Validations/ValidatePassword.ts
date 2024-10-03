import ValidationMessages from './ValidationMessages';
import ValidateSpace from './ValidateSpace';

const validatePassword = (password: string) => {
    const trimmedPassword = ValidateSpace(password); // Remove all spaces

    if (!trimmedPassword) {
        return ValidationMessages.REQUIRED_PASSWORD;
    }
    if (trimmedPassword.length < 8) {
        return ValidationMessages.INVALID_PASSWORD_LENGTH;
    }
    return '';
};

export default validatePassword;
