<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.Image
  export let options: MarkdownOptions
  export let renderers: Renderers
</script>

<img
  src={token.href}
  title={token.title}
  alt={token.text}
  class="markdown-image"
/>

<!-- Hack to stop warnings from printing -->
{#if false}
  <slot />
{/if}

<style>
  .markdown-image {
    max-width: 100%;
  }
</style>
