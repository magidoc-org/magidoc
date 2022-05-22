<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.HTML
  export let options: MarkdownOptions
  export let renderers: Renderers
</script>

{@html token.text}

<!-- Hack to stop warnings from printing -->
{#if false}
  <slot />
{/if}
