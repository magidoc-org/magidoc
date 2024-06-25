<script lang="ts">
import { isRelative, joinUrlPaths } from '$lib/utils/url'
import type { Tokens } from 'marked'
import type { MarkdownOptions, Renderers } from '../markedConfiguration'

export let token: Tokens.Image
export let options: MarkdownOptions
export const renderers: Renderers = undefined
</script>

<img
  src={isRelative(token.href)
    ? joinUrlPaths(options.baseUrl, token.href)
    : token.href}
  title={token.title}
  alt={token.text}
  class="markdown-image"
/>

<style>
  .markdown-image {
    max-width: 100%;
  }
</style>
