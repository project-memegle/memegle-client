import ValidationMessages from './ValidationMessages';
import validateSpace from './ValidateSpace';

const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
const validateNickname = (nickname: string): string => {
    const trimmedNickname = validateSpace(nickname);

    if (!trimmedNickname) {
        return ValidationMessages.REQUIRED_NICKNAME;
    }
    if (trimmedNickname.length < 2 || trimmedNickname.length > 10) {
        return ValidationMessages.INVALID_NICKNAME_LENGTH;
    }

    const specialCharacters = "!@#$%^&*()_+[]{}|;:',.<>?";

    const escapedSpecialCharacters = escapeRegExp(specialCharacters);

    const regex = new RegExp(`^[a-zA-Z0-9${escapedSpecialCharacters}]*$`);
    if (!regex.test(trimmedNickname)) {
        return ValidationMessages.INVALID_NICKNAME_TYPE;
    }
    return '';
};

export default validateNickname;
