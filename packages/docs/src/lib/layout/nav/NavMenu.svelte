<script lang="ts">
  import { SideNavMenu } from 'carbon-components-svelte'
  import { SelectableNavMenuItem } from '@magidoc/plugin-svelte-carbon-commons'
  import type { Page, TreeSection } from '$lib/pages'
  import { page } from '$app/stores'

  export let item: Page | TreeSection
</script>

{#if item.type === 'page'}
  <SelectableNavMenuItem
    href={item.href}
    text={item.name}
    currentRef={$page.url.pathname}
  />
{:else if item.type === 'tree'}
  <SideNavMenu text={item.name} expanded>
    {#each item.children as child}
      <svelte:self item={child} />
    {/each}
  </SideNavMenu>
{/if}
