import { useState, useEffect } from 'react';
import { clearLocalStorage } from 'utils/Storage/localStorage';
import { clearSessionStorage } from 'utils/Storage/sessionStorage';
import { deleteCookie, getCookie } from 'utils/Storage/cookies';

export function useProvideAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = getCookie('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (callback: VoidFunction) => {
        setIsAuthenticated(true);
        callback();
    };

    const logout = (callback: VoidFunction) => {
        setIsAuthenticated(false);
        clearLocalStorage();
        clearSessionStorage();
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        callback();
    };

    return {
        isAuthenticated,
        login,
        logout,
    };
}
