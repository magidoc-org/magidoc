import { initialize, get, getOrDefault } from './pages/variables'
import { getAppLogo, getAppTitle, getSiteMeta, Meta } from './pages/meta'
import { setupMarked } from './markdown/setup'
import { buildPages, findPageByHref } from './pages/pages'
import { parseSchema, buildMagidocSchema } from './schema/graphql'
import type {
  FieldWithPossibleDescriptions,
  PossibleDescription,
  MagidocGQLSchema,
  MagidocGraphQLField,
  MagidocGraphQLObject,
  MagidocSubSchema,
} from './schema/graphql'
export * from './pages/tree'

export type {
  Meta,
  FieldWithPossibleDescriptions,
  PossibleDescription,
  MagidocGQLSchema,
  MagidocGraphQLField,
  MagidocGraphQLObject,
  MagidocSubSchema,
}

export const schema = { parseSchema, buildMagidocSchema }
export const pages = { buildPages, findPageByHref }
export const markdown = { setupMarked }
export const variables = { initialize, get, getOrDefault }
export const meta = { getAppLogo, getAppTitle, getSiteMeta }
