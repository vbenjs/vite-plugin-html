import type { Pages, PageOption } from '../typing'

import { existsSync, readFile } from 'fs-extra'
import { resolve } from 'pathe'

export function getPageConfig(
  htmlName: string,
  pages: Pages,
  defaultPage: string,
): PageOption {
  const defaultPageOption: PageOption = {
    filename: defaultPage,
    template: `./${defaultPage}`,
  }
  const page = pages.filter((page) => page.filename === htmlName)?.[0]
  return page ?? defaultPageOption ?? undefined
}

export function getHtmlInPages(page: PageOption) {
  const htmlPath = getHtmlPath(page)
  return readHtml(htmlPath)
}

export function getHtmlPath(page: PageOption) {
  const { template } = page
  const templatePath = template.startsWith('.') ? template : `./${template}`
  return resolve(process.cwd(), templatePath)
}

export async function readHtml(path: string) {
  if (!existsSync(path)) {
    throw new Error(`html is not exist in ${path}`)
  }
  return await readFile(path).then((buffer) => buffer.toString())
}
