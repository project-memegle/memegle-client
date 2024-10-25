// PrivateRoute.tsx
import { useAuth } from 'hooks/useAuth';
import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
