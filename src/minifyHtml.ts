import { minify, Options as MinifyOptions } from 'html-minifier-terser';
import type { Plugin } from 'vite';

export function minifyHtml(minifyOptions: MinifyOptions | boolean = true): Plugin {
  return {
    name: 'vite:minifyHtml',
    transformIndexHtml: {
      enforce: 'post',
      transform(html: string) {
        if (!minifyOptions) {
          return html;
        }
        const defaultMinifyOptions = {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          ...(typeof minifyOptions === 'boolean' ? {} : minifyOptions),
        };
        return minify(html, defaultMinifyOptions);
      },
    },
  };
}
