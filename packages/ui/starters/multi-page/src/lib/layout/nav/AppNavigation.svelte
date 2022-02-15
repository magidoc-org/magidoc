<script lang="ts">
  import {
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
  } from 'carbon-components-svelte'
  import Mutations from './Mutations.svelte'
  import Queries from './Queries.svelte'
import Subscriptions from './Subscriptions.svelte';

  export let isOpen = true
</script>

<SideNav {isOpen}>
  <SideNavItems>
    <SideNavMenu text="Introduction" expanded>
      <SideNavMenuItem href="/introduction/welcome" text="Welcome" />
    </SideNavMenu>
    <Queries />
    <Mutations />
    <Subscriptions />
  </SideNavItems>
</SideNav>
