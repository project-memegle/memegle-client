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
    USER_ID: 'userId',
    USER_EMAIL: 'userEmail',
    USER_NICKNAME: 'userNickname',
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refersh_token',
};

export default StorageKeyword;
