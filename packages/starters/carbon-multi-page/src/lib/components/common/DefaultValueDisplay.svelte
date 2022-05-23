<script lang="ts">
  import { CodeSpan } from '@magidoc/plugin-svelte-carbon-commons'

  export let value: unknown
</script>

<CodeSpan>
  {#if typeof value == 'string'}
    "{value}"
  {:else if typeof value === 'object'}
    {JSON.stringify(value, null, 2)}
  {:else}
    {value ?? '-'}
  {/if}
</CodeSpan>
