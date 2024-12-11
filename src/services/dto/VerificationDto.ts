export interface VerificationRequestDTO {
    userName: string;
    email: string;
    authenticationCode: 'SIGN_UP';
}
export interface VerificationResponseDTO {
    userName: string;
    email: string;
    code: string;
    authenticationCode: 'SIGN_UP';
}
