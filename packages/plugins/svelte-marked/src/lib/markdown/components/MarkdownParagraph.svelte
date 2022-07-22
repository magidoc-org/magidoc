<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../markedConfiguration'

  export const token: marked.Tokens.Paragraph = undefined
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<p>
  <slot />
</p>
