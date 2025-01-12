export interface LogInRequestDTO {
    email: string;
    password: string;
}

export interface LogInResponseDTO {
    access_token: string;
    refresh_token: string;
}
