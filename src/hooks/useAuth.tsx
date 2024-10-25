import { createContext, useContext } from 'react';

const authContext = createContext<string | null>(null);
export function useAuth() {
    return useContext(authContext);
}
