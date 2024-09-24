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
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            { path: 'login', element: <LogIn /> },
            { path: 'result', element: <Result /> },
            { path: 'signup', element: <SignUp /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={Router} />;
}

export default App;
