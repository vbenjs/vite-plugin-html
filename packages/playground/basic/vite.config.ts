import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
// import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      /**
       * @default src/main.ts
       */
      entry: 'src/main.ts',
      /**
       * @default index.html
       */
      template: 'public/index.html',
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
})
