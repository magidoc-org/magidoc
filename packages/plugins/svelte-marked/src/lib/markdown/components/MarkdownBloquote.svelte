<script lang="ts">
import type { Tokens } from 'marked'
import type { MarkdownOptions, Renderers } from '../markedConfiguration'

export const token: Tokens.Blockquote = undefined
export const options: MarkdownOptions = undefined
export const renderers: Renderers = undefined
</script>

<blockquote>
  <slot />
</blockquote>
