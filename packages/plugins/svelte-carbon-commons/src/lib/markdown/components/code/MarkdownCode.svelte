<script lang="ts">
  import type { MarkdownOptions, Renderers } from '$lib/markdown/marked'
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import type { marked } from 'marked'
  import './prism-theme.css'

  export let showCopyButton = true
  export let showLineNumbers = true

  export let token: marked.Tokens.Code
  export let options: MarkdownOptions = undefined
  export let renderers: Renderers = undefined
</script>

<Prism
  language={token.lang}
  source={token.text}
  {showCopyButton}
  {showLineNumbers}
/>

<!-- Hack to stop warnings from printing -->
{#if false}
  <slot />
{/if}
