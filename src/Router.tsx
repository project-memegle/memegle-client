import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp/SignUp';
import NotFoundPage from './pages/NotFound';
import Notification from './components/UI/Notification/Notification';
import Favorite from './pages/Favorite/Favorite';
import Upload from './pages/Upload';
import Chat from 'pages/Chat';
import PrivateRoute from 'components/auth/PrivateRoute';
import Verification from 'pages/Verification';
import Mypage from 'pages/Mypage/Mypage';
import ChangeNickname from 'pages/ChangeNickname';
import MyImages from 'pages/MyImages/MyImages';
import DeleteAccount from 'pages/DeleteAccount/DeleteAccount';
import FindId from 'pages/Id/FindId';
import IdEmailVerification from 'pages/Id/IdEmailVerification';
import MypageResetPassword from 'pages/Password/MypageResetPassword';
import MypageEmailVerification from 'pages/Password/MypageEmailVerification';
import LogInEmailVerification from './pages/Password/LogInEmailVerification';
import LogInResetPassword from 'pages/Password/LogInResetPassword';
import SignUpVerification from 'pages/SignUp/SignUpVerification';
import { ResultTag } from 'pages/Result/ResultTag';
import { ResultCategory } from 'pages/Result/ResultCategory';

const router = createBrowserRouter(
    [
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
                    path: 'category/:keyword',
                    element: <ResultCategory />,
                },
                {
                    path: 'tag/:tag',
                    element: <ResultTag />,
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
                    path: 'signup/verification',
                    element: <SignUpVerification />,
                },
                {
                    path: 'favorite',
                    element: <PrivateRoute element={<Favorite />} />,
                },
                {
                    path: 'upload',
                    element: <PrivateRoute element={<Upload />} />,
                },
                {
                    path: 'find/id',
                    element: <FindId />,
                },
                {
                    path: 'find/password',
                    element: <LogInEmailVerification />,
                },
                {
                    path: 'find/password/reset',
                    element: <LogInResetPassword />,
                },
                {
                    path: 'verification',
                    element: <Verification />,
                },
                {
                    path: 'mypage',
                    element: <PrivateRoute element={<Mypage />} />,
                },
                {
                    path: 'changenickname',
                    element: <PrivateRoute element={<ChangeNickname />} />,
                },
                {
                    path: 'id/verification',
                    element: <IdEmailVerification />,
                },
                {
                    path: 'password/verification',
                    element: (
                        <PrivateRoute element={<MypageEmailVerification />} />
                    ),
                },
                {
                    path: 'password/change',
                    element: <PrivateRoute element={<MypageResetPassword />} />,
                },
                {
                    path: 'myimages',
                    element: <PrivateRoute element={<MyImages />} />,
                },
                {
                    path: 'delete',
                    element: <PrivateRoute element={<DeleteAccount />} />,
                },
            ],
        },
    ],
    {
        future: {
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

export default router;
