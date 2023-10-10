<script lang="ts">
  import type { Tokens } from 'marked'
  import type { MarkdownOptions, Renderers } from '../markedConfiguration'

  export let token: Tokens.Image
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
