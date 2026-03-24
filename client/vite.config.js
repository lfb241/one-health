import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
export default defineConfig(() => {
    return {

        server: {
            proxy: {
                '/api': "http://localhost:8080"
            }
        },
        
        build: {
            outDir: 'build',
        },
        plugins: [
            react({
                babel: {
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ],
                },
            }),
            eslint({
                // Nur im Dev-Modus prüfen
                emitWarning: true,
                emitError: false,
                failOnError: false,
            }),
        ],

        test: {
            globals: true, // all imports from vitest are global/no manual imports needed
            environment: 'jsdom',
            setupFiles: './src/tests/setup.js', // includes the test setup file
        },
    };
});
