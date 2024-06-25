<script lang="ts">
export let value: unknown
</script>

{#if typeof value == 'string'}
  "{value}"
{:else if typeof value === 'object'}
  {JSON.stringify(value, null, 2)}
{:else}
  {value ?? '-'}
{/if}
