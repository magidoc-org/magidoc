<script lang="ts">
import AppTag from '../common/AppTag.svelte'
import AppTooltip from '../common/AppTooltip.svelte'

export let reason: string | undefined | null
</script>

{#if reason}
  <AppTag color="red">
    <AppTooltip text={reason}>Deprecated</AppTooltip>
  </AppTag>
{/if}
