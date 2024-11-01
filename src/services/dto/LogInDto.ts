export interface LogInRequestDTO {
    loginId: string;
    password: string;
}

export interface LogInResponseDTO {
    access_token: string;
    refresh_token: string;
}
