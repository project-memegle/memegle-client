// Define the structure of the error messages object
type ValidationMessagesProps = Record<string, string>;

// Create an object to store error messages
const ValidationMessages: ValidationMessagesProps = {
    // Default fields
    DEFAULT_ID: '아이디',
    DEFAULT_PASSWORD: '비밀번호',
    DEFAULT_NICKNAME: '닉네임',
    DEFAULT_EMAIL: '이메일',
    DEFAULT_NAME: '이름',

    // Required field errors
    REQUIRED_ID: '아이디를 입력해주세요.',
    REQUIRED_EMAIL: '이메일을 입력해주세요.',
    REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
    REQUIRED_VERIFY_CODE: '인증번호를 입력해주세요.',
    REQUIRED_NICKNAME: '닉네임을 입력해주세요.',
    REQUIRED_NAME: '이름을 입력해주세요.',
    REQUIRED_CODE: '인증번호를 입력해주세요.',

    // Invalid field errors
    INVALID_ID_LENGTH: '아이디는 최소 6자 이상이어야 합니다.',
    INVALID_ID_TYPE: '아이디는 영어와 숫자만 허용됩니다.',
    INVALID_NAME_TYPE: '이름은 한글과 영어만 허용됩니다.',
    INVALID_PASSWORD_LENGTH: '비밀번호는 최소 8자 최대 20자 사이어야 합니다.',
    INVALID_PASSWORD_TYPE:
        '비밀번호는 영어 소문자, 대문자, 특수문자, 숫자를 포함해야 합니다.',
    PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
    INVALID_NICKNAME_LENGTH:
        '닉네임은 최소 2자 이상에서 10자 이하이어야 합니다.',
    INVALID_NICKNAME_TYPE: '닉네임은 특수문자를 사용할 수 없습니다.',
    INVALID_EMAIL_TYPE: '이메일 형식이 올바르지 않습니다.',
    INVALID_FORM: '양식을 다시 확인해주세요.',
    INVALID_USER: '인증 정보가 일치하지 않습니다.',

    // Existence errors
    EXIST_ID: '이미 존재하는 아이디입니다.',
    EXIST_USER: '이미 존재하는 회원입니다.',

    // Resource and form errors
    NO_RESOURCE: '리소스를 찾을 수 없습니다.',
    MISSING_FORM: '필수값을 입력해주세요.',

    // Server and unknown errors
    SERVER_ERROR: '서버 에러입니다. 고객센터에 문의해주세요.',
    UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다. 고객센터에 문의해주세요.',

    // Success messages
    SIGNUP_FAILED: '회원가입 실패',
    SIGNUP_SUCCESS: '회원가입 성공',
    LOGIN_FAILED: '로그인 실패',
    LOGIN_SUCCESS: '로그인 성공',
    NETWORK_ERROR:
        '네트워크 연결에 문제가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.',
    TIMEOUT_ERROR: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    CONNECTION_REFUSED: '서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.',
    SERVICE_UNAVAILABLE:
        '서비스가 현재 이용 불가합니다. 잠시 후 다시 시도해주세요.',

    // File upload errors
    INVALID_FILE_FORMAT: '허용되지 않는 파일 형식입니다.',
    INVALID_FILE_SIZE: '파일 크기가 5MB를 초과합니다.',

    //copyImgToClipboard successfully copied
    SUCCESS_COPY_IMG: '이미지가 복사되었습니다.',
    // success delete image
    SUCCESS_DELETE_IMG: '해당 이미지를 삭제했습니다',
    FAILED_EVENT: '잠시후 다시 시도해주세요',
    SUCCESS_SAVE: '변경사항이 저장되었습니다',
    SUCCESS_ADD_FAVORITE: '즐겨찾기에 추가되었습니다',

    // Browser compatibility errors

    INVALID_BROWSER: '해당 브라우저에서 지원되지 않습니다',

    //token error
    INVALID_TOKEN: '유효하지 않은 토큰입니다. 다시 로그인 해주세요',
    MISSING_TOKEN: '토큰이 필요합니다. 다시 로그인 해주세요',
};

export default ValidationMessages;
