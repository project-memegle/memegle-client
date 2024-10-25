import { useState } from 'react';

const fakeAuth = {
    isAuthenticated: false,
    signin(cb: () => void) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: () => void) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

export function useProvideAuth() {
    const [user, setUser] = useState<string | null>(null);

    const signin = (cb: () => void) => {
        fakeAuth.signin(() => {
            setUser('User');
            cb();
        });
    };

    const signout = (cb: () => void) => {
        fakeAuth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout,
    };
}
