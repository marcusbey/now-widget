import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    plugins: [cssInjectedByJsPlugin()],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'NowWidget',
            fileName: 'now-widget',
            formats: ['umd']
        },
        rollupOptions: {
            output: {
                assetFileNames: 'now-widget.[ext]',
                entryFileNames: 'now-widget.js',
                chunkFileNames: 'now-widget-[name].js'
            }
        },
        sourcemap: true,
        minify: 'terser',
        outDir: 'dist'
    },
    css: {
        modules: {
            localsConvention: 'camelCase'
        }
    }
});