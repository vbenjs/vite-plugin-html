import { build } from 'vite'
import { minifyHtml } from '../minifyHtml'

const createVitePlugin = () => {
  const { name, generateBundle } = minifyHtml()
  return { name, generateBundle }
}

describe('minify test.', () => {
  test('name', async () => {
    const { name } = await createVitePlugin()
    expect(name).toEqual('vite:minify-html')
  })
})
