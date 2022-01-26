import type { Options as EJSOptions } from 'ejs'
import type { Options as MinifyOptions } from 'html-minifier-terser'

type Entry = string | Record<string, string>

export interface InjectOptions {
  /**
   *  @description Data injected into the html template
   */
  data?: Record<string, any>

  /**
   * @description esj options configuration
   */
  ejsOptions?: EJSOptions
}

export interface PageOption {
  filename: string
  template: string
  injectOptions?: InjectOptions
}

export type Pages = PageOption[]

export interface UserOptions {
  /**
   * @description Page options
   */
  pages?: Pages

  /**
   * @description Minimize options
   */
  minify?: MinifyOptions | boolean

  /**
   * @alias input
   */
  entry?: Entry

  /**
   * @description inject options
   */
  inject?: InjectOptions
}
