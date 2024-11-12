import ValidationMessages from './ValidationMessages';
import ValidateSpace from './ValidateSpace';

const validateLogInPassword = (password: string): string => {
    const trimmedPassword = ValidateSpace(password);

    if (!trimmedPassword) {
        return ValidationMessages.REQUIRED_PASSWORD;
    }
    if (trimmedPassword.length < 8 || trimmedPassword.length > 20) {
        return ValidationMessages.INVALID_PASSWORD_LENGTH;
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

export default validateLogInPassword;
