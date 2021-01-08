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