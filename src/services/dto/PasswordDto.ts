export interface FindPasswordDTO {
    id: string;
    email: string;
}

export interface PasswordEmailVerificationDTO {
    id: string;
    email: string;
    verificationType: '비밀번호 변경';
}

export interface ChangePasswordDTO {
    id: string;
    email: string;
    verificationType: '비밀번호 변경';
    password: string;
}
