import ValidationMessages from './ValidationMessages';
import ValidateSpace from './ValidateSpace';

const validateSignUpPassword = (
    password: string,
    passwordCheck: string
): string => {
    const trimmedPassword = ValidateSpace(password);
    const trimmedPasswordCheck = ValidateSpace(passwordCheck);

    if (!trimmedPassword || !trimmedPasswordCheck) {
        return ValidationMessages.REQUIRED_PASSWORD;
    }
    if (
        trimmedPassword.length < 8 ||
        trimmedPassword.length > 20 ||
        trimmedPasswordCheck.length < 8 ||
        trimmedPasswordCheck.length > 20
    ) {
        return ValidationMessages.INVALID_PASSWORD_LENGTH;
    }
    if (trimmedPassword !== trimmedPasswordCheck) {
        return ValidationMessages.PASSWORD_MISMATCH;
    }

    return '';
};

export default validateSignUpPassword;
