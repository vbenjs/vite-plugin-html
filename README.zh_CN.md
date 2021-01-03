# vite-plugin-html

**中文** | [English](./README.md)

[![npm][npm-img]][npm-url] [![node][node-img]][node-url]

一个处理 HTML 的 Vite 插件。它基于 lodash 模板开发

### 安装 (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0-beta.4

`yarn add vite-plugin-html@next -D` or `npm i vite-plugin-html@next -D`

### 示例

**运行示例**

```bash

cd ./examples

yarn install

yarn serve

```

## 使用

- `vite.config.ts` 中的配置插件

```ts
import { UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import html from 'vite-plugin-html';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      html({
        title: 'Vite App',
        minify: command === 'build',
        options: {
          injectConfig: '<script src="./a.js"></script>',
        },
        tags: [
          {
            tag: 'div',
            attrs: {
              src: './',
            },
            children: 'content',
            injectTo: 'body',
          },
        ],
      }),
    ],
  };
};
```

### 选项说明

**title**

type: `string`

default: ''

description: `index.html`内`title`标签内容

**minify**

type: `boolean|Options`, [Options](https://github.com/terser/html-minifier-terser#options-quick-reference)

default: `command === 'build'` .

如果是对象类型，则默认以下配置，可以覆盖

```ts
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeAttributeQuotes: true,
  trimCustomFragments: true,
  collapseWhitespace: true,

```

description: html 压缩配置

**options**

type: `Record<string,any>`,

default: `{}`

description: 用户定义的配置变量。您可以在 index.html 中使用`viteHtmlPluginOptions.xxx`来获取

HTML 使用[lodash.template](https://lodash.com/docs/4.17.15#template)语法进行模板处理

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

description：要插入到现有 HTML 的标记描述符对象（{tag，attrs，children}）的数组。每个标签还可以指定应将标签注入到何处（默认情况是在前面添加<head>）。

e.g

**vite.config.ts**

```ts
import { UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import html from 'vite-plugin-html';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      html({
        options: {
          opt1: '<script src="./a.js"></script>',
          opt2: '<script src="./a.js"></script>',
        },
      }),
    ],
  };
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

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html
[node-img]: https://img.shields.io/node/v/vite-plugin-html.svg
[node-url]: https://nodejs.org/en/about/releases/
