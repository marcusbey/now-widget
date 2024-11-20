import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
});