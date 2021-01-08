import { render, Options as EJSOptions } from 'ejs'
import { minify, Options as MinifyOptions } from 'html-minifier-terser'
import type { Plugin } from 'vite'

export function injectHtml(injectData: Record<string, any>, injectOptions?: EJSOptions): Plugin {
  return {
    name: 'vite:injectHtml',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return render(html, injectData, injectOptions)
      }
    }
  }
}

export function minifyHtml(minifyOptions?: MinifyOptions): Plugin {
  return {
    name: 'vite:minifyHtml',
    transformIndexHtml(html) {
      // https://github.com/terser/html-minifier-terser#options-quick-reference
      minifyOptions = {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        ...minifyOptions
      }
      return minify(html, minifyOptions)
    }
  }
}