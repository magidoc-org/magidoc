<script lang="ts">
import type { Tokens } from 'marked'
import type { MarkdownOptions, Renderers } from '../markedConfiguration'

export const token: Tokens.Em | undefined = undefined
export const options: MarkdownOptions | undefined = undefined
export const renderers: Renderers | undefined = undefined
</script>

<em>
  <slot />
</em>
