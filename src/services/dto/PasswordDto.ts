export interface SendPasswordCodeDTO {
    userName: string;
    email: string;
    authenticationType: string;
}

export interface LoginVerifyPasswordDTO {
    email: string;
    authenticationCode: string;
    authenticationType: string;
}

export interface LogInResetPasswordDTO {
    email: string;
    authenticationCode: string;
    authenticationType: string;
    loginId: string;
    password: string;
}

export interface MypageVerifyPasswordDTO {
    id: string;
    email: string;
    authenticationCode: string;
}

export interface MypageResetPassworddDTO {
    id: string;
    email: string;
    authenticationCode: string;
    password: string;
}
