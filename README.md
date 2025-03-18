# vite-plugin-html

**English** | [中文](./README.zh_CN.md)

## Features

- HTML compression capability
- EJS template capability
- Multi-page application support
- Support custom `entry`
- Support custom `template`

## Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-html -D
```

或

```bash
npm i vite-plugin-html -D
```

## Usage

- Add EJS tags to `index.html`, e.g.

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%- title %></title>
  <%- injectScript %>
</head>
```

- Configure in `vite.config.ts`, this method can introduce the required functions as needed

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
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      entry: 'src/main.ts',
      /**
       * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: 'public/index.html',

      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="./inject.js"></script>`,
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag',
            },
          },
        ],
      },
    }),
  ],
})
```

Multi-page application configuration

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
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag1',
                },
              },
            ],
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
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag2',
                },
              },
            ],
          },
        },
      ],
    }),
  ],
})
```

Static Files Handling
Note: This plugin does not process or rewrite URLs starting with /static/ from the root (e.g., ```<img src="/static/img/example.jpg">``` or ```<a href="/static/files/example.pdf">```). These paths are ignored by the plugin's rewriting logic and remain unchanged in the output HTML. If you need to store static files under /static/, ensure they are served correctly by your server or build setup, as they won't be bundled or optimized by vite-plugin-html.

For example:
Use ```<img src="/static/img/example.jpg">``` and place the file with directory img/example.jpg in the static/ directory if you want that it and served directly.

## Parameter Description

`createHtmlPlugin(options: UserOptions)`

### UserOptions

| Parameter | Types                    | Default       | Description                                       |
| --------- | ------------------------ | ------------- | ------------------------------------------------- |
| entry     | `string`                 | `src/main.ts` | entry file path                                   |
| template  | `string`                 | `index.html`  | relative path to the template                     |
| inject    | `InjectOptions`          | -             | Data injected into HTML                           |
| minify    | `boolean｜MinifyOptions` | -             | whether to compress html                          |
| pages     | `PageOption`             | -             | Multi-page configuration                          |

### InjectOptions

| Parameter  | Types                 | Default | Description                                                               |
| ---------- | --------------------- | ------- | ------------------------------------------------------------------------- |
| data       | `Record<string, any>` | -       | injected data                                                             |
| ejsOptions | `EJSOptions`          | -       | ejs configuration Options[EJSOptions](https://github.com/mde/ejs#options) |
| tags       | `HtmlTagDescriptor`   | -       | List of tags to inject                                                    |

`data` can be accessed in `html` using the `ejs` template syntax

#### Env inject

By default, the contents of the `.env` file will be injected into index.html, similar to vite's `loadEnv` function

### PageOption

| Parameter     | Types           | Default       | Description                   |
| ------------- | --------------- | ------------- | ----------------------------- |
| filename      | `string`        | -             | html file name                |
| template      | `string`        | `index.html`  | relative path to the template |
| entry         | `string`        | `src/main.ts` | entry file path               |
| injectOptions | `InjectOptions` | -             | Data injected into HTML       |

### MinifyOptions

Default compression configuration

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

### Run the playground

```bash
pnpm install

# spa
cd ./packages/playground/basic

pnpm run dev

# map
cd ./packages/playground/mpa

pnpm run dev

```

## Example project

[Vben Admin](https://github.com/anncwb/vue-vben-admin)

## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
