import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import html from '../src/index';

export default defineConfig({
  plugins: [
    vue(),
    html({
      minify: true,
      inject: {
        injectData: {
          title: 'vite-plugin-html-example',
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
});
