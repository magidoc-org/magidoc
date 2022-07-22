<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'
  import CarbonMarkdown from '../../markdown/CarbonMarkdown.svelte'

  export let deprecationReason: string | undefined | null
</script>

{#if deprecationReason}
  <InlineNotification hideCloseButton lowContrast kind="warning">
    <CarbonMarkdown source={`**Deprecated**: ${deprecationReason)}`} />
  </InlineNotification>
{/if}
