<script lang="ts">
  import type { MarkdownOptions, Renderers } from '$lib/markdown/marked'
  import { OrderedList, UnorderedList } from 'carbon-components-svelte'
  import type { marked } from 'marked'

  export let token: marked.Tokens.List
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

{#if token.ordered}
  <OrderedList nested expressive>
    <slot />
  </OrderedList>
{:else}
  <UnorderedList nested expressive>
    <slot />
  </UnorderedList>
{/if}
