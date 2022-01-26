# vite-plugin-html

**English** | [中文](./README.zh_CN.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

A Vite plugin for index.html that provides minify and EJS template-based functionality.

## Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-html -D
```

or

```bash
npm i vite-plugin-html -D
```

## Usage

- Update your index.html to add some EJS tag

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%- title %></title>
  <%- injectScript %>
</head>
```

- Config plugin in vite.config.ts. In this way, the required functions can be introduced as needed

```ts
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import { minifyHtml, injectHtml } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    minifyHtml(),
    injectHtml([
      {
        fileName: 'index.html',
        template: './index.html',
        options: {
          title: 'vite-plugin-html-example',
          injectScript: '<script src="./inject.js"></script>',
        },
      },
    ]),
  ],
})
```

- If you don’t want to separate, you can directly Import it as a whole

```ts
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import html from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    html({
      pages: [
        {
          fileName: 'index.html',
          template: './index.html',
          options: {
            title: 'vite-plugin-html-example',
            injectScript: '<script src="./inject.js"></script>',
          },
        },
      ],
      minify: true,
    }),
  ],
})
```

## injectHtml Parameter Description

The content of the `.env` file will be injected into index.html by default, similar to the `loadEnv` function of vite

`injectHtml(Pages: PageOption[])`

### PageOption

| Parameter | Types           | Default | Description                    |
| --------- | --------------- | ------- | ------------------------------ | --- |
| fileName  | `string`        | -       | the file to write the HTML to. |     |
| template  | `string`        | -       | relative path to the template. |
| options   | `InjectOptions` | -       | inject to the HTML             |

### options

| Parameter  | Types                 | Default | Description                                                             |
| ---------- | --------------------- | ------- | ----------------------------------------------------------------------- |
| data       | `Record<string, any>` | -       | Injected data                                                           |
| ejsOptions | `EJSOptions`          | -       | ejs configuration items[EJSOptions](https://github.com/mde/ejs#options) |

`data` can be obtained using the `ejs` template syntax in `index.html`

## minifyHtml Parameter Description

`minifyHtml(MinifyOptions | boolean)`: Default`true`

### MinifyOptions

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
    html5: true,
    keepClosingSlash: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
```

## Example

### Run Example

```bash
yarn

cd ./packages/playground

yarn dev

```

## Sample project

[Vben Admin](https://github.com/anncwb/vue-vben-admin)

## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
