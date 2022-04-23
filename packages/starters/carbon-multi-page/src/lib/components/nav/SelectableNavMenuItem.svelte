<script type="ts">
  import { SideNavMenuItem } from 'carbon-components-svelte'
  import { page } from '$app/stores'

  export let href: string
  export let text: string
</script>

<SideNavMenuItem
  {href}
  {text}
  isSelected={$page.url.pathname === href}
  {...$$restProps}
/>
