# vite-plugin-html

**中文** | [English](./README.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

一个针对 index.html，提供压缩和基于 ejs 模板功能的 vite 插件。

## 安装 (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-html -D
```

或

```bash
npm i vite-plugin-html -D
```

## 使用

- 在 `index.html` 中增加 EJS 标签，例如

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%- title %></title>
  <%- injectScript %>
</head>
```

- 在 `vite.config.ts` 中配置,该方式可以按需引入需要的功能即可

```ts
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import { minifyHtml, injectHtml } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    minifyHtml(),
    injectHtml({
      data: {
        title: 'vite-plugin-html-example',
        injectScript: '<script src="./inject.js"></script>',
      },
    }),
  ],
})
```

- 如果不想分开，则可以直接整体引入

```ts
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import html from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    html({
      inject: {
        data: {
          title: 'vite-plugin-html-example',
          injectScript: '<script src="./inject.js"></script>',
        },
      },
      minify: true,
    }),
  ],
})
```

## injectHtml 参数说明

默认会向 index.html 注入 `.env` 文件的内容，类似 vite 的 `loadEnv`函数

`injectHtml(InjectOptions)`

### InjectOptions

| 参数       | 类型                  | 默认值 | 说明                                                                                                                         |
| ---------- | --------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| data       | `Record<string, any>` | -      | 注入的数据                                                                                                                   |
| ejsOptions | `EJSOptions`          | -      | ejs 配置项[EJSOptions](https://github.com/mde/ejs#options)                                                                   |
| tags       | `HtmlTagDescriptor`   | -      | 标记描述符对象（{ tag, attrs, children }）的数组，以插入到现有的 HTML 中。每个标签还可以指定将其注入的位置（默认为`<head>`） |

`data` 可以`index.html`中使用`ejs`模版语法获取

## minifyHtml 参数说明

`minifyHtml(MinifyOptions | boolean)`:默认为`true`

### MinifyOptions

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
    html5: true,
    keepClosingSlash: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
```

## 示例

### 运行示例

```bash
yarn

cd ./packages/playground

yarn dev

```

## 示例项目

[Vben Admin](https://github.com/anncwb/vue-vben-admin)

## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
