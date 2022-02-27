<script lang="ts">
  import NeverEmptyCell from './NeverEmptyCell.svelte'

  export let value: unknown
</script>

{#if typeof value == 'string'}
  "{value}"
{:else if typeof value === 'object'}
  {JSON.stringify(value, null, 2)}
{:else}
  <NeverEmptyCell {value} />
{/if}
