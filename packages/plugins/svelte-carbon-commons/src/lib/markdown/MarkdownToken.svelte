<script lang="ts">
  import type { marked } from 'marked'
  import MarkdownTokens from './MarkdownTokens.svelte'
  import type { Renderers } from './marked'

  export let token: marked.Token
  export let renderers: Renderers
</script>

{#if renderers[token.type]}
  {@const renderer = renderers[token.type]}
  <svelte:component this={renderer} {...token}>
    {#if token['tokens']}
      <MarkdownTokens tokens={token['tokens']} {renderers} />
    {:else}
      {token.raw}
    {/if}
  </svelte:component>
{/if}
