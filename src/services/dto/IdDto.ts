export interface checkIdRequestDTO {
    loginId: string;
}

export interface IdSearchRequestDTO {
    userName: string;
    email: string;
    authenticationType: string;
}

export interface IdSearchResponseDTO {
    email: string;
    authenticationCode: string;
    authenticationType: string;
}
