import type { Plugin } from 'vite'
import type { UserOptions } from './typing'
import { createInjectPlugin } from './injectHtml'
import { createMinifyHtmlPlugin } from './minifyHtml'
import { Options as MinifyOptions } from 'html-minifier-terser'
import consola from 'consola'

consola.wrapConsole()

export function createHtmlPlugin(userOptions: UserOptions = {}): Plugin[] {
  const { minify = {} } = userOptions
  return [createInjectPlugin(userOptions), createMinifyHtmlPlugin(minify)]
}

export type { MinifyOptions }
