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
    server: {
        proxy: {
            '/apis/client': {
                target: 'http://54.180.109.203:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apis\/client/, ''),
            },
        },
    },
});
