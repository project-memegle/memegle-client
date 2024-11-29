import { createContext, useContext } from 'react';
import { useProvideAuth } from '../../hooks/useProvideAuth';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const ProvideAuth: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
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
