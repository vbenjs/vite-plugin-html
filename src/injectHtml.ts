import { render } from 'ejs';
import type { Plugin } from 'vite';
import type { InjectOptions } from './types';

export function injectHtml(options: InjectOptions = {}): Plugin {
  return {
    name: 'vite:injectHtml',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string) {
        const { injectData = {}, injectOptions = {}, tags = [] } = options;
        return {
          html: render(html, injectData, injectOptions) as string,
          tags: tags,
        };
      },
    },
  };
}
