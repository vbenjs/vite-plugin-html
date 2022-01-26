import { createMinifyHtmlPlugin, minifyHtml } from '../minifyHtml'
import { describe, test, expect } from 'vitest'

const createVitePlugin = () => {
  const { name, generateBundle } = createMinifyHtmlPlugin()
  return { name, generateBundle }
}

describe('minify html plugin test.', () => {
  test('make sure name.', async () => {
    const { name } = await createVitePlugin()
    expect(name).toEqual('vite:minify-html')
  })

  test('make sure generateBundle.', async () => {
    const { generateBundle } = await createVitePlugin()
    const generate: any = generateBundle
    const testBundle = {
      test: {
        type: 'asset',
        fileName: 'index.html',
        source: `
        <!DOCTYPE html>
        <html>
        <style>
        div {
          color: red;
        }
        </style>
        </html>
        `,
      },
    }
    await generate(null, testBundle, false)
    expect(testBundle.test.source).toEqual(
      `<!doctype html><html><style>div{color:red}</style></html>`,
    )
  })

  test('minify is true.', async () => {
    const ret = await minifyHtml(
      `<!DOCTYPE html>
<html>
</html>
`,
      true,
    )
    expect(ret).toEqual(`<!doctype html><html></html>`)
  })

  test('minify is false.', async () => {
    const ret = await minifyHtml(
      `<!DOCTYPE html>
<html>
</html>
`,
      false,
    )
    expect(ret).toEqual(
      `<!DOCTYPE html>
<html>
</html>
`,
    )
  })

  test('minify css.', async () => {
    const ret = await minifyHtml(
      `<!DOCTYPE html>
<html>
<style>
div {
  color: red;
}
</style>
</html>
`,
      true,
    )
    expect(ret).toEqual(
      `<!doctype html><html><style>div{color:red}</style></html>`,
    )
  })

  test('custom minify options.', async () => {
    const ret = await minifyHtml(
      `<!DOCTYPE html>
<html>
<style>
div {
  color: red;
}
</style>
</html>
`,
      { minifyCSS: true },
    )
    expect(ret).toEqual(`<!DOCTYPE html>
<html>
<style>div{color:red}</style>
</html>
`)
  })
})
