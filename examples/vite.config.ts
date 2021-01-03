import { UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import html from '../src/index';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      html({
        title: 'Vite App',
        minify: mode === 'production',
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
  };
};
