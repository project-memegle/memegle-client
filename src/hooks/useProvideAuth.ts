import { useState } from 'react';

const fakeAuth = {
    isAuthenticated: false,
    login(cb: () => void) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    logout(cb: () => void) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

export function useProvideAuth() {
    const [user, setUser] = useState<string | null>(null);

    const login = (cb: () => void) => {
        fakeAuth.login(() => {
            setUser('User');
            cb();
        });
    };

    const logout = (cb: () => void) => {
        fakeAuth.logout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        login,
        logout,
    };
}
