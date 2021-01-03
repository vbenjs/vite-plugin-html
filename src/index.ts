import { Plugin } from 'vite';
import { VitePluginHtml } from './types';
import { template, isBoolean } from 'lodash';
import { injectTitle } from './utils';
import { minify as HtmlMinify, Options } from 'html-minifier-terser';
import debug from 'debug';

const log = debug('vite:html');

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
    name: 'vite:html',
    transformIndexHtml: {
      enforce: 'pre',
      transform: (html) => {
        const { options = {} } = opt;

        let compiledHtml = html;
        try {
          const compiled = template(compiledHtml);
          compiledHtml = compiled({
            viteHtmlPluginOptions: options,
          });
        } catch (error) {
          log('Template  compiled fail\n' + error);
        }

        const { title = '', minify = false, tags = [] } = opt;
        try {
          let processCode = injectTitle(compiledHtml, title);
          if (!minify) {
            return {
              html: processCode,
              tags,
            };
          }
          if (isBoolean(minify)) {
            return {
              html: HtmlMinify(processCode, defaultMinifyOptions),
              tags,
            };
          }
          return {
            html: HtmlMinify(processCode, {
              ...defaultMinifyOptions,
              ...minify,
            }),
            tags,
          };
        } catch (error) {
          log('Template transform fail\n' + error);
          return { html: compiledHtml, tags };
        }
      },
    },
  };
};

export * from './types';
