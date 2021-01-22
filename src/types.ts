import type { Options as EJSOptions } from 'ejs';
import type { Options as MinifyOptions } from 'html-minifier-terser';
import type { HtmlTagDescriptor } from 'vite';

export interface InjectOptions {
  injectData?: Record<string, any>;
  injectOptions?: EJSOptions;
  tags?: HtmlTagDescriptor[];
}

export interface Options {
  inject?: InjectOptions;
  minify?: MinifyOptions | boolean;
}
