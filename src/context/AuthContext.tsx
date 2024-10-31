import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    logIn: () => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logIn = () => {
        setIsAuthenticated(true);
    };

    const logOut = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
