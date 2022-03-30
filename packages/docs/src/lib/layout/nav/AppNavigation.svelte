<script lang="ts">
  import type { Pages } from '$lib/pages'

  import { SideNav, SideNavItems } from 'carbon-components-svelte'
  import NavMenu from './NavMenu.svelte'

  export let isOpen = true
  export let pages: Pages
</script>

<SideNav {isOpen}>
  <SideNavItems>
    {#each pages.tree as item}
      <NavMenu {item} />
    {/each}
  </SideNavItems>
</SideNav>
