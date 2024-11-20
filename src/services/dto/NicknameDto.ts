export interface NicknameCheckRequestDTO {
    nickname: string;
}

export interface NicknameCheckResponseDTO {
    isDuplicated: boolean;
}

export interface NicknameChangeRequestDTO {
    userId: string;
    nickname: string;
}
