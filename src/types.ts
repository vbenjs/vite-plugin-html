import { Options } from 'html-minifier-terser';
import { HtmlTagDescriptor } from 'vite';
export interface VitePluginHtml {
  title?: string;
  minify?: boolean | Options;
  options?: {
    [key: string]: any;
  };
  tags?: HtmlTagDescriptor[];
}
