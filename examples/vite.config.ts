import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import html from '../src/index';

export default defineConfig({
  plugins: [
    vue(),
    html({
      title: 'Vite App',
      minify: true,
      options: {
        injectConfig: '<script src="./a.js"></script>',
      },
      // tags: [
      //   {
      //     tag: 'div',
      //     attrs: {
      //       src: './',
      //     },
      //     children: '1',
      //     injectTo: 'body',
      //   },
      // ],
    }),
  ],
});
