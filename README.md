# vite-plugin-html

**English** | [中文](./README.zh_CN.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

A Vite plugin for index.html that provides minify and EJS template-based functionality.

### Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0-beta.4

`yarn add vite-plugin-html@next -D` or `npm i vite-plugin-html@next -D`


## Usage

- Config plugin in vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { minifyHtml, injectHtml } from '../src/index'

export default defineConfig({
  plugins: [
    vue(),
    minifyHtml(),
    injectHtml({
      title: 'vite-plugin-html-example',
      injectScript: '<script src="./inject.js"></script>'
    })
  ]
})
```


## Example

**Run Example**

```bash

cd ./example

yarn install

yarn serve

```


## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
