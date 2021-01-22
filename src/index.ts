import type { Plugin } from 'vite';
import type { Options } from './types';

import { injectHtml } from './injectHtml';
import { minifyHtml } from './minifyHtml';

export { injectHtml, minifyHtml };

export default (options: Options = {}): Plugin[] => {
  const { inject = {}, minify = {} } = options;
  return [injectHtml(inject), minifyHtml(minify)];
};
