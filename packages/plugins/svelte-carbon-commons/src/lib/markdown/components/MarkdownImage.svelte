<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.Image
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<img
  src={token.href}
  title={token.title}
  alt={token.text}
  class="markdown-image"
/>

<style>
  .markdown-image {
    max-width: 100%;
  }
</style>
