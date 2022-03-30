<script lang="ts">
  import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte'
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'
  import NavMenu from './NavMenu.svelte'
  import { pages } from '$lib/pages'

  export let isOpen = true
</script>

<SideNav {isOpen}>
  <SideNavItems>
    {#each $pages.tree as item}
      <NavMenu {item} />
    {/each}
  </SideNavItems>
</SideNav>
