<script lang="ts">
  import type { marked } from 'marked'
  import MarkdownTokens from './MarkdownTokens.svelte'
  import type { MarkdownOptions, Renderers } from './marked'

  export let token: marked.Token
  export let renderers: Renderers
  export let options: MarkdownOptions
</script>

{#if renderers[token.type]}
  <svelte:component this={renderers[token.type]} {token} {options} {renderers}>
    {#if token['tokens']}
      <MarkdownTokens tokens={token['tokens']} {renderers} {options} />
    {:else}
      {token.raw}
    {/if}
  </svelte:component>
{/if}
