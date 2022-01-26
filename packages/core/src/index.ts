import type { Plugin } from 'vite'
import type { Options } from './typing'
import { createInjectHtmlPlugin } from './injectHtml'
import { createMinifyHtmlPlugin } from './minifyHtml'
import { Options as MinifyOptions } from 'html-minifier-terser'

export { createInjectHtmlPlugin, createMinifyHtmlPlugin }

export function createHtmlPlugin(options: Options = {}): Plugin[] {
  const { minify = {}, pages = [] } = options
  return [createInjectHtmlPlugin(pages), createMinifyHtmlPlugin(minify)]
}

export type { MinifyOptions }
