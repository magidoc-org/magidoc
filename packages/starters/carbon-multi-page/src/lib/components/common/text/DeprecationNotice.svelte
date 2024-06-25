<script lang="ts">
import { InlineNotification } from 'carbon-components-svelte'
import CarbonMarkdown from '../../markdown/CarbonMarkdown.svelte'

export let deprecationReason: string | undefined | null
</script>

{#if deprecationReason}
  <InlineNotification hideCloseButton lowContrast kind="warning">
    <div>
      <CarbonMarkdown source={`**Deprecated**: ${String(deprecationReason)}`} />
    </div>
  </InlineNotification>
{/if}
