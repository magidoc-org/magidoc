<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.HTML
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

{@html token.text}
