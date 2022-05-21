<script lang="ts">
  import type { marked } from 'marked'
  import MarkdownToken from './MarkdownToken.svelte'
  import type { Renderers } from './marked'

  export let tokens: marked.Token[] | null
  export let renderers: Renderers
</script>

{#if tokens}
  {#each tokens as token}
    <MarkdownToken {token} {renderers} />
  {/each}
{/if}
