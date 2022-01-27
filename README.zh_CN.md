# vite-plugin-html

**中文** | [English](./README.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

## 功能

- HTML 压缩能力
- EJS 模版能力
- 多页应用支持
- 支持自定义`entry`
- 支持自定义`template`

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

import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: 'src/main.ts',
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: 'public/index.html',

      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
})
```

多页应用配置

```ts
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/main.ts',
          filename: 'index.html',
          template: 'public/index.html',
          injectOptions: {
            data: {
              title: 'index',
              injectScript: `<script src="./inject.js"></script>`,
            },
          },
        },
        {
          entry: 'src/other-main.ts',
          filename: 'other.html',
          template: 'public/other.html',
          injectOptions: {
            data: {
              title: 'other page',
              injectScript: `<script src="./inject.js"></script>`,
            },
          },
        },
      ],
    }),
  ],
})
```

## 参数说明

`createHtmlPlugin(options: UserOptions)`

### UserOptions

| 参数     | 类型                     | 默认值        | 说明             |
| -------- | ------------------------ | ------------- | ---------------- | --- |
| entry    | `string`                 | `src/main.ts` | 入口文件         |     |
| template | `string`                 | `index.html`  | 模板的相对路径   |
| inject   | `InjectOptions`          | -             | 注入 HTML 的数据 |
| minify   | `boolean｜MinifyOptions` | -             | 是否压缩 html    |
| pages    | `PageOption`             | -             | 多页配置         |

### InjectOptions

| 参数       | 类型                  | 默认值 | 说明                                                       |
| ---------- | --------------------- | ------ | ---------------------------------------------------------- |
| data       | `Record<string, any>` | -      | 注入的数据                                                 |
| ejsOptions | `EJSOptions`          | -      | ejs 配置项[EJSOptions](https://github.com/mde/ejs#options) |

`data` 可以在 `html` 中使用 `ejs` 模版语法获取

#### env 注入

默认会向 index.html 注入 `.env` 文件的内容，类似 vite 的 `loadEnv`函数

### PageOption

| 参数          | 类型            | 默认值        | 说明             |
| ------------- | --------------- | ------------- | ---------------- | --- |
| filename      | `string`        | -             | html 文件名      |     |
| template      | `string`        | `index.html`  | 模板的相对路径   |
| entry         | `string`        | `src/main.ts` | 入口文件         |     |
| injectOptions | `InjectOptions` | -             | 注入 HTML 的数据 |

### MinifyOptions

默认压缩配置

```ts
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
```

### 运行示例

```bash
pnpm install

# spa
cd ./packages/playground/basic

pnpm run dev

# map
cd ./packages/playground/mpa

pnpm run dev

```

## 示例项目

[Vben Admin](https://github.com/anncwb/vue-vben-admin)

## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
