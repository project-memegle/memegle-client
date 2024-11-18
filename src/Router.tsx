import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/Home';
import LogIn from './pages/LogIn';
import Result from './pages/Result/Result';
import SignUp from './pages/SignUp';
import NotFoundPage from './pages/NotFound';
import Notification from './components/UI/Notification/Notification';
import Favorite from './pages/Favorite/Favorite';
import FindPassword from './pages/Password/FindPassword';
import Upload from './pages/Upload';
import Chat from 'pages/Chat';
import PrivateRoute from 'components/auth/PrivateRoute';
import Verification from 'pages/Verification';
import Mypage from 'pages/Mypage/Mypage';
import ChangeNickname from 'pages/ChangeNickname';
import ChangePassword from 'pages/Password/ChangePassword';
import MyImages from 'pages/MyImages/MyImages';
import DeleteAccount from 'pages/DeleteAccount/DeleteAccount';
import FindId from 'pages/Id/FindId';
import IdEmailVerification from 'pages/Id/IdEmailVerification';
import PasswordEmailVerification from 'pages/Password/PasswordEmailVerification';

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
                children: [
                    { path: ':category', element: <Result /> },
                    { path: ':keyword', element: <Result /> },
                    { path: ':tag', element: <Result /> },
                ],
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
            {
                path: 'mypage',
                element: <Mypage />,
            },
            {
                path: 'changenickname',
                element: <ChangeNickname />,
            },
            {
                path: 'id/verification',
                element: <IdEmailVerification />,
            },
            {
                path: 'password/verification',
                element: <PasswordEmailVerification />,
            },
            {
                path: 'password/change',
                element: <ChangePassword />,
            },
            {
                path: 'myimages',
                element: <MyImages />,
            },
            {
                path: 'delete',
                element: <DeleteAccount />,
            },
        ],
    },
]);

export default router;
