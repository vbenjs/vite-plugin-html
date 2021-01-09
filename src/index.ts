import { render, Options as EJSOptions } from 'ejs';
import { minify, Options as MinifyOptions } from 'html-minifier-terser';
import type { Plugin, HtmlTagDescriptor } from 'vite';

export interface InjectOptions {
  injectData?: Record<string, any>;
  injectOptions?: EJSOptions;
  tags?: HtmlTagDescriptor[];
}

export interface Options {
  inject?: InjectOptions;
  minify?: MinifyOptions | boolean;
}

export function injectHtml(options: InjectOptions = {}): Plugin {
  return {
    name: 'vite:injectHtml',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string) {
        const { injectData = {}, injectOptions = {}, tags = [] } = options;
        return {
          html: render(html, injectData, injectOptions) as string,
          tags: tags,
        };
      },
    },
  };
}

export function minifyHtml(minifyOptions: MinifyOptions | boolean = true): Plugin {
  return {
    name: 'vite:minifyHtml',
    transformIndexHtml(html: string) {
      if (!minifyOptions) {
        return html;
      }
      // https://github.com/terser/html-minifier-terser#options-quick-reference
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
  };
}

export default function (options: Options = {}): Plugin[] {
  const { inject = {}, minify = {} } = options;
  return [injectHtml(inject), minifyHtml(minify)];
}
