<script lang="ts">
import type { Tokens } from 'marked'
import { isRelative, joinUrlPaths } from '../../utils/url'
import type { MarkdownOptions, Renderers } from '../markedConfiguration'

export let token: Tokens.Link
export let options: MarkdownOptions
export const renderers: Renderers = undefined
</script>

<a
  href={isRelative(token.href) 
    ? joinUrlPaths(options.baseUrl, token.href)
    : token.href}
  title={token.title}
>
  <slot />
</a>
