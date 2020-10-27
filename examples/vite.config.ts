import { UserConfig } from 'vite';
import VitePluginHtml from 'vite-plugin-html';

const config: UserConfig = {
  plugins: [
    VitePluginHtml({
      title: 'Vite App',
      minify: process.env.NODE_ENV === 'production',
      options: {
        injectConfig: '<script src="./a.js"></script>',
      },
    }),
  ],
};
export default config;
