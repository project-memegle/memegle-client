import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/Home';
import LogIn from './pages/LogIn';
import Result from './pages/Result/Result';
import SignUp from './pages/SignUp';
import NotFoundPage from './pages/NotFound';
import Notification from './components/UI/Notification/Notification';
import Favorite from './pages/Favorite/Favorite';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import Upload from './pages/Upload';
import Chat from 'pages/Chat';
import PrivateRoute from 'components/auth/PrivateRoute';
import Verification from 'pages/Verification';

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
                path: 'notification',
                element: <PrivateRoute element={<Notification />} />,
            },
            {
                path: 'result',
                element: <Result />,
                children: [{ path: ':category', element: <Result /> }],
            },
            {
                path: 'login',
                element: <LogIn />,
            },
            {
                path: 'chat',
                element: <PrivateRoute element={<Chat />} />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: 'favorite',
                element: <Favorite />,
            },
            {
                path: 'upload',
                element: <PrivateRoute element={<Upload />} />,
            },
            {
                path: 'findid',
                element: <FindId />,
            },
            {
                path: 'findpassword',
                element: <FindPassword />,
            },
            {
                path: 'verification',
                element: <Verification />,
            },
        ],
    },
]);

export default router;
