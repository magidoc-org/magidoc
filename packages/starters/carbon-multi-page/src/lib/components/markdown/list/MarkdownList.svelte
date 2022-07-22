<script lang="ts">
  import {
    MarkdownToken,
    type MarkdownOptions,
    type Renderers,
  } from '@magidoc/plugin-svelte-marked'

  import { OrderedList, UnorderedList } from 'carbon-components-svelte'
  import type { marked } from 'marked'

  export let token: marked.Tokens.List
  export let options: MarkdownOptions
  export let renderers: Renderers

  let component: unknown
  $: component = token.ordered ? OrderedList : UnorderedList
</script>

<svelte:component
  this={component}
  class="markdown-list-style"
  style={`counter-reset: item ${Number(token.start) - 1}`}
>
  {#each token.items as item}
    <MarkdownToken token={{ ...item }} {options} {renderers} />
  {/each}
</svelte:component>

<style>
  :global(.markdown-list-style) {
    padding: revert !important;
  }
</style>
