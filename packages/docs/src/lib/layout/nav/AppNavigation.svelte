<script lang="ts">
  import { SideNav, SideNavItems } from 'carbon-components-svelte'
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
