export interface LoginVerifyIdEmailDTO {
    email: string;
}

export interface LoginVerifyPasswordDTO {
    userName: string;
    email: string;
    authenticationCode: string;
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
