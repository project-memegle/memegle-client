import { getCookie } from './cookies';

const ACCESS_TOKEN = 'access_token';

export const getAccessToken = (): string | null => {
    return getCookie(ACCESS_TOKEN);
};
