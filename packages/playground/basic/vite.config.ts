import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  // base: '/aaa/',
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="./inject.js"></script>`,
        },
        tags: [
          {
            tag: 'div',
            attrs: { id: 'ddd' },
            injectTo: 'body-prepend',
          },
        ],
      },
    }),
  ],
})
