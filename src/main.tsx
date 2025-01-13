import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './Router';
import { ProvideAuth } from 'components/auth/ProvideAuth';

import '@memegle/styles';
import './utils/i18n/locales/i18n';

async function startApp() {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <ProvideAuth>
                <RouterProvider router={router} />
            </ProvideAuth>
        </StrictMode>
    );
}

startApp();
