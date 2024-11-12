// PrivateRoute.tsx
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ProvideAuth';

interface PrivateRouteProps {
    element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
