import type { ResolvedConfig, Plugin, TransformResult } from 'vite'
import type { InjectOptions, PageOption, Pages } from './typing'
import { render } from 'ejs'
import { resolve } from 'pathe'
import { existsSync, readFile } from 'fs-extra'
import process from 'process'
import { cleanUrl, loadEnv } from './utils'

const defaultPage = 'index.html'

export function createInjectHtmlPlugin(pages: Pages): Plugin {
  let viteConfig: ResolvedConfig
  let env: Record<string, any> = {}

  return {
    name: 'vite:inject-html',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
      env = loadEnv(viteConfig.mode, viteConfig.root, '')
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = cleanUrl(req.url || '')

        if (!url.endsWith('.html') && url !== '/') {
          return next()
        }

        const htmlName = url === '/' ? defaultPage : url.replace('/', '')
        try {
          const page = getPageConfig(htmlName, pages)
          const { options = {} } = page
          let html = await getHtmlInPages(htmlName, page)
          html = await generateHtml(html, { options, viteConfig, env })
          html = await server.transformIndexHtml(
            url,
            html as string,
            req.originalUrl,
          )
          res.end(html)
        } catch (e) {
          console.log(e)
        }
      })
    },
    transform(code, id): Promise<TransformResult> | TransformResult {
      if (viteConfig.command === 'build' && id.endsWith('.html')) {
        const htmlName = id.match('[^/]+(?!.*/)')?.[0] ?? defaultPage
        const page = getPageConfig(htmlName, pages)
        const { options = {} } = page
        return getHtmlInPages(htmlName as string, page).then((code) => {
          return generateHtml(code, { options, viteConfig, env }).then(
            (res) => {
              return {
                code: res,
                map: null,
              }
            },
          )
        })
      }
      return {
        code,
        map: null,
      }
    },
  }
}

function getPageConfig(htmlName: string, pages: Pages): PageOption {
  const defaultPageOption: PageOption = {
    filename: defaultPage,
    template: `./${defaultPage}`,
  }
  const page = pages.filter((page) => page.filename === htmlName)[0]
  return page ?? defaultPageOption
}

function getHtmlInPages(htmlName: string, page: PageOption) {
  const htmlPath = getHtmlPath(htmlName, page)
  return readHtml(htmlPath)
}

function getHtmlPath(htmlName: string, page: PageOption) {
  const { template } = page
  const templatePath = template.startsWith('.') ? template : `./${template}`
  const pagePath = resolve(process.cwd(), templatePath)
  return pagePath
}

async function readHtml(path: string) {
  if (!existsSync(path)) {
    throw new Error(`html is not exist in ${path}`)
  }
  return await readFile(path).then((buffer) => buffer.toString())
}

async function generateHtml(
  html: string,
  config: {
    options: InjectOptions
    viteConfig: ResolvedConfig
    env: Record<string, any>
  },
) {
  const { options, viteConfig, env } = config
  const { data, ejsOptions } = options

  const ejsData: Record<string, any> = {
    ...(viteConfig?.env ?? {}),
    ...(viteConfig?.define ?? {}),
    ...(env || {}),
    ...data,
  }
  return render(html, ejsData, ejsOptions)
}
