import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useNavigateHandler() {
    const navigate = useNavigate();

    const navigateTo = useCallback((to: string) => {
        navigate(to);
    }, [navigate]);

    return navigateTo;
}