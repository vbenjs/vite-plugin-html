import type { ResolvedConfig, Plugin } from 'vite'
import type { InjectOptions } from './types'
import { render } from 'ejs'
import path from 'path'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import fs from 'fs'

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
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string) {
        const { injectData = {}, data, ejsOptions, injectOptions = {}, tags = [] } = options

        const ejsData: Record<string, any> = {
          ...(config?.env ?? {}),
          ...(config?.define ?? {}),
          ...(env || {}),
          ...(data || injectData),
        }

        return {
          html: render(html, ejsData, ejsOptions || injectOptions) as string,
          tags: tags,
        }
      },
    },
  }
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
