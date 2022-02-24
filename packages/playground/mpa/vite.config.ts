import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/main.ts',
          filename: 'index.html',
          template: 'public/index.html',
          injectOptions: {
            data: {
              title: 'index',
              injectScript: `<script src="./inject.js"></script>`,
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag1',
                },
              },
            ],
          },
        },
        {
          entry: 'src/other-main.ts',
          filename: 'other.html',
          template: 'public/other.html',
          injectOptions: {
            data: {
              title: 'other page',
              injectScript: `<script src="./inject.js"></script>`,
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag2',
                },
              },
            ],
          },
        },
      ],
    }),
  ],
})
