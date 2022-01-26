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
      pages: [
        {
          fileName: 'index.html',
          template: 'index.html',
          options: {
            data: {
              title: 'index',
              injectScript: `<script src="./inject.js"></script>`,
            },
          },
        },
        {
          fileName: 'other.html',
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
