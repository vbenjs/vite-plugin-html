import type { ResolvedConfig, Plugin, TransformResult } from 'vite'
import type { InjectOptions, PageOption, UserOptions } from './typing'
import { render } from 'ejs'
import { cleanUrl, loadEnv } from './utils'
import { getPageConfig, getHtmlInPages } from './utils/page'
import { htmlFilter } from './utils/createHtmlFilter'
import consola from 'consola'

const DEFAULT_PAGE = 'index.html'

export function createInjectPlugin({
  inject = {},
  pages = [],
}: UserOptions): Plugin {
  let viteConfig: ResolvedConfig
  let env: Record<string, any> = {}

  const isMpa = () => {
    const input = viteConfig?.build?.rollupOptions?.input ?? undefined
    return typeof input !== 'string' && Object.keys(input || {}).length > 0
  }

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

        if (!htmlFilter(url) && url !== '/') {
          return next()
        }

        try {
          let page: PageOption
          if (isMpa() || pages.length) {
            const htmlName = url === '/' ? DEFAULT_PAGE : url.replace('/', '')
            page = getPageConfig(htmlName, pages, DEFAULT_PAGE)
          } else {
            page = createSpaPage(inject)
          }

          const { injectOptions = {} } = page
          let html = await getHtmlInPages(page)
          html = await renderHtml(html, { injectOptions, viteConfig, env })
          html = await server.transformIndexHtml(url, html, req.originalUrl)
          res.end(html)
        } catch (e) {
          consola.log(e)
        }
      })
    },
    transform(code, id): Promise<TransformResult> | TransformResult {
      if (viteConfig.command === 'build' && htmlFilter(id)) {
        let page: PageOption

        if (isMpa() || pages.length) {
          const htmlName = id.match('[^/]+(?!.*/)')?.[0] ?? DEFAULT_PAGE
          page = getPageConfig(htmlName, pages, DEFAULT_PAGE)
        } else {
          page = createSpaPage(inject)
        }

        const { injectOptions = {} } = page
        return getHtmlInPages(page).then((code) => {
          return renderHtml(code, { injectOptions, viteConfig, env }).then(
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

function createSpaPage(inject: InjectOptions = {}): PageOption {
  return {
    filename: 'index.html',
    template: 'index.html',
    injectOptions: inject,
  }
}

async function renderHtml(
  html: string,
  config: {
    injectOptions: InjectOptions
    viteConfig: ResolvedConfig
    env: Record<string, any>
  },
) {
  const { injectOptions, viteConfig, env } = config
  const { data, ejsOptions } = injectOptions

  const ejsData: Record<string, any> = {
    ...(viteConfig?.env ?? {}),
    ...(viteConfig?.define ?? {}),
    ...(env || {}),
    ...data,
  }
  return render(html, ejsData, ejsOptions)
}
