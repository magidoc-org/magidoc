<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'

  export let deprecationReason: string | undefined | null
</script>

{#if deprecationReason}
  <InlineNotification
    hideCloseButton
    lowContrast
    kind="warning"
    title="Deprecation: "
    style="max-width: 100%"
    subtitle={deprecationReason}
  />
{/if}
