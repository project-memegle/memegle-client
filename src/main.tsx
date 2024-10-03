import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router'; // Import default export
import './index.css';

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const { worker } = await import('./mocks/browser');

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start();
}

// Call enableMocking and then render the application
enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
});
