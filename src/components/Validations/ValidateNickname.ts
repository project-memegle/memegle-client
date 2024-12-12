import ValidateSpace from './ValidateSpace';
import getValidationMessages from './ValidationMessages';

const validateNickname = (nickname: string): string => {
    const trimmedNickname = ValidateSpace(nickname);
    const ValidationMessages = getValidationMessages();

    console.log('Trimmed Nickname:', trimmedNickname);

    if (!trimmedNickname) {
        console.log('Validation Error:', ValidationMessages.REQUIRED_NICKNAME);
        return ValidationMessages.REQUIRED_NICKNAME;
    }

    if (trimmedNickname.length < 2 || trimmedNickname.length > 20) {
        console.log(
            'Validation Error:',
            ValidationMessages.INVALID_NICKNAME_LENGTH
        );
        return ValidationMessages.INVALID_NICKNAME_LENGTH;
    }

    // 한글 완성형 + 영문 + 숫자만 허용
    const nicknameRegex = /^[a-zA-Z가-힣0-9]*$/;
    if (!nicknameRegex.test(trimmedNickname)) {
        console.log(
            'Validation Error:',
            ValidationMessages.INVALID_NICKNAME_TYPE
        );
        return ValidationMessages.INVALID_NICKNAME_TYPE;
    }

    // 분리된 자모음(예: ㄱ, ㄴ, ㅏ 등)이 포함된 경우 허용하지 않음
    const incompleteHangulRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
    if (incompleteHangulRegex.test(trimmedNickname)) {
        console.log(
            'Validation Error:',
            ValidationMessages.INVALID_NICKNAME_TYPE
        );
        return ValidationMessages.INVALID_NICKNAME_TYPE;
    }

    return '';
};

export default validateNickname;
