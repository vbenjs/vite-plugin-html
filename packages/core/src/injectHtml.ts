import type { ResolvedConfig, Plugin, TransformResult } from 'vite'
import type { InjectOptions, Pages } from './types'
import { render } from 'ejs'
import path from 'path'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import fs, { promises as fsp } from 'fs'
import process from 'process'

export function injectHtml(options: InjectOptions = {}): Plugin {
  let config: ResolvedConfig
  let env: Record<string, any> = {}

  return {
    name: 'vite:inject-html',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      env = loadEnv(config.mode, config.root, '')
    },
    configureServer(server) {
      const indexPage = 'index.html'
      const queryRE = /\?.*$/s
      const hashRE = /#.*$/s
      const cleanUrl = (url: string): string => url.replace(hashRE, '').replace(queryRE, '')
      server.middlewares.use(async (req, res, next) => {
        const url = cleanUrl(req.url || '')

        if (!url.endsWith('.html') && url !== '/') {
          return next()
        }

        const htmlName = url === '/' ? indexPage : url.replace('/', '')
        const { pages = [] } = options
        try {
          let html = await getHtmlInPages(htmlName, pages)
          html = await generateHtml(html, { options, config, env })
          html = await server.transformIndexHtml(url, html as string, req.originalUrl)
          res.end(html)
        } catch (e) {
          console.log(e)
        }
      })
    },
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string, ctx) {
        const { tags = [] } = options
        console.log(ctx.filename, '===========')
        return {
          html: '',
          tags: tags,
        }
      },
    },
    transform(code, id): Promise<TransformResult> | TransformResult {
      if (config.command === 'build' && id.endsWith('.html')) {
        const htmlName = id.match('[^/]+(?!.*/)')?.[0]
        const { pages = [] } = options
        return getHtmlInPages(htmlName as string, pages).then((code) => {
          return generateHtml(code, { options, config, env }).then((res) => {
            return {
              code: res,
              map: null,
            }
          })
        })
      }
      return {
        code,
        map: null,
      }
    },
  }
}

function getHtmlInPages(htmlName: string, pages: Pages) {
  const htmlPath = getHtmlPath(htmlName, pages)
  return readHtml(htmlPath)
}
function getHtmlPath(htmlName: string, pages: Pages) {
  const page = pages.filter((page) => page.fileName === htmlName)[0]
  if (!page) {
    throw new Error(`${htmlName} page is not exist in pages`)
  }
  const { template } = page
  const templatePath = template.startsWith('.') ? template : `./${template}`
  const pagePath = path.resolve(process.cwd(), templatePath)
  return pagePath
}
async function readHtml(path: string) {
  if (!fs.existsSync(path)) {
    throw new Error('html is not exist')
  }
  return await fsp.readFile(path).then((buffer) => buffer.toString())
}
async function generateHtml(
  html: string,
  config: { options: InjectOptions; config: ResolvedConfig; env: Record<string, any> },
) {
  const { options, config: viteConfig, env } = config
  const { injectData = {}, data, ejsOptions, injectOptions = {} } = options

  const ejsData: Record<string, any> = {
    ...(viteConfig?.env ?? {}),
    ...(viteConfig?.define ?? {}),
    ...(env || {}),
    ...(data || injectData),
  }
  return await render(html, ejsData, ejsOptions || injectOptions)
}

export function loadEnv(mode: string, envDir: string, prefix = ''): Record<string, string> {
  if (mode === 'local') {
    throw new Error(
      `"local" cannot be used as a mode name because it conflicts with ` +
        `the .local postfix for .env files.`,
    )
  }

  const env: Record<string, string> = {}
  const envFiles = [
    /** mode local file */ `.env.${mode}.local`,
    /** mode file */ `.env.${mode}`,
    /** local file */ `.env.local`,
    /** default file */ `.env`,
  ]

  for (const file of envFiles) {
    const path = lookupFile(envDir, [file], true)
    if (path) {
      const parsed = dotenv.parse(fs.readFileSync(path), {
        debug: !!process.env.DEBUG || undefined,
      })

      // let environment variables use each other
      dotenvExpand({
        parsed,
        // prevent process.env mutation
        ignoreProcessEnv: true,
      } as any)

      // only keys that start with prefix are exposed to client
      for (const [key, value] of Object.entries(parsed)) {
        if (key.startsWith(prefix) && env[key] === undefined) {
          env[key] = value
        } else if (key === 'NODE_ENV') {
          // NODE_ENV override in .env file
          process.env.VITE_USER_NODE_ENV = value
        }
      }
    }
  }

  return env
}

export function lookupFile(dir: string, formats: string[], pathOnly = false): string | undefined {
  for (const format of formats) {
    const fullPath = path.join(dir, format)
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return pathOnly ? fullPath : fs.readFileSync(fullPath, 'utf-8')
    }
  }
  const parentDir = path.dirname(dir)
  if (parentDir !== dir) {
    return lookupFile(parentDir, formats, pathOnly)
  }
}
