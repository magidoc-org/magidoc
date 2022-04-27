<script lang="ts">
  import { page } from '$app/stores'
  import { SelectableNavMenuItem } from '@magidoc/plugin-svelte-carbon-commons'
  import { SideNavMenu } from 'carbon-components-svelte'

  import type { CustomContent } from 'src/app'

  export let content: CustomContent[]
</script>

{#each content as item}
  {#if item.type === 'page'}
    <SelectableNavMenuItem
      href={item.href}
      text={item.title}
      currentRef={$page.url.pathname}
    />
  {:else}
    <!-- Volontarily do not use recursion and go only a single level deep. 
      Carbon does not support recursion in nav items -->
    <SideNavMenu text={item.title} expanded>
      {#each item.children as subItem}
        {#if subItem.type === 'page'}
          <SelectableNavMenuItem
            href={subItem.href}
            text={subItem.title}
            currentRef={$page.url.pathname}
          />
        {/if}
      {/each}
    </SideNavMenu>
  {/if}
{/each}
