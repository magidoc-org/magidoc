<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export const token: marked.Tokens.Del = undefined
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<del>
  <slot />
</del>
