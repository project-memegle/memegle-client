export interface LoginVerifyIdEmailDTO {
    userName: string;
    email: string;
    authenticationType: string;
}

export interface LoginVerifyPasswordDTO {
    email: string;
    authenticationCode: string;
    authenticationType: string;
}

export interface LogInResetPassworddDTO {
    id: string;
    email: string;
    authenticationCode: string;
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
