import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './Router';
import { ProvideAuth } from 'components/auth/ProvideAuth';

import '@memegle/styles';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ProvideAuth>
            <RouterProvider router={router} />
        </ProvideAuth>
    </StrictMode>
);
