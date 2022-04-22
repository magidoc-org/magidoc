<script lang="ts">
  export let value: unknown
</script>

{#if typeof value == 'string'}
  <code>"{value}"</code>
{:else if typeof value === 'object'}
  <code>{JSON.stringify(value, null, 2)}</code>
{:else}
  <code>{value ?? '-'}</code>
{/if}
