import { base } from '$app/paths'
import {
  pages as pagesBuilder,
  type Page,
} from '@magidoc/plugin-starter-common'
import { schema } from './schema'

const pagesModel = pagesBuilder.buildPages({
  basePath: base,
  schema: schema,
})

export const home = pagesModel.home
export const pages = pagesModel.pages

export function findPageByHref(href: string): Page | null {
  return pagesBuilder.findPageByHref(pages, href)
}
