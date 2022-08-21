<script lang="ts">
  import type { MagidocSearchResult } from '$lib/search'
  import AppMarkdownSearchResult from './AppMarkdownSearchResult.svelte'

  export let item: MagidocSearchResult
</script>

{#if item.result.data.type === 'markdown'}
  <AppMarkdownSearchResult
    result={item.result}
    indexes={item.indexes}
    on:click
  />
{/if}
