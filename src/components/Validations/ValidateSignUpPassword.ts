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

    // 정규식을 사용하여 소문자, 대문자, 숫자, 특수문자 포함 여부 확인
    const hasLowerCase = /[a-z]/.test(trimmedPassword);
    const hasUpperCase = /[A-Z]/.test(trimmedPassword);
    const hasNumber = /\d/.test(trimmedPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword);

    if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar) {
        return ValidationMessages.INVALID_PASSWORD_TYPE;
    }

    return '';
};

export default validateSignUpPassword;
