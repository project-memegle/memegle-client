import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            '@memegle/assets': '/src/assets',
            '@memegle/styles': '/src/scss/common.scss',
        },
    },
});
