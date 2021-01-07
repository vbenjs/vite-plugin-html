import type { Plugin, ResolvedConfig } from 'vite';
import type { VitePluginHtml } from './types';

import { template, isBoolean } from 'lodash';
import { injectTitle } from './utils';
import { minify as HtmlMinify, Options } from 'html-minifier-terser';
// import debug from 'debug';

// const log = debug('vite:html');

const defaultMinifyOptions: Options = {
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeAttributeQuotes: true,
  trimCustomFragments: true,
  collapseWhitespace: true,
};

export default (opt: VitePluginHtml = {}): Plugin[] => {
  let viteConfig: ResolvedConfig | undefined;

  return [
    {
      name: 'vite:html-pre',
      transformIndexHtml: {
        enforce: 'pre',
        transform: async (html) => {
          const { options = {}, title } = opt;

          let compiledHtml = html;
          try {
            // Compile using lodash template syntax
            // Expose options to the viteHtmlPluginOptions object
            const compiled = template(compiledHtml);
            compiledHtml = compiled({
              viteHtmlPluginOptions: {
                title,
                ...options,
              },
            });
          } catch (error) {
            console.error('Template  compiled fail\n' + error);
          }
          return compiledHtml;
        },
      },
    },
    {
      name: 'vite:html-post',
      configResolved(config) {
        viteConfig = config;
      },
      transformIndexHtml: {
        enforce: 'post',
        transform: async (html) => {
          let compiledHtml = html;
          const { title = '', minify = viteConfig?.command === 'build', tags = [] } = opt;
          try {
            let processCode = injectTitle(compiledHtml, title);
            if (!minify) {
              return {
                html: processCode,
                tags,
              };
            }

            // minify code
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
            console.error('Template transform fail\n' + error);
            return { html: compiledHtml, tags };
          }
        },
      },
    },
  ];
};

export * from './types';
