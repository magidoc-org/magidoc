<script lang="ts">
import type { Tokens } from 'marked'
import type { MarkdownOptions, Renderers } from '../markedConfiguration'

export const token: Tokens.Paragraph | undefined = undefined
export const options: MarkdownOptions | undefined = undefined
export const renderers: Renderers | undefined = undefined
</script>

<p>
  <slot />
</p>
