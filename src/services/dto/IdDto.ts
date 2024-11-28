export interface checkIdRequestDTO {
    loginId: string;
}
export interface IdSearchRequestDTO {
    email: string;
    authenticationCode: '이메일 인증';
}
export interface IdSearchResponseDTO {
    email: string;
    code: string;
    authenticationCode: '이메일 인증';
}
