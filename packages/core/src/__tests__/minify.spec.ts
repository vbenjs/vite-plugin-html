import { minifyHtml } from '../minifyHtml'
import { describe, test, expect } from 'vitest'

const createVitePlugin = () => {
  const { name, generateBundle } = minifyHtml()
  return { name, generateBundle }
}

describe('minify html plugin test.', () => {
  test('name', async () => {
    const { name } = await createVitePlugin()
    expect(name).toEqual('vite:minify-html')
  })

  test('name', async () => {
    const { name } = await createVitePlugin()
    expect(name).toEqual('vite:minify-html')
  })
})
