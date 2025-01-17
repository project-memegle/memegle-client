import i18n from 'i18next';

type ValidationMessagesProps = Record<string, string>;

const getValidationMessages = (): ValidationMessagesProps => ({
    DEFAULT_ID: i18n.t('DEFAULT_ID'),
    DEFAULT_PASSWORD: i18n.t('DEFAULT_PASSWORD'),
    DEFAULT_ORIGINAL_PASSWORD: i18n.t('DEFAULT_ORIGINAL_PASSWORD'),
    DEFAULT_NICKNAME: i18n.t('DEFAULT_NICKNAME'),
    DEFAULT_EMAIL: i18n.t('DEFAULT_EMAIL'),
    DEFAULT_NAME: i18n.t('DEFAULT_NAME'),
    REQUIRED_ID: i18n.t('REQUIRED_ID'),
    REQUIRED_EMAIL: i18n.t('REQUIRED_EMAIL'),
    REQUIRED_PASSWORD: i18n.t('REQUIRED_PASSWORD'),
    DEFAULT_PASSWORD_CHECK: i18n.t('DEFAULT_PASSWORD_CHECK'),
    REQUIRED_VERIFY_CODE: i18n.t('REQUIRED_VERIFY_CODE'),
    REQUIRED_LOGIN: i18n.t('REQUIRED_VERIFY_CODE'),
    REQUIRED_NICKNAME: i18n.t('REQUIRED_NICKNAME'),
    REQUIRED_NAME: i18n.t('REQUIRED_NAME'),
    REQUIRED_FORM: i18n.t('REQUIRED_FORM'),
    REQUIRED_CHECK_ID: i18n.t('REQUIRED_CHECK_ID'),
    REQUIRED_CHECK_NICKNAME: i18n.t('REQUIRED_CHECK_NICKNAME'),
    REQUIRED_CODE: i18n.t('REQUIRED_CODE'),
    REQUIRED_REASON: i18n.t('REQUIRED_REASON'),
    REQUIRED_DUPLICATED_CHECK: i18n.t('REQUIRED_DUPLICATED_CHECK'),
    REQUIRED_VERIFICATION_CODE: i18n.t('REQUIRED_VERIFICATION_CODE'),
    INVALID_ID_LENGTH: i18n.t('INVALID_ID_LENGTH'),
    INVALID_ID_TYPE: i18n.t('INVALID_ID_TYPE'),
    INVALID_NAME_TYPE: i18n.t('INVALID_NAME_TYPE'),
    INVALID_PASSWORD_LENGTH: i18n.t('INVALID_PASSWORD_LENGTH'),
    INVALID_PASSWORD_TYPE: i18n.t('INVALID_PASSWORD_TYPE'),
    PASSWORD_MISMATCH: i18n.t('PASSWORD_MISMATCH'),
    INVALID_NICKNAME_LENGTH: i18n.t('INVALID_NICKNAME_LENGTH'),
    INVALID_NICKNAME_TYPE: i18n.t('INVALID_NICKNAME_TYPE'),
    INVALID_EMAIL_TYPE: i18n.t('INVALID_EMAIL_TYPE'),
    INVALID_CODE_TYPE: i18n.t('INVALID_CODE_TYPE'),
    INVALID_FORM: i18n.t('INVALID_FORM'),
    INVALID_USER: i18n.t('INVALID_USER'),
    CHECK_NICKNAME_FAIL: i18n.t('CHECK_NICKNAME_FAIL'),
    NONEXIST_VARIFICATION_INFO: i18n.t('NONEXIST_VARIFICATION_INFO'),
    CHECK_ID_FAIL: i18n.t('CHECK_ID_FAIL'),
    CHECK_ID_SUCCESS: i18n.t('CHECK_ID_SUCCESS'),
    NONEXIST_AUTH: i18n.t('NONEXIST_AUTH'),
    MISSING_ID: i18n.t('MISSING_ID'),
    NONEXIST_ID: i18n.t('NONEXIST_ID'),
    NONEXIST_EMAIL: i18n.t('NONEXIST_EMAIL'),
    EXIST_ID: i18n.t('EXIST_ID'),
    EXIST_USER: i18n.t('EXIST_USER'),
    EXIST_NICKNAME: i18n.t('EXIST_NICKNAME'),
    EXIST_EMAIL: i18n.t('EXIST_EMAIL'),
    NO_RESOURCE: i18n.t('NO_RESOURCE'),
    MISSING_FORM: i18n.t('MISSING_FORM'),
    SERVER_ERROR: i18n.t('SERVER_ERROR'),
    FAILED_VERIFICATION_CODE: i18n.t('FAILED_VERIFICATION_CODE'),
    UNKNOWN_ERROR: i18n.t('UNKNOWN_ERROR'),
    SIGNUP_FAILED: i18n.t('SIGNUP_FAILED'),
    SIGNUP_SUCCESS: i18n.t('SIGNUP_SUCCESS'),
    CHANGE_PASSWORD_SUCCESS: i18n.t('CHANGE_PASSWORD_SUCCESS'),
    CHANGE_NICKNAME_SUCCESS: i18n.t('CHANGE_NICKNAME_SUCCESS'),
    CHECK_NICKNAME_SUCCESS: i18n.t('CHECK_NICKNAME_SUCCESS'),
    LOGIN_FAILED: i18n.t('LOGIN_FAILED'),
    LOGIN_SUCCESS: i18n.t('LOGIN_SUCCESS'),
    NETWORK_ERROR: i18n.t('NETWORK_ERROR'),
    TIMEOUT_ERROR: i18n.t('TIMEOUT_ERROR'),
    CONNECTION_REFUSED: i18n.t('CONNECTION_REFUSED'),
    SERVICE_UNAVAILABLE: i18n.t('SERVICE_UNAVAILABLE'),
    INVALID_FILE_FORMAT: i18n.t('INVALID_FILE_FORMAT'),
    INVALID_FILE_SIZE: i18n.t('INVALID_FILE_SIZE'),
    SUCCESS_COPY_IMG: i18n.t('SUCCESS_COPY_IMG'),
    SUCCESS_DELETE_IMG: i18n.t('SUCCESS_DELETE_IMG'),
    FAILED_EVENT: i18n.t('FAILED_EVENT'),
    SUCCESS_SAVE: i18n.t('SUCCESS_SAVE'),
    SUCCESS_ADD_FAVORITE: i18n.t('SUCCESS_ADD_FAVORITE'),
    INVALID_BROWSER: i18n.t('INVALID_BROWSER'),
    INVALID_TOKEN: i18n.t('INVALID_TOKEN'),
    MISSING_TOKEN: i18n.t('MISSING_TOKEN'),
    UNMATCHED_TOKEN: i18n.t('UNMATCHED_TOKEN'),
    SUCCESS_IMAGE_UPLOAD: i18n.t('SUCCESS_IMAGE_UPLOAD'),
    SUCCESS_IMAGE_DOWNLOAD: i18n.t('SUCCESS_IMAGE_DOWNLOAD'),
    SUCCESS_DELETE_ACCOUNT: i18n.t('SUCCESS_DELETE_ACCOUNT'),
    SUCCESS_VERIFICATION: i18n.t('SUCCESS_VERIFICATION'),
    GET_USER_INFO_FAIL: i18n.t('GET_USER_INFO_FAIL'),
    SENT_RESET_MAIL_SUCCESS: i18n.t('SENT_RESET_MAIL_SUCCESS'),
});

export default getValidationMessages;
