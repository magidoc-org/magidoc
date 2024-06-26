import Markdown from './markdown/Markdown.svelte'
import MarkdownToken from './markdown/MarkdownToken.svelte'
import MarkdownTokens from './markdown/MarkdownTokens.svelte'
import * as MarkdownComponents from './markdown/components'
import { extensions } from './markdown/extensions'
import type { ContainerOptions, TokenExtractionParameters, TokenExtractor } from './markdown/extensions/container'
import type { MarkdownOptions, RendererType, Renderers } from './markdown/markedConfiguration'
import { generatePathSegment, isRelative, joinUrlPaths } from './utils/url'

export default Markdown
export { MarkdownComponents }
export { MarkdownToken, MarkdownTokens }
export { extensions }
export type { ContainerOptions, TokenExtractionParameters, TokenExtractor, MarkdownOptions, RendererType, Renderers }

const urlUtils = {
  joinUrlPaths,
  isRelative,
  generatePathSegment,
}

export { urlUtils }
