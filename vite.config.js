import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), plugin()],
    server: {
        port: 62307,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
})