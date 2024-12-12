export interface SendPasswordCodeDTO {
    userName: string;
    email: string;
    authenticationType: string;
}

export interface VerifyCodePasswordDTO {
    email: string;
    authenticationCode: string;
    authenticationType: string;
}

export interface ResetPasswordDTO {
    email: string;
    authenticationCode: string;
    authenticationType: string;
    loginId: string;
    password: string;
}
