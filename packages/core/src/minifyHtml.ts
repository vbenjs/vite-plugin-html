import type { Plugin } from 'vite'
import { minify, Options as MinifyOptions } from 'html-minifier-terser'
import { createFilter } from '@rollup/pluginutils'

function getOptions(minify: boolean) {
  return {
    collapseBooleanAttributes: minify,
    collapseWhitespace: minify,
    minifyCSS: minify,
    minifyURLs: minify,
    removeAttributeQuotes: minify,
    removeComments: minify,
    removeEmptyAttributes: minify,
    html5: minify,
    keepClosingSlash: minify,
    removeRedundantAttributes: minify,
    removeScriptTypeAttributes: minify,
    removeStyleLinkTypeAttributes: minify,
    useShortDoctype: minify,
  }
}
export function minifyHtml(minifyOptions: MinifyOptions | boolean = true): Plugin {
  const filter = createFilter(['**/*.html'])
  const options =
    typeof minifyOptions === 'boolean'
      ? getOptions(minifyOptions)
      : Object.assign(getOptions(true), minifyOptions)
  return {
    name: 'vite:minify-html',
    // apply: 'build',
    enforce: 'post',
    async generateBundle(_options, outBundle) {
      if (options) {
        for (const bundle of Object.values(outBundle)) {
          if (bundle.type === 'asset' && filter(bundle.fileName)) {
            bundle.source = await minify(bundle.source as string, options)
          }
        }
      }
    },
  }
}
