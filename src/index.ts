import { Plugin } from 'vite';
import { VitePluginHtml } from './types';
import { template, isBoolean } from 'lodash';
import { injectTitle } from './utils';
import { minify as HtmlMinify, Options } from 'html-minifier-terser';

const defaultMinifyOptions: Options = {
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeAttributeQuotes: true,
  trimCustomFragments: true,
  collapseWhitespace: true,
};

export default (opt: VitePluginHtml = {}): Plugin => {
  return {
    indexHtmlTransforms: [
      {
        apply: 'pre',
        transform: ({ code }) => {
          const { options = {} } = opt;
          try {
            const compiled = template(code);
            return compiled({
              viteHtmlPluginOptions: options,
            });
          } catch (error) {
            console.warn('[vite-plugin-html:pre]:Template Compiled Faild\n' + error);
            return code;
          }
        },
      },
      {
        apply: 'post',
        transform: ({ code, isBuild }) => {
          const { title = '', minify = isBuild } = opt;
          try {
            let processCode = injectTitle(code, title);
            if (!minify) {
              return processCode;
            }
            if (isBoolean(minify)) {
              return HtmlMinify(processCode, defaultMinifyOptions);
            }
            return HtmlMinify(processCode, {
              ...defaultMinifyOptions,
              ...minify,
            });
          } catch (error) {
            console.warn('[vite-plugin-html:post]:Template Compiled Faild\n' + error);
            return code;
          }
        },
      },
    ],
  };
};

export * from './types';
