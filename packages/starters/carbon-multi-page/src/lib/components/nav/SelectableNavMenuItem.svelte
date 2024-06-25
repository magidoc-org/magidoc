<script lang="ts">
import { SideNavMenuItem } from 'carbon-components-svelte'

export let href: string
export let text: string
export let currentRef: string
</script>

<SideNavMenuItem
  {href}
  {text}
  isSelected={currentRef === href}
  {...$$restProps}
/>
