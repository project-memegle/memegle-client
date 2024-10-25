import { useContext } from 'react';
import { authContext } from '../components/auth/ProvideAuth';

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth must be used within a ProvideAuth');
    }
    return context;
};
