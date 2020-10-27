# vite-plugin-mock

Provide local and prod mocks for vite.

A mock plugin for vite, developed based on mockjs. And support the local environment and production environment at the same time. Koa service middleware is used locally, mockjs is used online

## Getting Started

### Install (yarn or npm)

**node version:** >=12.0.0

`yarn add mockjs` or `yarn add mockjs -S`

and

`yarn add vite-plugin-mock -D` or `npm i vite-plugin-mock -D`

**Run Example**

```bash

# ts example
cd ./examples/ts-examples

yarn install

yarn serve

# js example

cd ./examples/js-examples

yarn install

yarn serve
```

## Usage

**Development environment**

The development environment is implemented using koa middleware。

Different from the production environment, you can view the network request record in the Google Chrome console

- Config plugin in vite.config.ts

```ts
import { createMockServer } from 'vite-plugin-mock';

export default {
  plugins: [
    createMockServer({
      ignore: /^\_/,
      mockPath: 'mock',
      watchFiles: true,
      localEnabled: process.env.NODE_ENV === 'development',
    }),
  ],
};
```

- createMockServer Options

```ts
{
    mockPath?: string;
    supportTs?: boolean;
    ignore?: RegExp | ((fileName: string) => boolean);
    watchFiles?: boolean;
    localEnabled?: boolean;
    ignoreFiles?: string[];
    configPath?: string;
}
```

## Option description

### mockPath

**default:** true

Set the folder where the mock .ts file is stored

If `watchFiles:true`, the file changes in the folder will be monitored. And synchronize to the request result in real time

If configPath has a value, it is invalid

### supportTs

**default:** true

After opening, the ts file module can be read. Note that you will not be able to monitor .js files after opening.

### ignore

**default:** undefined

Ignore files in the specified format when automatically reading mock .ts files

### watchFiles

**default:** true

Set whether to monitor changes in mock .ts files

### localEnabled

**default:** process.env.NODE_ENV==='developments'

Set whether to enable the local mock .ts file, do not open it in the production environment

### configPath

**default:** vite.mock.config.ts

Set the data entry that the mock reads. When the file exists and is located in the project root directory, the file will be read and used first. The configuration file returns an array

### ignoreFiles

**default:** []

The project uses glob to read the folder set by mockPath. This parameter is used as the parameter of the glob module

## Mock file example

`/path/mock`

```ts
// test.ts

import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
        	name: 'vben'
        }
      };
    },
  },
   {
    url: '/api/post',
    method: 'post',
    timeout:2000,
    response: {
      	code: 0,
       data: {
        	name: 'vben'
        }
      };
  },
] as MockMethod[];


```

### MockMethod

```ts
{
  // request url
  url: string;
  // request method
  method?: MethodType;
  // Request time in milliseconds
  timeout?: number;
  // response data
  response: ((opt: { [key: string]: string; body: any; query: any }) => any) | any;
}

```

## Usage in Production environment

### Example

Create a new mockProdServer.ts file

```ts
//  mockProdServer.ts

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// Import your mock .ts files one by one
// If you use vite.mock.config.ts, just import the file directly
import testModule from '../mock/test';

export function setupProdMockServer() {
  createProdMockServer([...testModule]);
}
```

In mian.ts

```ts
// src/main.ts

import { setupProdMockServer } from './mockProdServer';

if (process.env.NODE_ENV === 'production') {
  setupProdMockServer();
}
```

## Note

The node module cannot be used in the mock .ts file, otherwise the production environment will fail

## License

MIT
