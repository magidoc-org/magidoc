<script lang="ts">
  import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte'
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'

  export let isOpen = true
</script>

<SideNav {isOpen}>
  <SideNavItems>
    <SideNavMenu text="Introduction" expanded>
      <SelectableNavMenuItem href="/introduction/welcome" text="Welcome" />
      <SelectableNavMenuItem href="/introduction/get-started" text="Getting Started" />
    </SideNavMenu>
  </SideNavItems>
</SideNav>
