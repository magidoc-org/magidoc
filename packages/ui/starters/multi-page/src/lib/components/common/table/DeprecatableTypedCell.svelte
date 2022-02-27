<script lang="ts">
  import { TooltipIcon } from 'carbon-components-svelte'
  import { WarningFilled16 } from 'carbon-icons-svelte'

  export let name: string
  export let typeLink: string
  export let deprecationReason: string | null | undefined
</script>

<span class={deprecationReason ? 'deprecated' : ''}>{name}</span>: {@html typeLink}
{#if deprecationReason}
  <TooltipIcon icon={WarningFilled16} tooltipText={deprecationReason} />
{/if}
