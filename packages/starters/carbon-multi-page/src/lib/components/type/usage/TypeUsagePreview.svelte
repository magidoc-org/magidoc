<script lang="ts">
import AppExpandButton from '$lib/components/common/AppExpandButton.svelte'

export let items: Array<unknown>
let expanded = false
</script>

{#if expanded}
  {#each items as _, index}
    <slot {index} />
  {/each}
{:else}
  {#each items.slice(0, 3) as _, index}
    <slot {index} />
  {/each}
{/if}

{#if items.length > 3}
  <AppExpandButton
    totalItems={items.length}
    collapsedText="Show more"
    expandedText="Show less"
    bind:expanded
  />
{/if}
