import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/Home';
import LogIn from './pages/LogIn';
import Result from './pages/Result';
import SignUp from './pages/SignUp';
import NotFoundPage from './pages/NotFound';
import Notification from './pages/Notification.tsx';
import Favorite from './pages/FindPassword.tsx';
import FindId from './pages/FindId.tsx';
import FindPassword from './pages/FindPassword.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: 'notifications',
                element: <Notification />,
            },
            {
                path: 'result',
                element: <Result />,
                children: [{ path: ':category', element: <Result /> }],
            },
            {
                path: 'favorite',
                element: <Favorite />,
            },
            {
                path: 'findid',
                element: <FindId />,
            },
            {
                path: 'findpassword',
                element: <FindPassword />,
            },
        ],
    },
]);

export default router;
