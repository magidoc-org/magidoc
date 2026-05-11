import * as MarkdownComponents from './markdown/components'
import { extensions } from './markdown/extensions'
import type { ContainerOptions, TokenExtractionParameters, TokenExtractor } from './markdown/extensions/container'
import Markdown from './markdown/Markdown.svelte'
import MarkdownToken from './markdown/MarkdownToken.svelte'
import MarkdownTokens from './markdown/MarkdownTokens.svelte'
import type { MarkdownOptions, Renderers, RendererType } from './markdown/markedConfiguration'
import { generatePathSegment, isRelative, joinUrlPaths } from './utils/url'

export default Markdown
export type { ContainerOptions, MarkdownOptions, Renderers, RendererType, TokenExtractionParameters, TokenExtractor }
export { extensions, MarkdownComponents, MarkdownToken, MarkdownTokens }

const urlUtils = {
  joinUrlPaths,
  isRelative,
  generatePathSegment,
}

export { urlUtils }
