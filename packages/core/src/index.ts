import type { Plugin } from 'vite'
import type { UserOptions } from './typing'
import { createPlugin } from './htmlPlugin'
import { createMinifyHtmlPlugin } from './minifyHtml'
import consola from 'consola'

consola.wrapConsole()

export function createHtmlPlugin(userOptions: UserOptions = {}): Plugin[] {
  return [createPlugin(userOptions), createMinifyHtmlPlugin(userOptions)]
}
