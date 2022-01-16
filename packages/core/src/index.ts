import type { Plugin } from 'vite'
import type { Options } from './types'

import { injectHtml } from './injectHtml'
import { minifyHtml } from './minifyHtml'
import { minify, Options as MinifyOptions } from 'html-minifier-terser'

const minifyFn = minify

export { injectHtml, minifyHtml, minifyFn }

export default (options: Options = {}): Plugin[] => {
  const { minify = {}, pages = [] } = options
  return [injectHtml(pages), minifyHtml(minify)]
}

export type { MinifyOptions }
