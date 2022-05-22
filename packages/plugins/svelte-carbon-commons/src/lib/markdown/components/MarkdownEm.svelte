<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../markedConfiguration'

  export const token: marked.Tokens.Em = undefined
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<em>
  <slot />
</em>
