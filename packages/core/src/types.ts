import type { Options as EJSOptions } from 'ejs'
import type { Options as MinifyOptions } from 'html-minifier-terser'
import type { HtmlTagDescriptor } from 'vite'

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

  /**
   * @description vite transform tags
   */
  tags?: HtmlTagDescriptor[]
}

export interface Options {
  /**
   * @description Injection options
   */
  inject?: InjectOptions

  /**
   * @description Minimize options
   */
  minify?: MinifyOptions | boolean
}
