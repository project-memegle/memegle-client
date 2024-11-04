export interface VerificationEmailDTO {
    userName: string;
    email: string;
}
export interface VerificationCodeDTO {
    email: string;
    authenticationCode: string;
}
