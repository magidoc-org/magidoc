<script lang="ts">
  import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte'
  import Mutations from './Mutations.svelte'
  import Queries from './Queries.svelte'
  import Subscriptions from './Subscriptions.svelte'
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'
  import Types from './Types.svelte'

  export let isOpen = true
</script>

<SideNav {isOpen}>
  <SideNavItems>
    <SideNavMenu text="Introduction" expanded>
      <SelectableNavMenuItem href="/introduction/welcome" text="Welcome" />
    </SideNavMenu>
    <Queries />
    <Mutations />
    <Subscriptions />
    <Types />
  </SideNavItems>
</SideNav>
