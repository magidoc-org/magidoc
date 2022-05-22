<script lang="ts">
  import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
  import { InlineNotification } from 'carbon-components-svelte'

  export let deprecationReason: string | undefined | null
</script>

{#if deprecationReason}
  <InlineNotification hideCloseButton lowContrast kind="warning">
    <CarbonMarkdown source={`**Deprecated**: ${deprecationReason}`} />
  </InlineNotification>
{/if}
