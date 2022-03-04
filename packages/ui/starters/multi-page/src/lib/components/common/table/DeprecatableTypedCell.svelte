<script lang="ts">
  import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
  import { TooltipIcon } from 'carbon-components-svelte'
  import { WarningFilled16 } from 'carbon-icons-svelte'

  export let name: string
  export let typeLink: string
  export let deprecationReason: string | null | undefined
</script>

<span>
  <DeprecatedTag reason={deprecationReason} />
</span>
