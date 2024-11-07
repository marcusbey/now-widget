import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'NowWidget',
            fileName: 'now-widget',
            formats: ['es', 'umd']
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
    }
}) 