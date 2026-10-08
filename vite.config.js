import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/site.css', 'resources/js/site.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        // Indispensable pour DDEV/Docker
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        cors: true, // Autorise le CORS
        hmr: {
            host: 'localhost',
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
