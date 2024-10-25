import React, { createContext, useContext } from 'react';
import { useProvideAuth } from '../../hooks/useProvideAuth';

const authContext = createContext<ReturnType<typeof useProvideAuth> | null>(
    null
);

const ProvideAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth must be used within a ProvideAuth');
    }
    return context;
};

export default ProvideAuth;
