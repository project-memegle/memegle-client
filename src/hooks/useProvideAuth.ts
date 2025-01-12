import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { clearLocalStorage } from 'utils/Storage/localStorage';
import { clearCookies } from 'utils/Storage/cookies';
import { clearSessionStorage } from 'utils/Storage/sessionStorage';
import { auth } from '../../firebaseConfig';

export function useProvideAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = (callback: VoidFunction) => {
        setIsAuthenticated(true);
        callback();
    };

    const logout = (callback: VoidFunction) => {
        signOut(auth).then(() => {
            setIsAuthenticated(false);
            clearLocalStorage();
            clearCookies();
            clearSessionStorage();
            callback();
        });
    };

    return {
        isAuthenticated,
        login,
        logout,
    };
}
