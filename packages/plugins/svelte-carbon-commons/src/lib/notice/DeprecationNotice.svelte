<script lang="ts">
  import CarbonMarkdown from '$lib/markdown/CarbonMarkdown.svelte'
  import { baseVar } from '$lib/markdown/stores'
  import { InlineNotification } from 'carbon-components-svelte'

  export let deprecationReason: string | undefined | null
</script>

{#if deprecationReason}
  <InlineNotification hideCloseButton lowContrast kind="warning">
    <CarbonMarkdown source={`**Deprecated**: ${deprecationReason}`} base={$baseVar} />
  </InlineNotification>
{/if}
