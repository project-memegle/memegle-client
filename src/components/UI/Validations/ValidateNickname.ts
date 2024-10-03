import ValidationMessages from './ValidationMessages';
import validateSpace from './ValidateSpace';
import validateType from './ValidateType';

const validateNickname = (nickname: string): string => {
    const trimmedNickname = validateSpace(nickname);

    if (!trimmedNickname) {
        return ValidationMessages.REQUIRED_NICKNAME;
    }
    if (trimmedNickname.length < 2 || trimmedNickname.length > 10) {
        return ValidationMessages.INVALID_NICKNAME_LENGTH;
    }

    const regex = new RegExp(
        `^[${validateType.VALIDATE_SPECIAL_CHARACTERS}]+$`
    );
    if (!regex.test(trimmedNickname)) {
        return ValidationMessages.INVALID_NICKNAME_TYPE;
    }
    return '';
};

export default validateNickname;
