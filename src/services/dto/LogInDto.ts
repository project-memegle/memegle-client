export interface LogInDTO {
    loginId: string;
    password: string;
}

export const sampleUserData: LogInDTO = {
    loginId: 'testLoginId1',
    password: 'TestPassword1!',
};
