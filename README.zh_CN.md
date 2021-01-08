# vite-plugin-html

**中文** | [English](./README.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

一个针对 index.html，提供精简和基于 ejs 模板功能的 Vite 插件。

### 安装 (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0-beta.4

`yarn add vite-plugin-html@next -D` or `npm i vite-plugin-html@next -D`


## 使用

- 在 `vite.config.ts` 中配置

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


## 示例

**运行示例**

```bash

cd ./examples

yarn install

yarn serve

```


## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
