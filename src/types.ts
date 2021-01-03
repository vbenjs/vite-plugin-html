import type { Options } from 'html-minifier-terser';
import type { HtmlTagDescriptor } from 'vite';
export interface VitePluginHtml {
  /**
   * title tag content
   * @default:
   */
  title?: string;
  /**
   * Minimize html text
   * @default: command === 'build'
   */
  minify?: boolean | Options;
  /**
   * Variables exposed to index.html
   */
  options?: Record<string, any>;
  /**
   * Relative to `tags` will be more flexible
   * Extra text
   */
  tags?: HtmlTagDescriptor[];
}
