import { Options } from 'html-minifier-terser';

export interface VitePluginHtml {
  title?: string;
  minify?: boolean | Options;
  options?: {
    [key: string]: any;
  };
}
