<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export const token: marked.Tokens.Strong = undefined
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<strong>
  <slot />
</strong>
