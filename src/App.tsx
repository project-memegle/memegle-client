import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home.tsx';
import LogIn from './pages/LogIn.tsx';
import Result from './pages/Result.tsx';
import SignUp from './pages/SignUp.tsx';
import NotFoundPage from './pages/NotFound.tsx';

import './scss/common.scss';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
        // children: [
        //     { path: 'result', element: <Result /> },
        //     { path: 'login', element: <LogIn /> },
        //     { path: 'signup', element: <SignUp /> },
        // ],
    },
    {
        path: '/result',
        element: <Result />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/login',
        element: <LogIn />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/signup',
        element: <SignUp />,
        errorElement: <NotFoundPage />,
    },
]);

function App() {
    return <RouterProvider router={Router} />;
}

export default App;
