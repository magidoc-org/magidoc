<script lang="ts">
import type { PageTree } from '@magidoc/plugin-starter-common'
import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte'
import AppPageNavigation from './AppPageNavigation.svelte'

export let isOpen = true
export let content: ReadonlyArray<PageTree>
</script>

<SideNav bind:isOpen>
  <SideNavItems>
    {#each content as item}
      {#if item.type === 'page'}
        <AppPageNavigation {item} />
      {:else}
        <!-- Volontarily do not use recursion and go only a single level deep. 
      Carbon does not support recursion in nav items -->
        <SideNavMenu text={item.title} expanded>
          {#each item.children as subItem}
            {#if subItem.type === 'page'}
              <AppPageNavigation item={subItem} />
            {/if}
          {/each}
        </SideNavMenu>
      {/if}
    {/each}
  </SideNavItems>
</SideNav>
