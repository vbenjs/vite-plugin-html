import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import html from '../core/dist/index.js'

export default defineConfig({
  plugins: [
    vue(),
    html({
      minify: true,
      inject: {
        data: {
          title: 'vite-plugin-html-demo',
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
})
