# vite-plugin-html

**中文** | [English](./README.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

一个针对 index.html，提供精简和基于 ejs 模板功能的 Vite 插件。

### 安装 (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```
yarn add vite-plugin-html -D
```

或

```
npm i vite-plugin-html -D
```

## 使用

- 在 `vite.config.ts` 中配置,该方式可以按需引入需要的功能即可

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

- 如果不想分开，则可以直接整体引入

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

## injectHtml 参数说明

`injectHtml(InjectOptions)`

**InjectOptions**

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| injectData | `Record<string, any>` | - | 注入的数据 |
| injectOptions | `EJSOptions` | - | ejs 配置项[EJSOptions](https://github.com/mde/ejs#options) |
| tags | `HtmlTagDescriptor` | - | 标记描述符对象（{ tag, attrs, children }）的数组，以插入到现有的 HTML 中。每个标签还可以指定将其注入的位置（默认为`<head>`） |

`injectData` 可以`index.html`中使用`ejs`模版语法获取

## minifyHtml 参数说明

`minifyHtml(MinifyOptions | boolean)`:默认为`true`

**MinifyOptions**

默认压缩配置

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

## 示例

**运行示例**

```bash

cd ./examples

yarn install

yarn serve

```

## 示例项目

[Vben Admin](https://github.com/anncwb/vue-vben-admin)

## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
