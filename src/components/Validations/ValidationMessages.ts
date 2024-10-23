// Define the structure of the error messages object
type ValidationMessagesProps = Record<string, string>;

// Create an object to store error messages
const ValidationMessages: ValidationMessagesProps = {
    // Default fields
    DEFAULT_ID: '아이디',
    DEFAULT_PASSWORD: '비밀번호',
    DEFAULT_NICKNAME: '닉네임',
    DEFAULT_EMAIL: '이메일',

    // Required field errors
    REQUIRED_ID: '아이디를 입력해주세요.',
    REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
    REQUIRED_VERIFY_CODE: '인증번호를 입력해주세요.',
    REQUIRED_NICKNAME: '닉네임을 입력해주세요.',

    // Invalid field errors
    INVALID_ID_LENGTH: '아이디는 최소 6자 이상이어야 합니다.',
    INVALID_ID_TYPE: '아이디는 영어와 숫자만 허용됩니다.',
    INVALID_PASSWORD_LENGTH: '비밀번호는 최소 8자 이상이어야 합니다.',
    PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
    INVALID_NICKNAME_LENGTH:
        '닉네임은 최소 8자 이상에서 10자 이하이어야 합니다.',
    INVALID_NICKNAME_TYPE: '닉네임은 특수문자를 사용할 수 없습니다.',
    INVALID_FORM: '양식을 다시 확인해주세요.',
    INVALID_USER: '인증 정보가 일치하지 않습니다.',

    // Existence errors
    EXIST_ID: '이미 존재하는 아이디입니다.',
    EXIST_USER: '이미 존재하는 회원입니다.',

    // Resource and form errors
    NO_RESOURCE: '리소스를 찾을 수 없습니다.',
    MISSED_FORM: '필수값을 입력해주세요.',

    // Server and unknown errors
    SERVER_ERROR: '서버 에러입니다. 고객센터에 문의해주세요.',
    UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다. 고객센터에 문의해주세요.',

    // Success messages
    SIGNUP_FAILED: '회원가입 실패',
    SIGNUP_SUCCESS: '회원가입 성공',
    NETWORK_ERROR:
        '네트워크 연결에 문제가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.',
    TIMEOUT_ERROR: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    CONNECTION_REFUSED: '서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.',
    SERVICE_UNAVAILABLE:
        '서비스가 현재 이용 불가합니다. 잠시 후 다시 시도해주세요.',
};

export default ValidationMessages;
