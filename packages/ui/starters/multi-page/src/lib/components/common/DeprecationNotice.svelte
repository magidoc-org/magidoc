<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'

  export let deprecationReason: string | undefined | null
</script>

{#if deprecationReason}
  <InlineNotification
    hideCloseButton
    kind="warning"
    title="Deprecated Query:"
    style="max-width: 100%"
    subtitle={deprecationReason}
  />
{/if}
