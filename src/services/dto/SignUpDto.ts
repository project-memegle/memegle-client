export interface SignUpDTO {
    loginId: string;
    password: string;
    nickname: string;
}

export const sampleUserData: SignUpDTO = {
    loginId: 'testLoginId1',
    password: 'TestPassword1!',
    nickname: 'testNickname1',
};
