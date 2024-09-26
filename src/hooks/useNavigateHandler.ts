import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useNavigateHandler(to: string) {
    const navigate = useNavigate();

    const navigateTo = useCallback(() => {
        navigate(to);
    }, [navigate, to]);

    return navigateTo;
}
