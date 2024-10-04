import ValidationMessages from './ValidationMessages';
import ValidateSpace from './ValidateSpace';

const validateSignUpPassword = (
    password: string,
    passwordCheck: string
): string => {
    const trimmedPassword = ValidateSpace(password); // Remove all spaces
    const trimmedPasswordCheck = ValidateSpace(passwordCheck); // Remove all spaces

    if (!trimmedPassword || !trimmedPasswordCheck) {
        return ValidationMessages.REQUIRED_PASSWORD;
    }
    if (trimmedPassword.length < 8 || trimmedPassword.length > 20) {
        return ValidationMessages.INVALID_PASSWORD_LENGTH;
    }

    if (trimmedPassword !== trimmedPasswordCheck) {
        return ValidationMessages.PASSWORD_MISMATCH;
    }

    return '';
};

export default validateSignUpPassword;
