<script lang="ts">
import { type MagidocSearchResult, search } from '$lib/search'

import { Modal, Search } from 'carbon-components-svelte'
import AppSearchResult from './search/AppSearchResult.svelte'

export let open = false

let query = ''
let results: ReadonlyArray<MagidocSearchResult>
$: results = search(query)
</script>

{#if open}
  <Modal
    bind:open
    modalHeading="Search"
    passiveModal
    selectorPrimaryFocus="#search-bar"
    hasScrollingContent={false}
  >
    <Search id="search-bar" bind:value={query} />

    <div style="max-height: 90%; overflow-y: auto">
      {#each results as item}
        <AppSearchResult {item} on:click={() => (open = false)} />
      {/each}
    </div>
  </Modal>
{/if}
