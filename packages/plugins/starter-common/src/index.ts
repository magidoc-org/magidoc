import { initialize, get, getOrDefault } from './pages/variables'
import { getAppLogo, getAppTitle, getSiteMeta, Meta } from './pages/meta'
import { setupMarked } from './markdown/setup'

export * from './pages/tree'
export type { Meta }

export const markdown = { setupMarked }
export const variables = { initialize, get, getOrDefault }
export const meta = { getAppLogo, getAppTitle, getSiteMeta }
