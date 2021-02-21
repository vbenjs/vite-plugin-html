# vite-plugin-html

**English** | [中文](./README.zh_CN.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

A Vite plugin for index.html that provides minify and EJS template-based functionality.

### Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```
yarn add vite-plugin-html -D
```

or

```
npm i vite-plugin-html -D
```

## Usage

- Config plugin in vite.config.ts. In this way, the required functions can be introduced as needed

```ts
import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import { minifyHtml, injectHtml } from '../src/index';

export default defineConfig({
  plugins: [
    vue(),
    minifyHtml(),
    injectHtml({
      injectData: {
        title: 'vite-plugin-html-example',
        injectScript: '<script src="./inject.js"></script>',
      },
    }),
  ],
});
```

- If you don’t want to separate, you can directly Import it as a whole

```ts
import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import html from '../src/index';

export default defineConfig({
  plugins: [
    vue(),
    html({
      inject: {
        injectData: {
          title: 'vite-plugin-html-example',
          injectScript: '<script src="./inject.js"></script>',
        },
      },
      minify: true,
    }),
  ],
});
```

## injectHtml Parameter Description

`injectHtml(InjectOptions)`

**InjectOptions**

| Parameter | Types | Default | Description |
| --- | --- | --- | --- |
| injectData | `Record<string, any>` | - | Injected data |
| injectOptions | `EJSOptions` | - | ejs configuration items[EJSOptions](https://github.com/mde/ejs#options) |
| tags | `HtmlTagDescriptor` | - | An array of tag descriptor objects ({ tag, attrs, children }) to inject to the existing HTML. Each tag can also specify where it should be injected to (default is prepending to `<head>`)） |

`injectData` can be obtained using the `ejs` template syntax in `index.html`

## minifyHtml Parameter Description

`minifyHtml(MinifyOptions | boolean)`: Default`true`

**MinifyOptions**

Default compression configuration

```ts
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
```

## Example

**Run Example**

```bash

cd ./example

yarn install

yarn serve

```

## Sample project

[Vben Admin](https://github.com/anncwb/vue-vben-admin)

## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
