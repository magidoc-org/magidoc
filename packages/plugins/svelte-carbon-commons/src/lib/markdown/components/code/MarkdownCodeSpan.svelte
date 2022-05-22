<script lang="ts">
  import type { MarkdownOptions, Renderers } from '$lib/markdown/marked'
  import type { marked } from 'marked'

  export let token: marked.Tokens.Codespan
  export let options: MarkdownOptions
  export let renderers: Renderers
</script>

<code class="code-span">{token.text}</code>

<!-- Hack to stop warnings from printing -->
{#if false}
  <slot />
{/if}

<style>
  .code-span {
    background: #f0f0f0;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    border-radius: 0.1rem;
  }
</style>
