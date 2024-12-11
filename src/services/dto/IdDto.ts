export interface checkIdRequestDTO {
    loginId: string;
}
export interface IdSearchRequestDTO {
    email: string;
    authenticationCode: 'ID';
}
export interface IdSearchResponseDTO {
    email: string;
    authenticationCode: string;
    authenticationType: 'ID';
}
