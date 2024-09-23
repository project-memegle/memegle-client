import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home.tsx';
import LogIn from './pages/LogIn.tsx';
import Result from './pages/Result.tsx';
import SignUp from './pages/SignUp.tsx';
import Root from './pages/Root.tsx';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
