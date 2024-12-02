import { useState, useEffect } from 'react';
import { clearLocalStorage } from 'utils/Storage/localStorage';
import { clearCookies, deleteCookie, getCookie } from 'utils/Storage/cookies';
import StorageKeyword from 'Constant/StorageKeyword';
import {
    clearSessionStorage,
    deleteSessionStorage,
} from 'utils/Storage/sessionStorage';

export function useProvideAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = getCookie(StorageKeyword.ACCESS_TOKEN);
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
        // deleteCookie(StorageKeyword.ACCESS_TOKEN);
        // deleteCookie(StorageKeyword.REFRESH_TOKEN);
        clearCookies();
        clearSessionStorage();
        callback();
    };

    return {
        isAuthenticated,
        login,
        logout,
    };
}
