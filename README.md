# vite-plugin-html

A simple vite plugin. It is developed based on lodash template

## Getting Started

### Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0-beta.3

`yarn add vite-plugin-html -D` or `npm i vite-plugin-html -D`

**Run Example**

```bash

cd ./examples

yarn install

yarn serve

```

## Usage

- Config plugin in vite.config.ts

```ts
import VitePluginHtml from 'vite-plugin-html';

export default {
  plugins: [
    VitePluginHtml({
      title: 'Vite App',
      minify: process.env.NODE_ENV === 'production',
      options: {
        injectConfig: '<script src="./a.js"></script>',
      },
    }),
  ],
};

// plugins: [VitePluginHtml(Options)],
```

### Options Description

**title**

type: `string`

default:''

description: The content of the title tag of the index.html tag

**minify**

type: `boolean|Options`, [Options](https://github.com/terser/html-minifier-terser#options-quick-reference)

default: `isBuild?true:false` .

If it is an object type，Default:

```ts
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeAttributeQuotes: true,
  trimCustomFragments: true,
  collapseWhitespace: true,

```

description: html compression configuration

**options**

type: `{[key:string]:any}`,

default: `{}`

description: User-defined configuration variables. You can use `viteHtmlPluginOptions.xxx` in `index.html` to get

Html Use [lodash.template](https://lodash.com/docs/4.17.15#template) syntax for template processing

**tags**

type: HtmlTagDescriptor[]

```ts
interface HtmlTagDescriptor {
  tag: string;
  attrs?: Record<string, string>;
  children?: string | HtmlTagDescriptor[];
  /**
   * default: 'head-prepend'
   */
  injectTo?: 'head' | 'body' | 'head-prepend';
}
```

description: An array of tag descriptor objects ({ tag, attrs, children }) to inject to the existing HTML. Each tag can also specify where it should be injected to (default is prepending to `<head>`)

e.g

**vite.config.ts**

```ts
import VitePluginHtml from 'vite-plugin-html';

export default {
  plugins: [
    VitePluginHtml({
      options: {
        opt1: '<script src="./a.js"></script>',
        opt2: '<script src="./a.js"></script>',
      },
    }),
  ],
};
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <%= viteHtmlPluginOptions.opt1 %>
  </head>
  <body>
    <%= viteHtmlPluginOptions.opt2 %>
  </body>
</html>
```

## License

MIT
