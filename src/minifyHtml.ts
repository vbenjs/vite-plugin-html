import { minify, Options as MinifyOptions } from 'html-minifier-terser';
import type { Plugin, ResolvedConfig } from 'vite';
import fs from 'fs-extra';
import path from 'path';
import { normalizePath } from 'vite';

export function minifyHtml(minifyOptions: MinifyOptions | boolean = true): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'vite:minifyHtml',

    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    // transformIndexHtml: {
    //   enforce: 'post',
    //   transform(html: string) {
    //     if (!minifyOptions) {
    //       return html;
    //     }
    //     const defaultMinifyOptions = {
    //       collapseBooleanAttributes: true,
    //       collapseWhitespace: true,
    //       minifyCSS: true,
    //       minifyJS: true,
    //       minifyURLs: true,
    //       removeAttributeQuotes: true,
    //       removeComments: true,
    //       removeEmptyAttributes: true,
    //       ...(typeof minifyOptions === 'boolean' ? {} : minifyOptions),
    //     };
    //     return minify(html, defaultMinifyOptions);
    //   },
    // },

    async closeBundle() {
      if (!minifyOptions) {
        return;
      }

      // Since the html conversion can also be maintained inside the plug-in, it cannot be guaranteed that the subsequent plug-in will compress the html. So it is changed to compress after packaging
      const defaultMinifyOptions = {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        ...(typeof minifyOptions === 'boolean' ? {} : minifyOptions),
      };

      const { root, build } = config;
      const { outDir } = build;
      const indexHtmlPath = normalizePath(path.resolve(root, outDir, 'index.html'));
      if (!fs.existsSync(indexHtmlPath)) {
        console.log('no such file: ' + indexHtmlPath);
        return;
      }
      let processHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      processHtml = minify(processHtml, defaultMinifyOptions);

      fs.writeFileSync(indexHtmlPath, processHtml);
    },
  };
}
