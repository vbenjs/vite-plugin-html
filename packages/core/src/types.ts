import type { Options as EJSOptions } from 'ejs'
import type { Options as MinifyOptions } from 'html-minifier-terser'

export interface InjectOptions {
  /**
   * @description Data injected into the html template
   * @deprecated Has been replaced by `data`
   */
  injectData?: Record<string, any>

  /**
   *  @description Data injected into the html template
   */
  data?: Record<string, any>

  /**
   * @description esj options configuration
   * @deprecated Has been replaced by `options`
   */
  injectOptions?: EJSOptions

  /**
   * @description esj options configuration
   */
  ejsOptions?: EJSOptions
}

export interface PageOption {
  fileName: string
  template: string
  options?: InjectOptions
}
export type Pages = PageOption[]

export interface Options {
  /**
   * @description Page options
   */
  pages?: Pages

  /**
   * @description Minimize options
   */
  minify?: MinifyOptions | boolean
}
