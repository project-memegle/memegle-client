import React, { createContext } from 'react';
import { useProvideAuth } from '../../hooks/useProvideAuth';

const authContext = createContext<ReturnType<typeof useProvideAuth> | null>(
    null
);

const ProvideAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export { authContext, ProvideAuth };
