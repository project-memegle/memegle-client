export interface LoginVerifyIdEmailDTO {
    id: string;
    email: string;
}

export interface LoginVerifyPasswordDTO {
    id: string;
    email: string;
    verificationType: '비밀번호 찾기';
}

export interface LogInResetPassworddDTO {
    id: string;
    email: string;
    verificationType: '비밀번호 찾기';
    password: string;
}

export interface MypageVerifyPasswordDTO {
    id: string;
    email: string;
    verificationType: '비밀번호 변경';
}

export interface MypageResetPassworddDTO {
    id: string;
    email: string;
    verificationType: '비밀번호 변경';
    password: string;
}
