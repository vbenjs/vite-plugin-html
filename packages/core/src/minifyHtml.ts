import type { Plugin } from 'vite'
import { minify, Options as MinifyOptions } from 'html-minifier-terser'
import { createFilter } from '@rollup/pluginutils'
export function minifyHtml(minifyOptions: MinifyOptions | boolean = true): Plugin {
  const filter = createFilter(['**/*.html'])
  const options = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    html5: true,
    keepClosingSlash: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    ...(typeof minifyOptions === 'boolean' ? {} : minifyOptions),
  }
  return {
    name: 'vite:minify-html',
    // apply: 'build',
    enforce: 'post',
    async generateBundle(_options, outBundle) {
      if (options) {
        for (const bundle of Object.values(outBundle)) {
          if (bundle.type === 'asset' && filter(bundle.fileName)) {
            bundle.source = minify(bundle.source as string, options)
          }
        }
      }
    },
  }
}
