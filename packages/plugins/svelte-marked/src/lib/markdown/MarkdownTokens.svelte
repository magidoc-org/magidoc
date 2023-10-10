<script lang="ts">
  import type { Token } from 'marked'
  import MarkdownToken from './MarkdownToken.svelte'
  import type { MarkdownOptions, Renderers } from './markedConfiguration'

  export let tokens: Token[] | null
  export let renderers: Renderers
  export let options: MarkdownOptions
</script>

{#if tokens}
  {#each tokens as token}
    <MarkdownToken {token} {renderers} {options} />
  {/each}
{/if}
