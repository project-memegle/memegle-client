// Define the structure of the error messages object
type ValidationMessagesProps = Record<string, string>;

// Create an object to store error messages
const ValidationMessages: ValidationMessagesProps = {
    DEFAULT_ID: '아이디',
    DEFAULT_PASSWORD: '비밀번호',
    DEFAULT_NICKNAME: '닉네임',
    DEFAULT_EMAIL: '이메일',
    REQUIRED_ID: '아이디를 입력해주세요.',
    INVALID_ID_LENGTH: '아이디는 최소 6자 이상이어야 합니다.',
    INVALID_ID_TYPE: '아이디는 영어와 숫자만 허용됩니다.',
    REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
    INVALID_PASSWORD_LENGTH: '비밀번호는 최소 8자 이상이어야 합니다.',
    PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
    SIGNUP_FAILED: '회원가입 실패',
    SIGNUP_SUCCESS: '회원가입 성공',
    REQUIRED_VERIFY_CODE: '인증번호를 입력해주세요.',
    REQUIRED_NICKNAME: '닉네임을 입력해주세요.',
    INVALID_NICKNAME_LENGTH:
        '닉네임는 최소 8자 이상에서 10자 이하이어야 합니다.',
    INVALID_NICKNAME_TYPE: '닉네임은 특수문자를 사용할 수 없습니다.',
    INVALID_FORM: '양식을 다시 확인해주세요.',
    EXIST_ID: '이미 존재하는 아이디입니다.',
    NO_RESOURCE: '리소스를 찾을 수 없습니다.',
    SERVER_ERROR: '서버 에러입니다. 고객센터에 문의해주세요',
    UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다. 고객센터에 문의해주세요',
    INVALID_USER: '인증 정보가 일치하지 않습니다.',
    MISSED_RESOURCE: '리소스를 찾을 수 없습니다.',
};

export default ValidationMessages;
