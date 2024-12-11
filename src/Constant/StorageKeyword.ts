type StorageProps = Record<string, string>;

const StorageKeyword: StorageProps = {
    TRUE: 'true',
    FALSE: 'false',
    UPLOAD_SUCCESS: 'uploadSuccess',
    VERIFICATION_SUCCESS: 'verificationSuccess',
    CHANGE_NICKNAME_SUCCESS: 'changeNicknameSuccess',
    CHANGE_PASSWORD_SUCCESS: 'changePasswordSuccess',
    CREATE_ACCOUNT_SUCCESS: 'createAccountSuccess',
    DELETE_ACCOUNT_SUCCESS: 'deleteAccountSuccess',
    USER_ID: 'loginId',
    USER_EMAIL: 'userEmail',
    USER_NICKNAME: 'userNickname',
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refersh_token',
    LANGUAGE: 'language',
    CHATBOT_CATEGORY: 'chatbotCategory',
    VERIFICATION_CODE_ID: 'SIGN_UP',
    VERIFICATION_CODE_PASSWORD: 'SIGN_UP',
    VERIFICATION_CODE_SIGNUP: 'SIGN_UP',
};

// todo: VERIFICATION_CODE_ID 값 변경
export default StorageKeyword;
