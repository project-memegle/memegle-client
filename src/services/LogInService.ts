import { AxiosResponse } from 'axios';
import { LogInRequestDTO } from 'services/dto/LogInDto';
import { post } from 'utils/API/fetcher';
import { getEnvVariableAsNumber } from 'utils/Storage/numberUntils';
import { setCookie } from 'utils/Storage/cookies';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKENE = 'refresh_token';

export async function logIn(userData: LogInRequestDTO): Promise<void> {
    const response: AxiosResponse<void> = await post<void, LogInRequestDTO>(
        '/users/sign/in',
        userData
    );

    if (response.status === 204) {
        const accessToken = response.headers['authorization']?.replace(
            'Bearer ',
            ''
        );
        const refreshToken = response.headers['refresh-token']?.replace(
            'Bearer ',
            ''
        );

        const accessTokenStore = getEnvVariableAsNumber(
            import.meta.env.VITE_ACCESS_TOKEN_STORE,
            'VITE_ACCESS_TOKEN_STORE'
        );

        const refreshTokenStore = getEnvVariableAsNumber(
            import.meta.env.VITE_REFRESH_TOKEN_STORE,
            'VITE_REFRESH_TOKEN_STORE'
        );

        setCookie(ACCESS_TOKEN, accessToken, accessTokenStore);
        setCookie(REFRESH_TOKENE, refreshToken, refreshTokenStore);
    } else {
        throw new Error('로그인 실패');
    }
}
