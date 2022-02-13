<script lang="ts">
  import {
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
  } from 'carbon-components-svelte'
  import Queries from './Queries.svelte'

  export let isOpen = true
</script>

<SideNav {isOpen}>
  <SideNavItems>
    <SideNavMenu text="Introduction" expanded>
      <SideNavMenuItem href="/introduction/welcome" text="Welcome" />
    </SideNavMenu>
    <Queries />
  </SideNavItems>
</SideNav>
