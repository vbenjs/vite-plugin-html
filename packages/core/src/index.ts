import type { Plugin } from 'vite'
import type { Options } from './typing'
import { injectHtml } from './injectHtml'
import { createMinifyHtmlPlugin } from './minifyHtml'
import { Options as MinifyOptions } from 'html-minifier-terser'

export { injectHtml, createMinifyHtmlPlugin }

export function createHtmlPlugin(options: Options = {}): Plugin[] {
  const { minify = {}, pages = [] } = options
  return [injectHtml(pages), createMinifyHtmlPlugin(minify)]
}

export type { MinifyOptions }
