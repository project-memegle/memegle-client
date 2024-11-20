export interface VerificationRequestDTO {
    userName: string;
    email: string;
    authenticationCode: '본인인증';
}
export interface VerificationResponseDTO {
    userName: string;
    email: string;
    code: string;
    authenticationCode: '본인인증';
}
