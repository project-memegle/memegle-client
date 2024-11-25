import ValidateSpace from './ValidateSpace';
import getValidationMessages from './ValidationMessages';

const validateNickname = (nickname: string): string => {
    const trimmedNickname = ValidateSpace(nickname);
    const ValidationMessages = getValidationMessages();

    if (!trimmedNickname) {
        return ValidationMessages.REQUIRED_NICKNAME;
    }

    if (trimmedNickname.length < 2 || trimmedNickname.length > 20) {
        return ValidationMessages.INVALID_NICKNAME_LENGTH;
    }

    const nicknameRegex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9]*$/;

    if (!nicknameRegex.test(trimmedNickname)) {
        return ValidationMessages.INVALID_NICKNAME_TYPE;
    }

    return '';
};

export default validateNickname;
