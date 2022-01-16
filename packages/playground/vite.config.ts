import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import html from '../core/dist/index.js'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        other: path.resolve(__dirname, 'other.html'),
      },
    },
  },
  plugins: [
    vue(),
    html({
      minify: false,
      inject: {
        data: {
          title: 'vite-plugin-html-demo',
          injectScript: `<script src="./inject.js"></script>`,
        },
        pages: [
          {
            fileName: 'index.html',
            template: 'index.html',
          },
          {
            fileName: 'other.html',
            template: 'other.html',
          },
        ],
      },
    }),
  ],
})
