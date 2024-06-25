<script lang="ts">
import { Tag, TooltipDefinition } from 'carbon-components-svelte'

export let reason: string | undefined | null
</script>

{#if reason}
  <Tag type="red">
    <TooltipDefinition tooltipText={reason}>Deprecated</TooltipDefinition>
  </Tag>
{/if}
