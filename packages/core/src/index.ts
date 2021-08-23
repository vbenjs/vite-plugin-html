import type { Plugin } from 'vite'
import type { Options } from './types'

import { injectHtml } from './injectHtml'
import { minifyHtml } from './minifyHtml'
import { minify, Options as MinifyOptions } from 'html-minifier-terser'

const minifyFn = minify

export { injectHtml, minifyHtml, minifyFn }

export default (options: Options = {}): Plugin[] => {
  const { inject = {}, minify = {} } = options
  return [injectHtml(inject), minifyHtml(minify)]
}

export type { MinifyOptions }
