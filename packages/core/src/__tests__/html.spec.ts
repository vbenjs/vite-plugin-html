import { createPlugin, createSpaPage, renderHtml } from '../htmlPlugin'
import { describe, test, expect } from 'vitest'

const createVitePlugin = () => {
  const { name } = createPlugin()
  return { name }
}

describe('html plugin test.', () => {
  test('make sure name.', async () => {
    const { name } = await createVitePlugin()
    expect(name).toEqual('vite:html')
  })
})

describe('function test.', () => {
  test('createSpaPage function test.', async () => {
    const page = createSpaPage('main.ts', 'public/index.html', {
      data: { a: '1' },
      ejsOptions: {},
    })
    expect(page).toEqual({
      filename: 'index.html',
      template: 'public/index.html',
      entry: 'main.ts',
      injectOptions: { data: { a: '1' }, ejsOptions: {} },
    })
  })

  test('renderHtml function test.', async () => {
    const content = await renderHtml(
      `
<!DOCTYPE html>
<html>
  <head>
    <title><%- title %></title>
    <title><%- ENV_TITLE %></title>
  </head>
</html>
`,
      {
        injectOptions: {
          data: { title: 'test-title' },
        },
        viteConfig: {} as any,
        env: {
          ENV_TITLE: 'env-title',
        },
      },
    )
    expect(content).toEqual(`
<!DOCTYPE html>
<html>
  <head>
    <title>test-title</title>
    <title>env-title</title>
  </head>
</html>
`)
  })
})
