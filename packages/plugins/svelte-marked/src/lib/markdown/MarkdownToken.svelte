<script lang="ts">
  import type { Token } from 'marked'
  import MarkdownTokens from './MarkdownTokens.svelte'
  import type { MarkdownOptions, Renderers } from './markedConfiguration'

  export let token: Token
  export let renderers: Renderers
  export let options: MarkdownOptions
</script>

{#if renderers[token.type]}
  <svelte:component this={renderers[token.type]} {token} {options} {renderers}>
    {#if 'tokens' in token && token['tokens']}
      <MarkdownTokens tokens={token['tokens']} {renderers} {options} />
    {:else}
      {token.raw}
    {/if}
  </svelte:component>
{/if}
