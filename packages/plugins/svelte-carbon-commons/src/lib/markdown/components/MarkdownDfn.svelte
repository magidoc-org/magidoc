<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export const token: marked.Tokens.Blockquote = undefined
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<dfn>
  <slot />
</dfn>
