import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

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
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          filename: 'index.html',
          template: 'index.html',
          options: {
            data: {
              title: 'index',
              injectScript: `<script src="./inject.js"></script>`,
            },
          },
        },
        {
          filename: 'other.html',
          template: 'other.html',
          options: {
            data: {
              title: 'other page',
              injectScript: `<script src="./inject.js"></script>`,
            },
          },
        },
      ],
    }),
  ],
})
