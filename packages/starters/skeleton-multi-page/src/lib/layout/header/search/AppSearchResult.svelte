<script lang="ts">
import type { MagidocSearchResult } from '$lib/search'
import AppGraphQlSearchResult from './AppGraphQLSearchResult.svelte'
import AppMarkdownSearchResult from './AppMarkdownSearchResult.svelte'

export let item: MagidocSearchResult
</script>

{#if item.type === 'markdown'}
  <AppMarkdownSearchResult
    result={item.result}
    indexes={item.matches[0].indices}
    on:click
  />
{:else if item.type === 'graphql'}
  <AppGraphQlSearchResult {item} on:click />
{/if}
